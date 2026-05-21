#!/bin/bash
# China Brief · Vocab App Daily Push
# Runs at 6:35 AM via LaunchAgent — converts lexicon xlsx → vocab.json and pushes to GitHub.
# Safe to run daily: only commits if vocab.json actually changed.

set -e

REPO="/Users/isaacrosenblum/Documents/Claude/Projects/china-vocab-app"
NEWSLETTER="/Users/isaacrosenblum/Documents/Claude/Projects/China newsletter"
LOG="$NEWSLETTER/vocab_push.log"
LOCK="$REPO/.git/index.lock"

timestamp() { date '+%Y-%m-%d %H:%M:%S'; }

log() { echo "[$(timestamp)] $1" | tee -a "$LOG"; }

log "── Vocab push starting ──"

# Clear any stale git lock file left by the agent sandbox
if [ -f "$LOCK" ]; then
    log "Removing stale git lock file"
    rm -f "$LOCK"
fi

# Run the converter
log "Running vocab_converter.py"
/usr/bin/python3 "$REPO/vocab_converter.py" >> "$LOG" 2>&1

# Configure git identity
cd "$REPO"
git config user.email "Awesomeike@mac.com"
git config user.name "Isaac Rosenblum"

# Only commit + push if vocab.json actually changed
if git diff --quiet vocab.json; then
    log "vocab.json unchanged — nothing to push"
else
    TODAY=$(date '+%Y-%m-%d')
    git add vocab.json
    git commit -m "Vocab update: $TODAY"
    git push
    log "SUCCESS: vocab.json pushed to GitHub"
fi

log "── Vocab push complete ──"
