import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  const authorization = req.headers.get("authorization");
  if (!authorization) {
    return new NextResponse(
      JSON.stringify({ message: "Aucun token fourni." }),
      { status: 401 }
    );
  }
  const token = authorization.split(" ")[1];
  const secretKey = process.env.JWT_SECRET;

  try {
    jwt.verify(token, secretKey as string);

    return new NextResponse(JSON.stringify({ message: "Token valide." }), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: "Token invalide." }), {
      status: 401,
    });
  }
}
