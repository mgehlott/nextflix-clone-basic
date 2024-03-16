import serverAuth from "@/lib/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(500).json("Invalid method ");
  }
  try {
    const { currentUser } = await serverAuth(req);
    const favoritesMovies = await prismadb.movie.findMany({
      where: {
        id: {
          in: currentUser?.favoritesIds,
        },
      },
    });
    return res.status(200).json(favoritesMovies);
  } catch (error: any) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
}
