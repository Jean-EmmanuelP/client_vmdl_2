import { NextResponse } from "next/server";
import nodemailer, { Transporter } from "nodemailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface ContactPayload {
  nom?: string;
  email?: string;
  telephone?: string;
  message?: string;
}

const escapeHtml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

function buildPrimary(): Transporter | null {
  const user = process.env.EMAIL_USERNAME;
  const pass = process.env.EMAIL_PASSWORD;
  if (!user || !pass) return null;
  return nodemailer.createTransport({
    host: "smtp.ionos.fr",
    port: 465,
    secure: true,
    auth: { user, pass },
    connectionTimeout: 8000,
    greetingTimeout: 8000,
    socketTimeout: 12000,
  });
}

function buildSecondary(): Transporter | null {
  const user = process.env.MY_MAIL;
  const pass = process.env.MY_PASSWORD_MAIL;
  if (!user || !pass) return null;
  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user, pass },
    connectionTimeout: 8000,
    greetingTimeout: 8000,
    socketTimeout: 12000,
  });
}

export async function POST(req: Request) {
  let payload: ContactPayload;
  try {
    payload = (await req.json()) as ContactPayload;
  } catch {
    return NextResponse.json(
      { ok: false, message: "Requête invalide." },
      { status: 400 }
    );
  }

  const nom = (payload.nom || "").trim();
  const email = (payload.email || "").trim();
  const telephone = (payload.telephone || "").trim();
  const message = (payload.message || "").trim();

  if (!nom || !email || !message) {
    return NextResponse.json(
      { ok: false, message: "Champs obligatoires manquants." },
      { status: 400 }
    );
  }

  const primary = buildPrimary();
  if (!primary) {
    console.error("[send-mail] EMAIL_USERNAME/EMAIL_PASSWORD missing");
    return NextResponse.json(
      { ok: false, message: "Configuration serveur indisponible." },
      { status: 503 }
    );
  }

  const subject = `VMDL — Prise de contact : ${nom}`;
  const text = [
    "Vous avez reçu un nouveau message via le formulaire de contact du site VMDL.",
    "",
    `Nom : ${nom}`,
    `Email : ${email}`,
    `Téléphone : ${telephone || "(non renseigné)"}`,
    "",
    "Message :",
    message,
  ].join("\n");
  const html = `
    <p>Vous avez reçu un nouveau message via le formulaire de contact du site VMDL.</p>
    <table cellspacing="0" cellpadding="6" style="font-family: Arial, sans-serif; font-size: 14px; border-collapse: collapse;">
      <tr><td><strong>Nom</strong></td><td>${escapeHtml(nom)}</td></tr>
      <tr><td><strong>Email</strong></td><td>${escapeHtml(email)}</td></tr>
      <tr><td><strong>Téléphone</strong></td><td>${escapeHtml(telephone) || "(non renseigné)"}</td></tr>
    </table>
    <p style="margin-top:16px;"><strong>Message :</strong></p>
    <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
  `;

  const primarySend = primary.sendMail({
    from: process.env.EMAIL_USERNAME,
    to: "cabinet@vmdl.ai",
    replyTo: email,
    subject,
    text,
    html,
  });

  const secondary = buildSecondary();
  const secondarySend = secondary
    ? secondary.sendMail({
        from: process.env.MY_MAIL,
        to: "jperrama@gmail.com",
        replyTo: email,
        subject,
        text,
        html,
      })
    : Promise.resolve(null);

  const [primaryResult, secondaryResult] = await Promise.allSettled([
    primarySend,
    secondarySend,
  ]);

  if (primaryResult.status === "rejected") {
    console.error(
      "[send-mail] primary (ionos) failed:",
      (primaryResult.reason as Error)?.message || primaryResult.reason
    );
    return NextResponse.json(
      { ok: false, message: "Échec de l'envoi. Réessayez plus tard." },
      { status: 502 }
    );
  }

  if (secondaryResult.status === "rejected") {
    console.warn(
      "[send-mail] secondary (gmail notif) failed:",
      (secondaryResult.reason as Error)?.message || secondaryResult.reason
    );
  }

  return NextResponse.json({ ok: true, message: "E-mail envoyé." });
}
