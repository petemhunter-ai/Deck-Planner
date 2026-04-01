"use strict";

const express = require("express");
const path = require("path");
const fs = require("fs");

// ─── Database setup ───────────────────────────────────────────────────────────
let Database;
try {
  Database = require("better-sqlite3");
} catch(e) {
  console.error("better-sqlite3 not found. Run: npm install");
  process.exit(1);
}

const DB_PATH = path.join(__dirname, "sqlite.db");
const db = new Database(DB_PATH);

db.exec(`
  CREATE TABLE IF NOT EXISTS projects (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    name        TEXT NOT NULL,
    data        TEXT NOT NULL,
    created_at  TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS furniture_items (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    name        TEXT NOT NULL,
    width_inches REAL NOT NULL,
    depth_inches REAL NOT NULL,
    source_url  TEXT,
    image_url   TEXT,
    color       TEXT
  );
`);

// ─── Prepared statements ──────────────────────────────────────────────────────
const stmts = {
  getProjects:    db.prepare("SELECT id, name, created_at FROM projects ORDER BY id DESC"),
  getProject:     db.prepare("SELECT * FROM projects WHERE id = ?"),
  createProject:  db.prepare("INSERT INTO projects (name, data, created_at) VALUES (?, ?, ?) RETURNING *"),
  updateProject:  db.prepare("UPDATE projects SET name = ?, data = ? WHERE id = ? RETURNING *"),
  deleteProject:  db.prepare("DELETE FROM projects WHERE id = ?"),
  getFurniture:   db.prepare("SELECT * FROM furniture_items"),
  addFurniture:   db.prepare("INSERT INTO furniture_items (name, width_inches, depth_inches, source_url, image_url, color) VALUES (?, ?, ?, ?, ?, ?) RETURNING *"),
  delFurniture:   db.prepare("DELETE FROM furniture_items WHERE id = ?"),
};

// ─── Express app ─────────────────────────────────────────────────────────────
const app = express();
app.use(express.json({ limit: "10mb" }));

// Request logging
app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    if (req.path.startsWith("/api")) {
      console.log(`${req.method} ${req.path} ${res.statusCode} — ${Date.now()-start}ms`);
    }
  });
  next();
});

// ─── API Routes ───────────────────────────────────────────────────────────────

// Projects
app.get("/api/projects", (req, res) => {
  res.json(stmts.getProjects.all());
});

app.get("/api/projects/:id", (req, res) => {
  const project = stmts.getProject.get(Number(req.params.id));
  if (!project) return res.status(404).json({ error: "Not found" });
  res.json(project);
});

app.post("/api/projects", (req, res) => {
  const { name, data, created_at } = req.body;
  if (!name || !data) return res.status(400).json({ error: "name and data required" });
  const ts = created_at || new Date().toISOString();
  const row = stmts.createProject.get(name, data, ts);
  res.status(201).json(row);
});

app.put("/api/projects/:id", (req, res) => {
  const { name, data } = req.body;
  const row = stmts.updateProject.get(name, data, Number(req.params.id));
  if (!row) return res.status(404).json({ error: "Not found" });
  res.json(row);
});

app.delete("/api/projects/:id", (req, res) => {
  stmts.deleteProject.run(Number(req.params.id));
  res.status(204).send();
});

// Furniture items
app.get("/api/furniture", (req, res) => {
  res.json(stmts.getFurniture.all());
});

app.post("/api/furniture", (req, res) => {
  const { name, width_inches, depth_inches, source_url, image_url, color } = req.body;
  const row = stmts.addFurniture.get(name, width_inches, depth_inches, source_url||null, image_url||null, color||null);
  res.status(201).json(row);
});

app.delete("/api/furniture/:id", (req, res) => {
  stmts.delFurniture.run(Number(req.params.id));
  res.status(204).send();
});

// ─── Static files — serve our new frontend ───────────────────────────────────
// Try multiple locations to be robust
const staticDirs = [
  __dirname,                              // same folder as server.cjs
  path.join(__dirname, "public"),         // legacy public/ folder
];

let servedDir = null;
for (const dir of staticDirs) {
  const idx = path.join(dir, "index.html");
  if (fs.existsSync(idx)) { servedDir = dir; break; }
}

if (!servedDir) {
  // If no index.html found, serve a helpful page
  app.get("*", (req, res) => {
    res.status(503).send(`
      <h2>Deck & Patio Planner — Setup needed</h2>
      <p>index.html not found. Place the new index.html in the same folder as server.cjs.</p>
    `);
  });
} else {
  // Service worker must be served from root with correct headers
  app.get("/sw.js", (req, res) => {
    res.setHeader("Content-Type", "application/javascript");
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.sendFile(path.join(servedDir, "sw.js"));
  });

  // Manifest
  app.get("/manifest.json", (req, res) => {
    res.setHeader("Content-Type", "application/manifest+json");
    res.sendFile(path.join(servedDir, "manifest.json"));
  });

  // Icons
  app.use("/icons", express.static(path.join(servedDir, "icons"), {
    maxAge: "7d",
    immutable: true
  }));

  // Main static assets — no cache for HTML so updates are instant
  app.use(express.static(servedDir, {
    index: "index.html",
    setHeaders: (res, filePath) => {
      if (filePath.endsWith(".html")) {
        res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
      }
    }
  }));

  // SPA fallback
  app.get("/{*path}", (req, res) => {
    res.sendFile(path.join(servedDir, "index.html"));
  });
}

// ─── Error handler ───────────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(err.status || 500).json({ message: err.message || "Internal Server Error" });
});

// ─── Start ───────────────────────────────────────────────────────────────────
const PORT = parseInt(process.env.PORT || "5000", 10);
app.listen({ port: PORT, host: "0.0.0.0" }, () => {
  console.log(`\n  ╔══════════════════════════════════╗`);
  console.log(`  ║   Deck & Patio Planner v2.0      ║`);
  console.log(`  ╠══════════════════════════════════╣`);
  console.log(`  ║  http://localhost:${PORT}            ║`);
  console.log(`  ║  Serving from: ${path.basename(servedDir||'?')}             ║`);
  console.log(`  ╚══════════════════════════════════╝\n`);
});
