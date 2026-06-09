import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { Resend } from "npm:resend";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const resend = new Resend(Deno.env.get("RESEND_API_KEY")!);

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: ["akshatshettigar2001@gmail.com"],
      subject: `New Contact: ${subject}`,
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #00f5ff; margin-bottom: 20px;">New Message from Portfolio</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #8892a4; width: 100px;">Name:</td>
              <td style="padding: 8px 0; color: #e8eaf0;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #8892a4;">Email:</td>
              <td style="padding: 8px 0; color: #e8eaf0;"><a href="mailto:${email}" style="color: #00f5ff;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #8892a4; vertical-align: top;">Subject:</td>
              <td style="padding: 8px 0; color: #e8eaf0;">${subject}</td>
            </tr>
          </table>
          <div style="margin-top: 20px; padding: 20px; background: #0d0f1a; border-radius: 8px; border-left: 3px solid #00f5ff;">
            <p style="color: #8892a4; margin: 0 0 8px 0; font-size: 12px; text-transform: uppercase;">Message</p>
            <p style="color: #e8eaf0; margin: 0; white-space: pre-wrap;">${message}</p>
          </div>
          <p style="color: #8892a4; font-size: 12px; margin-top: 30px;">
            Received on ${new Date().toLocaleString()}
          </p>
        </div>
      `,
      reply_to: email,
    });

    if (error) {
      console.error("Resend error:", error);
      return new Response(JSON.stringify({ error: "Failed to send email" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true, id: data?.id }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
