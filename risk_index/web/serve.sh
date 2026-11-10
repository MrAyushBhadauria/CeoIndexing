#!/usr/bin/env bash
# Sync signals.js from ../signals.json, then serve the site.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")" && pwd)"
python3 - <<'PY' "$ROOT"
import json, pathlib, sys
root = pathlib.Path(sys.argv[1])
src = root.parent / "signals.json"
dst = root / "signals.js"
dst.write_text("window.SIGNALS = " + json.dumps(json.loads(src.read_text()), indent=2) + ";\n")
print(f"synced {dst.name} from {src.name}")
PY
cd "$ROOT"
PORT="${1:-8765}"
echo "Open http://127.0.0.1:${PORT}"
exec python3 -m http.server "$PORT"
