import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="main-navbar">
      <div className="navbar-brand">CineKeep</div>
      <ul className="navbar-links">
        <li>
          <NavLink to="/">🏠 Início</NavLink>
        </li>
        <li>
          <NavLink to="/categorias">📂 Categorias</NavLink>
        </li>
        <li>
          <NavLink to="/minha-lista">🎬 Minha Lista</NavLink>
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