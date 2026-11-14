EXAM MASTER – Online Exam Management System

EXAM MASTER is a modern, feature-rich Online Exam Management System and Question Paper Builder designed for schools, colleges, universities, coaching centers, madrasas, and educational institutions.

It provides a centralized platform for creating professional examination question papers, managing question banks, organizing examinations, generating AI-powered questions, and managing educational institutions.

Key Features

- Online Question Paper Maker & Builder
- MCQ, CQ, Short Questions, Broad Questions and Multiple Question Types
- AI-Powered Question Generator
- Smart Question Bank Management
- Customizable Exam Paper Templates
- Bengali & English Question Paper Support
- Mathematical Equations and Rich Text Editor
- Multiple Question Paper Sets (A, B, C, D, E, F)
- Automatic Marks Calculation
- Answer Key Management
- PDF Printing and Microsoft Word Export
- Excel, CSV, DOCX and PDF Question Import
- Multi-Institution Management
- Teacher and Role Management
- Examination Workflow and Approval System
- Subscription and Usage Management
- Analytics and Activity Tracking
- Firebase Authentication and Database Integration

Who Can Use EXAM MASTER?

- Schools and Colleges
- Universities
- Coaching Centers
- Madrasas
- Educational Institutions
- Examination Departments
- Teachers and Question Paper Setters

Technologies Used

React.js, Vite, Tailwind CSS, Firebase, Firestore, Firebase Cloud Functions, Tiptap Editor, KaTeX, Zustand and Recharts.

Search Keywords

Online Exam Management System, Exam Management Software, Question Paper Maker, Question Paper Generator, Online Question Paper Builder, MCQ Question Generator, AI Question Generator, Question Bank Management System, School Management Software, College Exam Software, Education Management System, Digital Examination System, Bengali Question Paper Maker, Academic Management Software.

EXAM MASTER – Simplifying Examination Management and Question Paper Creation.



# EXAM MASTER

Question paper builder, question bank and examination management for schools, colleges, madrasas, coaching centers and teachers.
React + Vite + Tailwind on the front end, Firebase (Auth, Firestore, Cloud Functions) on the back end, Vercel for hosting.

> **Status: Phase 1.** The core (paper builder, question editors, question bank, live paged preview, print/PDF, Word export, templates,
> answer keys, sets, import, roles, security rules) is written and partly verified. Several modules from the master prompt are basic or
> not built yet. Read the honest feature matrix in [`PROJECT_DOCUMENTATION.md`](PROJECT_DOCUMENTATION.md) before relying on anything.

## দ্রুত শুরু (Termux / যেকোনো কম্পিউটার)

```bash
pkg install nodejs-lts git unzip        # শুধু Termux-এ; অন্য সিস্টেমে Node 18+ ইনস্টল করুন
unzip EXAM-MASTER-COMPLETE-REACT-PROJECT.zip && cd EXAM-MASTER
cp .env.example .env                    # তারপর .env-এ Firebase কনফিগ বসান
npm install
npm run dev                             # http://localhost:5173
```

## Requirements

- Node.js 18 or newer (20 recommended; Cloud Functions use Node 20)
- A Firebase project (free Spark plan is enough for the app; **Cloud Functions need the Blaze plan**)
- Optional: Cloudinary account (image upload), Gemini API key (AI generator), SSLCommerz sandbox account (payments)

## 1. Firebase setup

1. Create a project at <https://console.firebase.google.com>.
2. **Authentication, Sign-in method:** enable *Email/Password* and *Google*. Under *Settings, Authorized domains* add your Vercel domain later.
3. **Firestore Database:** create a database in production mode (pick a region near your users).
4. **Project settings, Your apps:** add a *Web app* and copy its config into `.env` (`VITE_FIREBASE_*`).
5. Deploy security rules and indexes:

   ```bash
   npm install -g firebase-tools
   firebase login
   cp .firebaserc.example .firebaserc      # put your project id inside
   firebase deploy --only firestore:rules,firestore:indexes
   ```

   No CLI (for example on a phone)? Paste `firestore.rules` into *Firestore, Rules* in the console and create the indexes listed in
   `firestore.indexes.json` when the console links them from an error message. Indexes take a few minutes to build.
6. Start the app, register, verify your email, then create your institution on the onboarding page.

### Cloud Functions (optional: AI generator, payments)

```bash
cd functions && npm install && cd ..
firebase functions:secrets:set GEMINI_API_KEY          # AI generator
firebase functions:secrets:set SSLC_STORE_ID           # payments (sandbox first)
firebase functions:secrets:set SSLC_STORE_PASS
firebase deploy --only functions                        # prompts for APP_URL and CALLBACK_BASE_URL
```

- `GEMINI_MODEL` (default `gemini-2.5-flash`) can be set in `functions/.env` if that model name is retired.
- Set `VITE_FUNCTIONS_REGION` in `.env` if you deploy functions outside `us-central1`.
- The manual workflow works without any function. The AI page and the *Choose* plan buttons show a clear message when functions are missing.
- Platform super admin: `GOOGLE_APPLICATION_CREDENTIALS=key.json node functions/scripts/set-super-admin.js <uid>` (there is no super admin screen yet).

## 2. Image hosting (optional)

Images can always be inserted by URL. For uploads create a Cloudinary **unsigned** upload preset (restrict it to png/jpg/webp/gif and a
small maximum size), then set `VITE_CLOUDINARY_CLOUD_NAME` and `VITE_CLOUDINARY_UPLOAD_PRESET`. Only the returned URL is stored in Firestore.

## 3. Deploy the front end to Vercel

1. Push the project to GitHub and import it in Vercel (framework: Vite, build `npm run build`, output `dist`), or run `npx vercel --prod`.
2. Add every `VITE_*` variable from `.env` in *Project settings, Environment variables*.
3. `vercel.json` already rewrites all routes to `index.html` (single page app).
4. Add the Vercel domain to Firebase *Authentication, Authorized domains*.

## 3b. Deploy the front end to GitHub Pages (alternative to Vercel)

GitHub Pages hosts static files only, which is all the front end needs (Firebase Auth and Firestore are called straight from the browser).
Cloud Functions (AI generator, payments) cannot run on GitHub and still need the Blaze plan.

1. The Firebase web config lives in `.env.production` (public identifiers, not secrets). Edit it if you switch Firebase projects.
2. Create a **public** GitHub repository and push this folder to its `main` branch.
3. Repository *Settings, Pages, Build and deployment, Source*: **GitHub Actions**.
4. `.github/workflows/deploy.yml` builds on every push to `main` and publishes to `https://USER.github.io/REPO/`. It sets `BASE_PATH`
   (Vite `base`) by itself, so the repository can have any name, and copies `index.html` to `404.html` so deep links and refreshes work.
5. Firebase console, *Authentication, Settings, Authorized domains*: add `USER.github.io`.

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server (listens on all interfaces, port 5173) |
| `npm run build` / `npm run preview` | Production build / serve the build |
| `npm test` | Unit tests for marks, numbering, parsers, sets, pagination, DOCX output (Node test runner) |
| `npm run check` | Bundles `src/` with esbuild to catch syntax errors and bad local imports quickly |
| `npm run deploy:firestore` | Deploy rules and indexes |
| `npm run deploy:functions` | Deploy Cloud Functions |
| `npm run emulators` | Local Firebase emulators (set `VITE_USE_EMULATORS=true`) |

## Using PDF export

*Export, Print / save as PDF* opens a print view with the same pages as the live preview. In the browser print dialog choose
**Save as PDF**, margins **None**, headers and footers **off**. The browser's print engine writes real text and embeds the Bengali fonts,
so the PDF has the same page breaks as the preview. Use Chrome or Edge for the most reliable result. Fonts load from Google Fonts, so the
first print needs internet access.

## Troubleshooting

| Problem | Fix |
| --- | --- |
| Page says *Firebase is not configured* | Fill `.env` and restart `npm run dev` (Vite reads `.env` only at start). |
| *Missing or insufficient permissions* | Deploy `firestore.rules`; check you have an institution membership; invitations need a **verified** email. |
| *The query requires an index* | Deploy `firestore.indexes.json` or open the link in the error message. |
| Print window does not open | Allow pop-ups for the site. |
| Wrong Bengali glyphs in Word | Pick a font installed on that computer in *Design, Font (Word file)* (Nirmala UI on Windows). |
| Images missing in the Word file | The image host must allow cross-origin requests (Cloudinary does). |
| Out-of-memory during `npm run build` on a phone | `NODE_OPTIONS=--max-old-space-size=1536 npm run build` |
| `firebase deploy --only functions` fails | Upgrade to the Blaze plan; use Node 20; run `npm install` inside `functions/`. |

## Backup and recovery

Enable Firestore scheduled backups or point-in-time recovery in the Google Cloud console, or export on demand:
`gcloud firestore export gs://YOUR_BUCKET/backups/$(date +%F)`. Papers keep version snapshots (without answer keys).

## Folder map

```
src/
  components/      common UI, rich text editor (Tiptap + KaTeX), design controls
  editors/         one editor per question family (MCQ, CQ, short, broad, math, fill, true/false, matching, practical, custom, extras)
  question-types/  type registry and the printable "blocks" each type produces
  preview/         paged paper renderer used by preview and print, shared paper model, pagination
  export/          print, DOCX, JSON and shared export runner
  import/          CSV / XLSX / TXT / DOCX / PDF readers
  pages/           route screens (dashboard, builder, bank, library, templates, studio, keys, import/export, team, ...)
  services/        all Firestore, Functions and upload access
  store/ hooks/    Zustand stores and hooks
  utils/ constants/ i18n/   pure logic (unit tested), role/plan/template data, Bengali dictionary
functions/         Cloud Functions (AI generation, SSLCommerz payment verification, authorization helpers)
firestore.rules, firestore.indexes.json, firebase.json, vercel.json
tests/             Node unit tests
```
