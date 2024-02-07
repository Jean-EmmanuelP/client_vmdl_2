import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: "Aucun token fourni." });
  }

  const token = authorization.split(" ")[1];
  const secretKey = process.env.JWT_SECRET as string;

  try {
    const decoded = jwt.verify(token, secretKey);
    // La logique de votre route va ici, ca veut dire cest ici que je dis pour chaque variables de mon site ce qui va etre modifie en fonction de l'id du texte et si le jwt est bon
    res.status(200).json({ data: "Données protégées" });
  } catch (error) {
    return res.status(401).json({ message: "Token invalide." });
  }

}
