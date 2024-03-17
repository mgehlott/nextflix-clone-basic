import Billboard from "@/components/Billboard";
import InfoModal from "@/components/InfoModal";
import MovieList from "@/components/MovieList";
import Navbar from "@/components/Navbar";
import useFavorites from "@/hooks/useFavorites";
import useMovieList from "@/hooks/useMovieList";
import ModalContext from "@/store/ModalContext";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { useState } from "react";

export default function Home() {
  const { data: movies = [] } = useMovieList();
  const { data: favorites = [] } = useFavorites();
  const [isOpen, setIsOpen] = useState(false);
  const [movieId, setMovieId] = useState<string>("");
  const closeModal = () => {
    setIsOpen(false);
    setMovieId("");
  };
  const openModal = (movieId: string) => {
    setIsOpen(true);
    setMovieId(movieId);
  };
  return (
    <>
      <ModalContext.Provider
        value={{
          isOpen: isOpen,
          openModal: openModal,
          closeModal: closeModal,
          movieId: movieId,
        }}
      >
        <InfoModal visible={isOpen} onClose={closeModal} />
        <Navbar />
        <Billboard />
        <div className="pb-40">
          <MovieList title="Trending movie" data={movies} />
          <MovieList title="My list" data={favorites} />
        </div>
      </ModalContext.Provider>
    </>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  console.log(session);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}
