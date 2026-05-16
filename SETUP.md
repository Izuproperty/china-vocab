# 中国词汇 China Vocab · GitHub Pages Setup

## What's in this folder

| File | Purpose |
|------|---------|
| `index.html` | The full PWA app — flashcards, quiz, sentence fill, progress |
| `vocab.json` | Vocabulary data extracted from `china_lexicon.xlsx` |
| `vocab_converter.py` | Run this to refresh `vocab.json` after new newsletter issues update the xlsx |
| `manifest.json` | PWA manifest — enables "Add to Home Screen" on iPhone |
| `sw.js` | Service worker — enables offline use |

---

## One-time GitHub setup (5 minutes)

### 1. Create the repo on GitHub
1. Go to https://github.com/new
2. Name it `china-vocab` (or anything you like)
3. Set it to **Public** (required for free GitHub Pages)
4. Do NOT initialize with README — leave it empty
5. Click **Create repository**

### 2. Push these files from Terminal

```bash
cd ~/Documents/Claude/Projects/china-vocab-app

git init
git add .
git commit -m "Initial build: China Vocab PWA"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/china-vocab.git
git push -u origin main
```

Replace YOUR_USERNAME with your GitHub username.

### 3. Enable GitHub Pages
1. Go to your repo on GitHub → Settings → Pages
2. Source: Deploy from a branch → main → / (root) → Save
3. In ~2 min your app is live at: https://YOUR_USERNAME.github.io/china-vocab/

---

## Add to iPhone Home Screen

1. Open the URL in Safari on iPhone
2. Tap Share → Add to Home Screen → Add
3. Opens full-screen like a native app, works offline

---

## Keeping vocab up to date

After new newsletter issues update china_lexicon.xlsx, run:

```bash
cd ~/Documents/Claude/Projects/china-vocab-app
python3 vocab_converter.py
git add vocab.json
git commit -m "Vocab update: $(date +%Y-%m-%d)"
git push
```

---

## XP & Scoring

| Action | XP |
|--------|----|
| Flashcard Easy | +15 |
| Flashcard Hard | +10 |
| MCQ correct (no hint) | +10 |
| MCQ correct (pinyin hint) | +5 |
| Sentence fill correct | +20 |

Spaced repetition: L0 (new) → L5 (mastered, 30-day cycle)
