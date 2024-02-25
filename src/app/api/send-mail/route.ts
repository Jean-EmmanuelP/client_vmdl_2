import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { nom, email, telephone, message } = await req.json();
    console.log(`-------------------------`, process.env.EMAIL_USERNAME);
    console.log(`this is the email username:`, process.env.EMAIL_USERNAME);
    console.log(`this is the email password:`, process.env.EMAIL_PASSWORD); // Correction pour la clarté

    let transporter = nodemailer.createTransport({
      host: "smtp.ionos.fr", // Serveur SMTP pour Outlook
      port: 465, // Port pour STARTTLS // 993
      secure: true, // Important pour le port 587
      auth: {
        user: process.env.EMAIL_USERNAME, // Votre adresse e-mail Outlook
        pass: process.env.EMAIL_PASSWORD, // Votre mot de passe Outlook
      },
      tls: {
      },
    });

    let mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: "cabinet@vmdl.ai",
      subject: `VMDL - Prise de contact de : ${nom}`,
      text: `Vous avez reçu un nouveau message via le formulaire de contact du site VMDL.\n\nNom: ${nom}\nEmail: ${email}\nTéléphone: ${telephone}\nMessage: ${message}`,
      html: `<p>Vous avez reçu un nouveau message via le formulaire de contact du site VMDL.</p><p><strong>Nom:</strong> ${nom}<br><strong>Email:</strong> ${email}<br><strong>Téléphone:</strong> ${telephone}<br><strong>Message:</strong> ${message}</p>`,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "E-mail envoyé avec succès." });
  } catch (error) {
    console.error(`Erreur lors de l'envoi de l'e-mail: `, error);
    return new Response(JSON.stringify({ message: "Failed to send email." }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
