import { Link } from "react-router-dom";

function AddMovieButton() {
  return (
    <Link
      to="/cadastro"
      className="fixed bottom-6 right-6 md:static md:bottom-auto md:right-auto bg-[var(--cor-destaque)] hover:bg-yellow-400 text-gray-900 font-bold p-4 md:px-6 md:py-2 rounded-full md:rounded-lg shadow-lg hover:scale-105 transition-transform flex items-center justify-center gap-2 z-50"
    >
      <span className="text-2xl md:text-base leading-none">+</span>
      <span className="hidden md:inline">Adicionar Filme</span>
    </Link>
  );
}

export default AddMovieButton;