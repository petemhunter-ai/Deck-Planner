====================================
  DECK & PATIO PLANNER  v2.1
  Desktop + PWA (iPad / Web)
====================================

QUICK START (Windows Desktop)
------------------------------
1. Double-click INSTALL.bat  (one time only)
   - Installs Node.js if needed and sets up dependencies

2. Double-click START.bat
   - A black command window appears — keep it open
   - It will print your local IP address for iPad access

3. Open your browser and go to:
   http://localhost:5000

4. When done, close the command window or press Ctrl+C


IPAD / WEB ACCESS
-----------------
If hosted online (Render, Railway, etc.):
  - Open the hosted URL in Safari on your iPad
  - Tap Share → "Add to Home Screen" → "Add"
  - Launches as a full-screen app, works offline

If using local WiFi:
  - Run START.bat on your PC — it prints your local IP
  - On iPad open Safari and go to http://[that-ip]:5000
  - Same "Add to Home Screen" steps above


WHAT'S NEW IN v2.1  (latest)
------------------------------
✓ IPAD CHAT INPUT — Text entry field now fully visible and
  tappable on iPad; 16px font prevents iOS auto-zoom

✓ SKETCH FURNITURE — Every piece renders as a top-down
  architectural sketch:
    • Sofas: back rail, individual seat cushions, arms, legs
    • Chairs: back, padded seat, armrests
    • Chaises: headrest + cushion with pleat lines
    • Tables: wood grain, round/oval shape, corner legs
    • Ottomans: padded top with X tufting
    • Adirondacks: wide slat back + arms
    • Stools: seat disc + crossed legs + footrest ring
    • Coffee/end tables: glass top suggestion

✓ FURNITURE DIMENSIONS FIXED — No resize handles on furniture;
  dimensions come from catalog and stay accurate

✓ NO CENTER LABELS — Dimensions appear on edges only, not
  floating in the middle of elements

✓ BORDER COLOR ON ALL DECKS — Perimeter border color works
  on both individual deck segments and merged shapes;
  prior borders persist through merging

✓ COLOR NAME TOOLTIPS — Hover over any TimberTech color
  swatch to see the full color name

✓ EXPANDED CATALOGS — Full Casual Comfort USA and NorthCape
  collections including:
    • Sectional components (corner, armless, L/R arm, chaise,
      wedge, pre-configured 3/4/5-piece sets)
    • Deep Seating, Swivel & Glider, full Dining range
    • Cabo, Seaside, full Bainbridge sectional pieces
    • Complete Overton, Capri, Rio lines


WHAT'S NEW IN v2.0
-------------------
✓ UNIFIED SCALE — All elements share the same inch-based
  coordinate system. No more scale mismatches.

✓ LIVE DIMENSION LABELS — Deck sides and patio edges labeled
  in real-world feet + inches at all times.

✓ LIVE RESIZE OVERLAY — Floating W×H badge follows cursor
  while dragging a resize handle.

✓ MERGE DECK SEGMENTS — Combines adjacent deck sections into
  one unified shape with all exterior dimensions labeled.

✓ NEW ELEMENTS — Pergola, Hot Tub, Fire Pit.

✓ AI COMMAND PANEL — Natural language via Anthropic API.

✓ PWA — Installs on iPad as a home screen app, works offline.


CONTROLS
--------
• Scroll / Pinch    — Zoom in/out
• Alt + Drag / Pan  — Pan the canvas
• Click element     — Select it
• Drag element      — Move it
• Drag handles      — Resize (patio, stairs, hot tub, pergola)
• Drag vertices     — Edit deck polygon corners
• Click mid-dot     — Insert new deck vertex
• R key             — Rotate selected furniture
• Delete/Backspace  — Remove selected element
• Escape            — Deselect


FILES IN THIS FOLDER
--------------------
  index.html    — The entire app (update this to upgrade)
  server.cjs    — Express server (API + static serving)
  package.json  — Node.js dependencies
  manifest.json — PWA app manifest
  sw.js         — Service worker (offline caching)
  icons/        — App icons for iPad home screen
  sqlite.db     — Your saved projects (auto-created)
  INSTALL.bat   — One-time setup
  START.bat     — Run the app


YOUR DATA
---------
Projects are stored in sqlite.db in this folder.
To back up: copy sqlite.db somewhere safe.
To move to another computer: copy the entire folder.
sqlite.db is NOT included in GitHub — it stays on your machine.


TROUBLESHOOTING
---------------
- "Node.js is not installed" → Run INSTALL.bat first
- "Can't connect" → Make sure START.bat window is still open
- Windows Firewall prompt → Click "Allow access"
- To reset everything → Delete sqlite.db and node_modules,
  then run INSTALL.bat again
