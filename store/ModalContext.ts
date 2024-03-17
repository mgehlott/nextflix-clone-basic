import { createContext } from "react";

interface ModalContextType {
  movieId: string;
  isOpen: boolean;
  openModal: (movieId: string) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType>({
  movieId: "",
  isOpen: false,
  openModal: (movieID: string) => {},
  closeModal: () => {},
});
// export const useModalContext = useContext(ModalContext);

export default ModalContext;
