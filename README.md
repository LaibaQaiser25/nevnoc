# Nevnoc — Global web solutions

Website and portfolio for Nevnoc, a web and AI automation studio.

- **Frontend:** React + Vite + Tailwind CSS v4 (`client/`)
- **Backend:** Node.js + Express (`server/`): emails contact-form enquiries through [Resend](https://resend.com)
- **Brand:** logo, colours and Poppins type taken from the Nevnoc Figma file. Exports are in `brand/`.

## Run it locally

```bash
npm run install:all
```

1. Copy `server/.env.example` to `server/.env` and set `RESEND_API_KEY`.
2. Start the API (port 5050) and the site (port 5173):

```bash
npm run dev
```

## Fill in the placeholders

Everything editable is in **`client/src/content.js`**. Values in `[square brackets]` show on the site with a dashed "placeholder" style until you replace them:

| Placeholder | Where |
| --- | --- |
| `[email]`, `[WhatsApp number]` | `site.email`, `site.whatsapp` (digits with country code) |
| `[LinkedIn URL]`, `[GitHub URL]`, `[Upwork URL]` | `site.links` |
| `[Loom link]` | `projects[].demo` |
| `[screenshot 1–4]` | `caseStudy.screenshots`: put images in `client/public/` and use paths like `/factory-1.png` |
| `[founder photo]` | `founder.photo`: e.g. `/laiba.jpg` in `client/public/` |
| `[your domain]` | add `og:url` / canonical tags in `client/index.html` once the site is live |

## Production

nevnoc.com is hosted on **Vercel**: see **[DEPLOY.md](DEPLOY.md)**. There the contact form runs as serverless functions in `api/`, which share their logic with the Express server (`server/enquiries.js`).

To try a production build locally with Express instead:

```bash
npm run build
NODE_ENV=production npm start
```
