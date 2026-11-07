-- Enquiries sent from the website contact form.
CREATE TABLE IF NOT EXISTS enquiries (
  id          SERIAL PRIMARY KEY,
  name        VARCHAR(120)  NOT NULL,
  email       VARCHAR(200)  NOT NULL,
  business    VARCHAR(160),
  automate    TEXT          NOT NULL,
  created_at  TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);
