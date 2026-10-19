# Nevnoc — Global Web Solutions™

Company website built on the **PERN** stack:

- **P**ostgreSQL: stores contact-form messages
- **E**xpress: REST API (`server/`)
- **R**eact + **Vite** + **Tailwind CSS v4**: frontend (`client/`)
- **N**ode.js 20.6+ (uses the built-in `--env-file` and `--watch`)

## Structure

```
client/                 Vite + React + Tailwind
  src/components/       Navbar, Hero, Services, About, Process, Contact, Footer, Logo
  src/index.css         Tailwind import + brand theme tokens (@theme)
server/                 Express API
  index.js              /api/health, /api/contact (+ serves client/dist in production)
  db/                   pg pool, schema.sql, init script
```

## Setup

1. Install dependencies:
   ```bash
   npm run install:all
   ```
2. Create a PostgreSQL database (for example `nevnoc`), then copy `server/.env.example` to `server/.env` and set `DATABASE_URL`.
3. Create the tables:
   ```bash
   npm run db:init
   ```
4. Run the API (port 5000) and the Vite dev server (port 5173) together:
   ```bash
   npm run dev
   ```

Vite proxies `/api/*` to the Express server during development.

## Production

```bash
npm run build
NODE_ENV=production npm start
```

Express serves the built React app from `client/dist` alongside the API.
