import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  console.log(`you are in the road apiAuth !!!`);

  const { password } = await req.json();
  console.log(`this is the password request: `, password);
  const secretKey = process.env.JWT_SECRET as string;

  if (password === process.env.SECRET_PASSWORD) {
    console.log(`you passed the === this is the secret password`, process.env.SECRET_PASSWORD);
    // Création du token avec une expiration de 10 minutes
    const token = jwt.sign({ sub: "user_id" }, secretKey, { expiresIn: "10m" });
    return NextResponse.json({ token }, { status: 200 });
  } else {
    return NextResponse.json({ message: "Mot de passe incorrect." }, { status: 500 });
  }
};
