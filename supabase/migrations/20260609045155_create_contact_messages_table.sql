CREATE TABLE contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  read_at TIMESTAMPTZ
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert messages (contact form)
CREATE POLICY "insert_contact_messages" ON contact_messages
  FOR INSERT TO anon WITH CHECK (true);

-- Only authenticated users can view messages
CREATE POLICY "select_contact_messages" ON contact_messages
  FOR SELECT TO authenticated USING (true);

CREATE INDEX idx_contact_messages_created_at ON contact_messages(created_at DESC);