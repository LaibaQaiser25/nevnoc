# AI Lead Responder (n8n)

A new lead fills in a form, and within seconds:

1. **Claude qualifies the lead** as hot, warm or cold, and writes a personal reply.
2. **The lead is saved** to a Google Sheet with the score, reason and summary.
3. **The lead gets a reply** by email: a booking link for hot leads, a couple of scoping questions for warm ones, a polite note for cold ones. Spam gets no reply.
4. **You get an email alert** when a lead is hot.

```
Lead form → Config → Qualify lead (Claude) → Prepare lead → Save to Google Sheets ─┬→ Reply needed? → Reply to lead
                                                                                   └→ Hot lead?     → Alert me
```

## Setup (about 10 minutes)

You need: an n8n account (n8n Cloud or self-hosted), an Anthropic API key, and a Google account.

1. **Import:** in n8n, go to *Workflows → Import from file* and pick `workflow.json`.
2. **Config node:** set your booking link (for example a free [Cal.com](https://cal.com) or Calendly link). Your name and email are already filled in.
3. **Google Sheet:** create a sheet with a tab named `Leads` and these headers in row 1:

   | Date | Name | Email | Company | Message | Score | Reason | Summary | Reply Sent |
   | --- | --- | --- | --- | --- | --- | --- | --- | --- |

   Paste the sheet's URL into the **Save to Google Sheets** node.
4. **Credentials:** open each node with a warning and connect an account:
   - **Claude:** Anthropic API key. The model is set to Claude Haiku 5.5: fast and cheap, and plenty for this job.
   - **Save to Google Sheets:** Google Sheets account.
   - **Reply to lead** and **Alert me:** Gmail account.
5. **Test:** click *Test workflow*, fill in the form that opens, and check the sheet and your inbox.
6. **Go live:** toggle the workflow to *Active*. The form's **Production URL** is what you share or link from your website.

## Test leads

Use these when testing and recording. Use your own second email address as the lead email, so you can show the reply arriving.

**Hot**
- Name: Sara Ahmed · Company: Smile Dental Clinic
- Message: *We get 40+ WhatsApp messages a day asking for appointments and my receptionist can't keep up. I want a bot that books appointments automatically. We'd like to start this month, budget is around $800.*

**Warm**
- Name: Bilal Khan · Company: Khan Traders
- Message: *Hi, we're looking into automation for our business. Can you tell me more about what you do?*

**Cold / spam**
- Name: Mark · Company: SEO Growth Pro
- Message: *We can get your website to page 1 of Google in 30 days. Reply for a free audit!*

## Recording the Loom demo (60–90 seconds)

Before recording: put the form, the Google Sheet, the n8n canvas and your second inbox in four browser tabs. Close notifications.

1. **The problem (10 s), on the n8n canvas:**
   "Most businesses reply to new leads hours later, and by then the lead has gone cold. This workflow replies in seconds."
2. **Submit the hot lead (15 s), on the form tab:** paste the Sara example and submit.
3. **Show it run (15 s), on the n8n canvas:** open *Executions* and click the latest run so the green path is visible.
   "Claude reads the message, scores it hot, and writes a personal reply."
4. **Show the results (25 s):**
   - The sheet: the new row with score, reason and summary.
   - The second inbox: the personal reply with the booking link.
   - Your inbox: the hot lead alert.
5. **Show the filter (10 s, optional):** submit the spam example and show it saved to the sheet as *cold* with no reply sent.
6. **Close (5 s):** "Want this for your business? Book a free call at nevnoc.com."

Then copy the Loom share link into `projects[0].demo` in `client/src/content.js`, and the website's "Watch demo" button will open it.

## Customising

- **Different AI model:** swap the *Claude* node for any other chat model node; the rest is unchanged.
- **WhatsApp or Slack alerts:** replace *Alert me* with a Slack node, or a WhatsApp Business / Twilio node.
- **Use your website form instead:** replace *Lead form* with a *Webhook* node and post the same four fields (`Name`, `Email`, `Company`, `Message`) to it.
- **Tone and rules:** edit the instructions in *Qualify lead (AI)* → *Messages*.
