import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Invalid api endpoint" });
  }
  try {
    await serverAuth(req);
    const movies = await prismadb.movie.findMany();
    return res.status(200).json(movies);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
}
