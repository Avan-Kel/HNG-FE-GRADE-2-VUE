
---

### Vue.js Version

```markdown
# TicketApp — Vue.js Version

This is the **Vue.js** implementation of the Multi-Framework Ticket Web App.

---
## The single root README linking to each implementation.
| Framework | Directory | Setup & Usage |
|-----------|-----------|---------------|
| **React + TypeScript** | [GITHUB`https://github.com/Avan-Kel/HNG-FE-GRADE-2-REACT.git/`] vercel(https://hng-fe-grade-2-react-git-main-promises-projects-3ed1ac1b.vercel.app) | `npm install && npm run dev` |
-----
| **Twig (PHP)** | [GITHUB`https://github.com/Avan-Kel/HNG-FE-GRADE-2-TWIG.git/`](https://hng-fe-grade-2-twig-production.up.railway.app) | `php -S localhost:8000 -t public` |
| **Vue 3 + TypeScript** | [GITHUB`https://github.com/Avan-Kel/HNG-FE-GRADE-2-VUE.git/`](https://hng-fe-grade-2-vue-git-main-promises-projects-3ed1ac1b.vercel.app
p) | `npm install && npm run dev` |
| **CONTAINER** | [GITHUB`https://github.com/Avan-Kel/HNG-FE-GRADE-2-REACT.git/`]


## Folder structure
components/   # Hero.vue, TicketCard.vue, Header.vue, Footer.vue
views/        # Landing.vue, Login.vue, Signup.vue, Dashboard.vue, Tickets.vue
layouts/      # AppLayout.vue
main.ts       # app mounting

## Usage

Open http://localhost:5173 (Vite default port)

Signup/Login using localStorage authentication

Navigate to Dashboard and Ticket Management

Logout clears session and redirects to Login

## Features

Landing Page: Hero with wavy SVG, decorative circles, CTA buttons

Authentication: Login/Signup with inline validation and toast feedback

Dashboard: Shows total, open, and resolved tickets

Ticket Management: Full CRUD with validation and success/error feedback

Responsive and accessible design

## Tech Stack

- Vue 3 + TypeScript
- Vite
- Tailwind CSS
- localStorage for simulated authentication

---

## Setup

```bash
# Clone the repository
git clone <repo-url> vue-ticket-app
cd vue-ticket-app

# Install dependencies
npm install

# Start development server
npm run dev
