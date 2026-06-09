import { NextResponse } from 'next/server';
import { Pool } from '@neondatabase/serverless';
import { Resend } from 'resend';

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
    throw new Error('Missing DATABASE_URL environment variable');
}

const resendApiKey = process.env.RESEND_API_KEY;
if (!resendApiKey) {
    throw new Error('Missing RESEND_API_KEY environment variable');
}

const pool = new Pool({ connectionString: databaseUrl });
const resend = new Resend(resendApiKey);

const createContactMessagesTableSql = `
  CREATE TABLE IF NOT EXISTS contact_messages (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    read_at TIMESTAMPTZ
  );
`;

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, subject, message } = body;

        if (!name || !email || !subject || !message) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const client = await pool.connect();
        try {
            await client.query(createContactMessagesTableSql);
            await client.query(
                'INSERT INTO contact_messages (name, email, subject, message) VALUES ($1, $2, $3, $4)',
                [name, email, subject, message]
            );
        } finally {
            client.release();
        }

        try {
            await resend.emails.send({
                from: 'Portfolio Contact <onboarding@resend.dev>',
                to: ['akshatshettigar2001@gmail.com'],
                subject: `New contact form message: ${subject}`,
                html: `
          <div style="font-family: Arial, sans-serif; color: #111;">
            <h2 style="margin-bottom: 16px;">New Contact Form Submission</h2>
            <table cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse; max-width: 600px;">
              <tr>
                <td style="padding: 10px 12px; font-weight: 700; background: #f4f4f4; border: 1px solid #e2e2e2; width: 120px;">Name</td>
                <td style="padding: 10px 12px; border: 1px solid #e2e2e2;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 12px; font-weight: 700; background: #f4f4f4; border: 1px solid #e2e2e2;">Email</td>
                <td style="padding: 10px 12px; border: 1px solid #e2e2e2;"><a href="mailto:${email}" style="color: #1a73e8; text-decoration: none;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px 12px; font-weight: 700; background: #f4f4f4; border: 1px solid #e2e2e2;">Subject</td>
                <td style="padding: 10px 12px; border: 1px solid #e2e2e2;">${subject}</td>
              </tr>
              <tr>
                <td style="padding: 10px 12px; font-weight: 700; background: #f4f4f4; border: 1px solid #e2e2e2; vertical-align: top;">Message</td>
                <td style="padding: 10px 12px; border: 1px solid #e2e2e2;">${message.replace(/\n/g, '<br/>')}</td>
              </tr>
            </table>
          </div>
        `,
            });
        } catch (emailError) {
            console.error('Resend email error:', emailError);
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Contact API error:', error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
