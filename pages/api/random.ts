import serverAuth from "@/lib/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Invalid api endpoint" });
  }

  try {
    await serverAuth(req);
    const moviesCount = await prismadb.movie.count();
    const randomIndex = Math.floor(Math.random() * moviesCount);
    const randomMovies = await prismadb.movie.findMany({
      take: 1,
      skip: randomIndex,
    });
    return res.status(200).json(randomMovies[0]);
  } catch (error: any) {
    console.log(error);
    return res.status(405).json({ messaage: error.messaage });
  }
}
