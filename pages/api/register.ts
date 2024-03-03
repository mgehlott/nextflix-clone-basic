import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";
import bcrypt from "bcrypt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!(req.method === "POST")) {
    return res.status(405).json({ message: "Invalid api endpoint" });
  }
  try {
    const { name, email, password } = req.body;
    const existingUser = await prismadb.user.findUnique({
      where: {
        email,
      },
    });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await prismadb.user.create({
      data: {
        name,
        email,
        hashedPassword,
        image: "",
        emailVerified: new Date(),
      },
    });
    return res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (error: any) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
}
