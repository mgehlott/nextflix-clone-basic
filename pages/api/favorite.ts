import serverAuth from "@/lib/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      const { currentUser } = await serverAuth(req);
      const { movieId } = req.body;
      const existingMovie = await prismadb.movie.findUnique({
        where: {
          id: movieId,
        },
      });
      if (!existingMovie) {
        throw new Error("Invalid parameter");
      }
      const user = await prismadb.user.update({
        where: {
          email: currentUser.email || "",
        },
        data: {
          favoritesIds: {
            push: movieId,
          },
        },
      });
      return res.status(200).json(user);
    } else if (req.method === "DELETE") {
      const { currentUser } = await serverAuth(req);
      const { movieId } = req.body;
      const existingMovie = await prismadb.movie.findUnique({
        where: {
          id: movieId,
        },
      });
      if (!existingMovie) {
        throw new Error("Invalid parameter");
      }

      const favoritesIds = currentUser.favoritesIds;
      const updatedFavoritesIds = favoritesIds.filter(
        (item) => item !== movieId
      );
      const updatedUser = await prismadb.user.update({
        where: {
          email: currentUser.email || "",
        },
        data: {
          favoritesIds: updatedFavoritesIds,
        },
      });
      return res.status(200).json(updatedUser);
    } else {
        return res.status(200).json('Invalid method')
    }
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
}
