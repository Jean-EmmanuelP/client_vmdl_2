import { NextResponse } from "next/server";
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
    try {
        const { nom, email, telephone, message } = await req.json();

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        let mailOptions = {
            from: process.env.EMAIL_USERNAME,
            replyTo: email,
            to: 'jperrama@gmail.com',
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
                'Content-Type': 'application/json',
            },
        });
    }
}