import { Routes, Route } from "react-router-dom";

// Layout Estrutural
import Layout from "./components/Layout";

// Importação das Páginas
import Home from "./pages/Home";
import Cadastro from "./pages/Cadastro";
import Categorias from "./pages/Categorias";
import Configuracoes from "./pages/Configuracoes";
import ConfirmarSenha from "./pages/ConfirmarSenha";
import Login from "./pages/Login";
import MinhaLista from "./pages/MinhaLista";
import Sugestoes from "./pages/Sugestoes";
import Erro404 from "./pages/Erro404";

function App() {
  return (
    <Routes>
      {/* Rotas Públicas / Autônomas (Sem o menu lateral) */}
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/confirmar-senha" element={<ConfirmarSenha />} />

      {/* Rotas Protegidas / Internas (Que compartilham o Layout/Menu lateral) */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/categorias" element={<Categorias />} />
        <Route path="/minha-lista" element={<MinhaLista />} />
        <Route path="/sugestoes" element={<Sugestoes />} />
        <Route path="/configuracoes" element={<Configuracoes />} />
      </Route>

      {/* Rota de Captura para qualquer link inexistente (404) */}
      <Route path="*" element={<Erro404 />} />
    </Routes>
  );
}

export default App;