#!/bin/zsh
# Runs every check (also `npm run verify`). Usage: tools/verify/verify.sh [step-name]; the default name is the date and time.
# Lighthouse is separate: npm run lhci.
# Writes .verify/runs/<step>/ (gitignored) and prints one PASS or FAIL line per check.
cd "$(dirname "$0")/../.." || exit 2
STEP=${1:-$(date +%Y%m%d-%H%M)}; OUT=.verify/runs/$STEP
AXE=node_modules/axe-core/axe.min.js
PY=${PY:-~/.venvs/playwright/bin/python}
# The reference capture lives on disk only (.verify/ is gitignored). After an approved visual
# change, copy the new run's capture to .verify/reference, or pass BASE=<dir> for one run.
BASE=${BASE:-.verify/reference}
[ -d "$BASE/shots" ] && [ -f "$AXE" ] || { echo "verify.sh needs $BASE/shots and $AXE"; exit 2; }
mkdir -p $OUT; fail=0; SUMMARY=""
run() { name=$1; shift; if "$@" > $OUT/$name.txt 2>&1; then SUMMARY="$SUMMARY PASS:$name"; else SUMMARY="$SUMMARY FAIL:$name"; fail=1; fi }
run lint npm run lint
# Build first: typecheck reads the route types the build writes to .next/types.
run build env NEXT_PUBLIC_GTM_ID=GTM-TEST000 npx next build
run typecheck npm run typecheck
run playwright npx playwright test
grep -E "^\s+[0-9]+ (passed|failed|skipped)" $OUT/playwright.txt
pkill -f "next start -p 3300" 2>/dev/null
(npx next start -p 3300 > $OUT/server.log 2>&1 &)
up=0; for i in 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20; do curl -s -o /dev/null http://localhost:3300/ && { up=1; break; }; sleep 1; done
[ $up = 1 ] || { echo "next start did not answer on :3300"; exit 2; }
run capture $PY -I tools/verify/capture.py http://localhost:3300 $OUT/capture "$AXE"
pkill -f "next start -p 3300"
run diff $PY -I tools/verify/diff.py $BASE $OUT/capture
cat $OUT/diff.txt
echo "SUMMARY:$SUMMARY"
exit $fail
