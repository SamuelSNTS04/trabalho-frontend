import { NavLink } from "react-router-dom";
// Importa o hook customizado que você criou na sub-issue 2.5
import { useWatchlist } from "../context/WatchlistContext"; 

function Navbar() {
  // Consome o total de filmes do estado global
  const { totalMovies } = useWatchlist();

  return (
    <nav className="main-navbar">
      <div className="navbar-brand">
        CineKeep <span style={{ fontSize: "14px", color: "#f3f4f6" }}>({totalMovies})</span>
      </div>
      <ul className="navbar-links">
        <li>
          <NavLink to="/">🏠 Início</NavLink>
        </li>
        <li>
          <NavLink to="/categorias">📂 Categorias</NavLink>
        </li>
        <li>
          <NavLink to="/minha-lista">🎬 Minha Lista {totalMovies > 0 && `(${totalMovies})`}</NavLink>
        </li>
        <li>
          <NavLink to="/sugestoes">🎯 Sugestões</NavLink>
        </li>
        <li>
          <NavLink to="/configuracoes">⚙️ Configurações</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;