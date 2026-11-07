# Putting nevnoc.com live

The site is one Node app: Express serves the React site and the `/api` that stores contact-form enquiries in PostgreSQL.

| Piece | Service | Why |
| --- | --- | --- |
| Website + API | **Render** (Web Service) | Deploys straight from GitHub on every push, free HTTPS, custom domains |
| Database | **Neon** (PostgreSQL) | Free tier that doesn't expire |
| Domain | Your registrar (where you bought nevnoc.com) | Points the domain to Render |

Check each service's current pricing page before you choose a plan.

---

## 1. Create the database (Neon, about 3 minutes)

1. Sign up at **neon.tech** (Sign in with GitHub works).
2. Create a project named `nevnoc`. Pick the region closest to your Render region (for example Singapore or Frankfurt).
3. Copy the **connection string**. It looks like
   `postgresql://user:password@ep-xxxx.region.aws.neon.tech/neondb?sslmode=require`
   Keep it private: it's the password to your database.

You don't need to create any tables. The app creates them itself on first start.

## 2. Deploy the site (Render, about 5 minutes)

1. Sign up at **render.com** with your GitHub account.
2. Click **New → Web Service**, then pick the **LaibaQaiser25/nevnoc** repository.
3. Fill in:

   | Setting | Value |
   | --- | --- |
   | Name | `nevnoc` |
   | Branch | `main` |
   | Root Directory | *(leave empty)* |
   | Runtime / Language | Node |
   | Build Command | `npm run deploy:build` |
   | Start Command | `npm start` |
   | Health Check Path | `/api/health` (under *Advanced*) |

4. **Instance type:**
   - **Free:** works, but the site goes to sleep after a period with no visitors, and the next visitor waits up to about a minute.
   - **Starter (paid):** recommended for a business site, because it never sleeps.
5. **Environment variables:** add these two:

   | Key | Value |
   | --- | --- |
   | `NODE_ENV` | `production` |
   | `DATABASE_URL` | *(the Neon connection string from step 1)* |

6. Click **Create Web Service** and wait for the build to finish (2–4 minutes).
7. Open the `https://nevnoc.onrender.com` link Render gives you and check:
   - the site loads
   - `https://nevnoc.onrender.com/api/health` shows `"db":"connected"`
   - sending the contact form shows "Thank you!"

## 3. Connect nevnoc.com (about 10 minutes, then wait for DNS)

1. In Render, open the service → **Settings → Custom Domains → Add**: add `nevnoc.com`, then add `www.nevnoc.com`.
2. Render shows the **DNS records** to create. Usually:
   - an **A** record for `@` (the root domain) pointing to Render's IP address
   - a **CNAME** record for `www` pointing to `nevnoc.onrender.com`

   **Use the exact values Render shows you.**
3. Log in to your domain registrar (GoDaddy, Namecheap, Hostinger, etc.) → **DNS settings** for nevnoc.com:
   - Delete any existing **A**, **AAAA** or **CNAME** records for `@` and `www`. Registrars often add "parking" records by default.
   - Add the records from Render.
4. Back in Render, click **Verify**. DNS changes usually take a few minutes, but can take up to 24–48 hours.
5. Render issues the HTTPS certificate automatically. When `https://nevnoc.com` loads with the padlock, you're live.

## 4. After launch

- **Google Search Console** (search.google.com/search-console): add `nevnoc.com`, verify it with the DNS record it gives you, and submit `https://nevnoc.com/sitemap.xml`.
- **Test link previews:** paste `https://nevnoc.com` into LinkedIn's Post Inspector (linkedin.com/post-inspector). It should show the Nevnoc logo image.
- **LinkedIn company page:** set the website to `https://nevnoc.com`.

## Updating the site later

Change something, commit and push to `main`. Render rebuilds and redeploys automatically.

## Reading contact-form enquiries

Enquiries are saved in the `enquiries` table. In Neon, open **SQL Editor** and run:

```sql
SELECT created_at, name, email, business, automate FROM enquiries ORDER BY created_at DESC;
```
