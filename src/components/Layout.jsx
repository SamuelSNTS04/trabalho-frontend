import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function Layout() {
  return (
    <div className="layout-container">
      {/* A Navbar fica renderizada de forma fixa aqui */}
      <Navbar />

      {/* O <Outlet /> é o "buraco" onde as páginas vão ser injetadas sem recarregar o navegador */}
      <main className="conteudo-principal">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;