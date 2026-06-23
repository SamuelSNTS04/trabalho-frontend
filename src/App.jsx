import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import { WatchlistProvider } from "./context/WatchlistContext";

// Layout Estrutural
import Layout from "./components/Layout";

// Importação das Páginas
import Home from "./pages/Home";
import Cadastro from "./pages/Cadastro";
import Categorias from "./pages/Categorias";
import Configuracoes from "./pages/Configuracoes";
import ConfirmarSenha from "./pages/ConfirmarSenha";
import CadastroUsuario from "./pages/CadastroUsuario";
import Login from "./pages/Login";
import MinhaLista from "./pages/MinhaLista";
// ❌ O import de Sugestoes foi removido daqui
import Erro404 from "./pages/Erro404";

function App() {
  // 🔑 Estado para controlar se o usuário passou pela tela de login
  const [estaLogado, setEstaLogado] = useState(false);

  return (
    <WatchlistProvider>
      <Routes>
        {/* Rotas Públicas / Autônomas (Sem o menu lateral) */}
        <Route
          path="/login"
          element={<Login setEstaLogado={setEstaLogado} />}
        />
        <Route path="/cadastro" element={<Cadastro />} />{" "}
        {/* Cadastro de Filmes */}
        <Route path="/cadastro-usuario" element={<CadastroUsuario />} />{" "}
        {/* Novo Cadastro de Usuário */}
        <Route path="/confirmar-senha" element={<ConfirmarSenha />} />
        
        {/* 🛡️ Rotas Protegidas / Internas (Que compartilham o Layout/Menu lateral) */}
        <Route
          element={estaLogado ? <Layout /> : <Navigate to="/login" replace />}
        >
          <Route path="/" element={<Home />} />
          <Route path="/categorias" element={<Categorias />} />
          <Route path="/minha-lista" element={<MinhaLista />} />
          <Route path="/configuracoes" element={<Configuracoes />} />
        </Route>
        
        {/* Rota de Captura para qualquer link inexistente (404) */}
        <Route path="*" element={<Erro404 />} />
      </Routes>
    </WatchlistProvider>
  );
}

export default App;