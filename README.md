# Brief Check — Hadegold Media

A structured digital brief-validation tool, built as the artefact for the
seminar *"Investigation of Client Brief Ambiguity and Scope Creep in
Nigerian Creative Agencies: A Structured Digital Brief-Validation
Framework."*

Operationalises the seven recurring gap themes identified through thematic
analysis of practitioner-reported incidents (Chapter 3): audience, tone,
deliverables, timeline, budget, revision limits, and success metrics.

## Deploying to GitHub + Vercel

```bash
# 1. Initialize git and push to a new GitHub repo
git init
git add .
git commit -m "Initial commit: brief validation tool"
git branch -M main
git remote add origin https://github.com/<your-username>/brief-validator.git
git push -u origin main

# 2. Deploy on Vercel
# - Go to vercel.com/new
# - Import the GitHub repo you just pushed
# - Framework preset: Next.js (auto-detected)
# - Click Deploy
```

Once deployed, Vercel gives you a live URL (e.g.
`https://brief-validator-yourname.vercel.app`) — use this as the
"functional URL" evidence in Chapter 4, alongside the GitHub repo link
and screenshots of the tool in use.

## Local development

```bash
npm install
npm run dev
# open http://localhost:3000
```
