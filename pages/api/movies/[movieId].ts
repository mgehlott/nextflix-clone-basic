import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(400).json({ message: "Invalid api" });
  }
  try {
    const { movieId } = req.query;
    if (!movieId || typeof movieId !== "string") {
      return res.status(400).json({ message: "Invalid parameter" });
    }
    const movie = await prismadb.movie.findUnique({
      where: {
        id: movieId,
      },
    });
    if (!movie) {
      return res.status(400).json({ message: "invalid id" });
    }
    return res.status(200).json(movie);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
}
