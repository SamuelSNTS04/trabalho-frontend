import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useWatchlist } from "../context/WatchlistContext";
import logoCineKeep from "../assets/Logo.svg";

function Navbar() {
  const { totalMovies } = useWatchlist();
  // Estado para controlar se o menu mobile está aberto ou fechado
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-900 border-b border-gray-800 p-4 sticky top-0 z-50">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        
        {/* Logo (Sempre visível) */}
        <div className="flex items-center gap-3 text-white font-bold text-xl tracking-wide">
          <img 
            src={logoCineKeep} 
            alt="CineKeep Logo" 
            className="h-10 w-auto object-contain" 
          />
          <span>CineKeep</span>
        </div>

        {/* Botão Menu Hambúrguer (Aparece SÓ no mobile) */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-gray-300 hover:text-yellow-500 focus:outline-none transition-colors"
          aria-label="Toggle menu"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Links de Navegação (Escondido no mobile até clicar; visível como linha no Desktop) */}
        <div className={`${isMenuOpen ? "block" : "hidden"} w-full md:block md:w-auto mt-4 md:mt-0 transition-all duration-300`}>
          <ul className="flex flex-col md:flex-row gap-4 md:gap-6">
            <li>
              <NavLink 
                to="/" 
                className={({ isActive }) => `block py-2 text-base font-medium transition-colors ${isActive ? "text-yellow-500" : "text-gray-300 hover:text-yellow-400"}`}
                onClick={() => setIsMenuOpen(false)}
              >
                🏠 Início
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/categorias" 
                className={({ isActive }) => `block py-2 text-base font-medium transition-colors ${isActive ? "text-yellow-500" : "text-gray-300 hover:text-yellow-400"}`}
                onClick={() => setIsMenuOpen(false)}
              >
                📂 Categorias
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/minha-lista" 
                className={({ isActive }) => `block py-2 text-base font-medium transition-colors ${isActive ? "text-yellow-500" : "text-gray-300 hover:text-yellow-400"}`}
                onClick={() => setIsMenuOpen(false)}
              >
                🎬 Minha Lista {totalMovies > 0 && <span className="bg-yellow-500 text-gray-900 px-2 py-0.5 rounded-full ml-1 text-xs">{totalMovies}</span>}
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/configuracoes" 
                className={({ isActive }) => `block py-2 text-base font-medium transition-colors ${isActive ? "text-yellow-500" : "text-gray-300 hover:text-yellow-400"}`}
                onClick={() => setIsMenuOpen(false)}
              >
                ⚙️ Configurações
              </NavLink>
            </li>
          </ul>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;