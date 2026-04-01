====================================
  DECK & PATIO PLANNER  v2.0
  Desktop Version for Windows
====================================

QUICK START
-----------
1. Double-click INSTALL.bat  (one time only)
   - Installs Node.js if needed and sets up dependencies

2. Double-click START.bat
   - A black command window appears — keep it open

3. Open your browser and go to:
   http://localhost:5000

4. When done, close the command window or press Ctrl+C


WHAT'S NEW IN v2.0
------------------
✓ UNIFIED SCALE — Deck, patio, furniture, all elements share the
  same inch-based coordinate system. No more scale mismatches.

✓ LIVE DIMENSION LABELS — Every deck side, patio, and resizable
  element shows its real-world dimensions (feet + inches) while
  you resize or at a glance on the canvas.

✓ LIVE RESIZE OVERLAY — While dragging a resize handle, a floating
  badge shows the current width × height in real time.

✓ MERGE DECK SEGMENTS — Click "⟁ Merge Deck Segments" in the toolbar
  to combine all adjacent/overlapping deck sections into one unified
  shape, with all exterior dimensions labeled automatically.

✓ NEW ELEMENTS — Pergola, Hot Tub, Fire Pit, and more from the
  quick-add toolbar.

✓ AI COMMAND PANEL — Natural language commands to build your plan.
  Type "help" to see all commands.

✓ ORDER LIST — Export a purchasing list of all catalog furniture.


CONTROLS
--------
• Scroll         — Zoom in/out
• Alt + Drag     — Pan the canvas
• Click element  — Select it
• Drag element   — Move it
• Drag handles   — Resize (patio, stairs, furniture, hot tub, pergola)
• Drag vertices  — Edit deck polygon corners
• Click mid-dot  — Insert new deck vertex
• R key          — Rotate selected furniture
• Delete/Backspace — Remove selected element
• Escape         — Deselect


YOUR DATA
---------
Your saved projects are stored in "sqlite.db" in this folder.
To back up: copy sqlite.db somewhere safe.
To move to another computer: copy this entire folder.


TROUBLESHOOTING
---------------
- If START.bat says "Node.js is not installed":
  Run INSTALL.bat first, or download Node.js from https://nodejs.org

- If the browser shows "can't connect":
  Make sure the command window is still open

- If Windows Firewall asks for permission:
  Click "Allow access" — the app only runs locally

- To reset:
  Delete sqlite.db and node_modules, then run INSTALL.bat
