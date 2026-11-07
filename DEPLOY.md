# Putting nevnoc.com live (Vercel)

On Vercel the React site is served as static files, and the contact form runs as two serverless functions in `/api` (`contact.js`, `health.js`). They share their logic with the local Express server in `server/`, so local development doesn't change. Settings live in `vercel.json`.

| Piece | Service |
| --- | --- |
| Website + `/api` functions | **Vercel** |
| Database | **Neon** PostgreSQL, added from inside Vercel |
| Domain | Your registrar (where you bought nevnoc.com) |

> **Plan note:** Vercel's free *Hobby* plan is for personal, non-commercial projects. Nevnoc is a business site, so check Vercel's current terms; you may need the *Pro* plan.

---

## 1. Import the project (about 3 minutes)

1. Sign up at **vercel.com** with your GitHub account.
2. Click **Add New → Project** and import **LaibaQaiser25/nevnoc**.
3. Leave the settings as they are. `vercel.json` already sets the install command, build command and output folder (`client/dist`).
   Framework Preset can stay on **Other**.
4. Click **Deploy**. The site will load, but the contact form won't work until step 2.

## 2. Add the database (about 3 minutes)

1. In your Vercel project, open the **Storage** tab, then **Create Database**, then choose **Neon** (Postgres).
2. Accept the defaults, pick a region close to you (for example Singapore or Frankfurt), and **connect it to the nevnoc project** for all environments.
   This adds a `DATABASE_URL` environment variable automatically.
3. Go to **Deployments**, click **⋯** on the latest deployment, then **Redeploy**, so the functions pick up `DATABASE_URL`.
4. Check:
   - `https://<your-project>.vercel.app/api/health` shows `"db":"connected"`
   - Sending the contact form on the site shows "Thank you!"

You don't need to create any tables. The first enquiry creates the `enquiries` table automatically.

## 3. Connect nevnoc.com (about 10 minutes, then wait for DNS)

1. In Vercel, open the project and go to **Settings → Domains**. Add `nevnoc.com`. When asked, also add `www.nevnoc.com` and redirect it to `nevnoc.com`.
2. Vercel shows the **DNS records** to add. Usually:
   - an **A** record for `@` pointing to Vercel's IP address
   - a **CNAME** record for `www` pointing to Vercel's address

   **Use the exact values Vercel shows you.**
3. Log in to your domain registrar → **DNS settings** for nevnoc.com:
   - Delete any existing **A**, **AAAA** or **CNAME** records for `@` and `www`. Registrars often add "parking" records by default.
   - Add the records from Vercel.
4. Wait until Vercel shows **Valid Configuration**. This takes minutes, but can take up to 24–48 hours. HTTPS is set up automatically.

## 4. After launch

- **Google Search Console:** add `nevnoc.com`, verify it, and submit `https://nevnoc.com/sitemap.xml`.
- **Test link previews:** paste `https://nevnoc.com` into LinkedIn's Post Inspector. It should show the Nevnoc logo image.
- **LinkedIn company page:** set the website to `https://nevnoc.com`.

## Updating the site later

Commit and push to `main`. Vercel redeploys automatically. Other branches get their own preview URLs.

## Reading contact-form enquiries

In Vercel, open **Storage** → your Neon database → **Open in Neon** → **SQL Editor**, then run:

```sql
SELECT created_at, name, email, business, automate FROM enquiries ORDER BY created_at DESC;
```
