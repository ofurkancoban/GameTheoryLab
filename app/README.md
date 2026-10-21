# Advanced Micro Lab

An interactive study app for Advanced Microeconomics (Prof. Carsten Helm, University of Oldenburg).
Open `index.html` in a browser. It works offline (formulas use the bundled `vendor/tex-svg.min.js`).

## Files

| File | Content |
|---|---|
| `index.html` | App shell; loads the scripts below in order |
| `style.css` | Layout, colours (light and dark), phone-width rules |
| `core.js` | Shared helpers: `lesson()`, `mx()` payoff matrices, `tree()`, `steps()`, `sol()`, `box()`, `quiz()`, `bank()`, `cards()` |
| `tree-solutions.js` | Written step-by-step solutions for game trees that backward induction cannot solve (information sets, symbolic payoffs); used in lessons and the Game lab |
| `content-a.js` | Lectures 1-5 |
| `content-b.js` | Lectures 6-10 (and their game trees) |
| `content-c.js` | Lectures 11-14 |
| `content-d.js` | Lectures 15-18 |
| `content-e.js` | Past exams, mock exams A-C, formula sheet |
| `content-f.js` | Flashcards and extra question-bank items |
| `content-g.js` | Mock exams D-E, key takeaways, sources page, Osborne chapter guide |
| `content-h.js` | Slide page references, progress dashboard, study plan |
| `content-i.js` | Derivation practice, concept map, common-mistakes page |
| `content-j.js` | Exercises page: every exercise-sheet question (WS 2023/24 to WS 2026/27) and extra practice problems, ordered by lecture, with step-by-step solutions |
| `ai.js` | AI tutor: free open model by default (GPT-OSS 20B via Pollinations, no key), or Anthropic, OpenAI, Gemini, OpenAI-compatible endpoints (keys stay in the browser) |
| `cloud.js` | claude.ai features: cross-device sync, study-group questions, Ask (uses claude.ai or the connected provider) |
| `exercise-tools.js` | Exercise progress ("Solved" / "Review again", synced across devices) and the random timed Exercise test |
| `widgets.js` | Interactive tools (matrix lab, tree solver, Cournot, auctions, signalling, ...) |
| `app.js` | Routing, navigation, quiz bank, flashcards, drills, mock-exam timer, search, progress backup |

## Adding new course material

When new exercise sheets or revised slides appear on Stud.IP, put the PDF into the course folder
(`Exercises/` for sheets, the main folder for slides) and ask Claude to add it. What gets added:

1. **New exercise sheet** (e.g. `AM_WS26_Exercise_2.pdf`): each question becomes an entry
   `X({ lec, id, t, src: ['26.2.1'], body })` in `content-j.js` under the lecture it practises,
   with a step-by-step solution (`steps(...)`; matrices with `mx(...)`, trees with `tree(...)`).
   A question that already exists from an earlier term only gets the new sheet added to its `src`
   list. The Exercises page, its sheet finder and the "Practise this lecture" box on each lecture
   page are built from these entries automatically.
2. **Revised lecture slides**: the lesson in `content-a.js` ... `content-d.js` is compared with the
   new PDF page by page; changed results are updated, new examples are added, and the slide page
   references in `content-h.js` (`GT.slideMap`) are adjusted.
3. **New past exam**: a section on the "Past exams" page with the graded solution.

Conventions: all content in English, no em dashes, TeX inside `H\`...\`` templates (write `< ` with a space after it inside TeX, otherwise the browser reads it as an HTML tag)
(`\(...\)` inline, `\[...\]` display).

## Publishing

The same files are published as a claude.ai artifact. The published version loads MathJax from
cdnjs instead of the local `vendor/` copy.

## AI tutor

By default the local copy (`index.html`) uses a **free open-weight model**: GPT-OSS 20B (Apache 2.0 licence), served
without key or account by Pollinations (`https://text.pollinations.ai/openai`). Nothing needs to be set up. The free tier
answers about once every 30 seconds per internet connection; the app waits and retries once automatically. Question
text is sent to Pollinations.

To use something else, open **AI tutor** in the app, choose a provider, paste your API key and a model ID, then press
"Save and test". Keys are stored only in this browser's local storage and sent only to that provider.
Fully local open models work through any OpenAI-compatible server (Ollama: base URL `http://localhost:11434/v1`, start
Ollama with `OLLAMA_ORIGINS=*` so a file page may call it; LM Studio: `http://localhost:1234/v1`).
The published claude.ai page cannot call outside services (browser security rules); there the Ask boxes use the
viewer's claude.ai account.
