import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoCineKeep from "../assets/Logo.svg";

function Login({ setEstaLogado }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erroGeral, setErroGeral] = useState("");
  const [erroSenha, setErroSenha] = useState("");
  
  const navigate = useNavigate();

  // 🧪 USUÁRIO BACKUP (Caso queira testar sem o json-server ligado)
  const USUARIO_BACKUP = {
    email: "teste@cinekeep.com",
    senha: "senha123"
  };

  const handleSenhaChange = (valor) => {
    setSenha(valor);
    if (valor.length > 0 && valor.length < 8) {
      setErroSenha("Mínimo 8 caracteres");
    } else {
      setErroSenha("");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // 1. Validação de campos vazios
    if (!email.trim() || !senha.trim()) {
      setErroGeral("Por favor, preencha todos os campos.");
      return;
    }

    // 2. Validação de tamanho mínimo da senha ao tentar logar
    if (senha.length < 8) {
      setErroSenha("Mínimo 8 caracteres");
      setErroGeral("");
      return;
    }

    // 📡 INTEGRAÇÃO REAL COM O JSON-SERVER (Busca pelo e-mail fornecido)
    try {
      const urlBusca = `http://localhost:3000/usuarios?email=${email.trim().toLowerCase()}`;
      const resposta = await fetch(urlBusca);

      if (!resposta.ok) {
        setErroGeral("Erro ao conectar com o banco de dados.");
        return;
      }

      const usuariosEncontrados = await resposta.json();

      // Se não encontrou nenhuma conta com esse e-mail no banco
      if (usuariosEncontrados.length === 0) {
        setErroGeral("E-mail ou senha inválidos.");
        return;
      }

      const usuarioDb = usuariosEncontrados[0];

      // 3. Validação das credenciais direto do banco de dados
      if (usuarioDb.senha !== senha) {
        setErroGeral("E-mail ou senha inválidos.");
        return;
      }

      // Se as credenciais estiverem corretas:
      setErroGeral("");
      setErroSenha("");
      setEstaLogado(true);
      navigate("/"); // Redireciona para a Home
      
    } catch (error) {
      console.error("Erro no login:", error);
      setErroGeral("Não foi possível conectar ao servidor backend.");
    }
  };

  // Função auxiliar para evitar repetição de código
  const limparErrosELogar = () => {
    setErroGeral("");
    setErroSenha("");
    setEstaLogado(true);
    navigate("/");
  };

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{
        backgroundColor: "#1a1c24",
        backgroundImage: "linear-gradient(90deg, rgba(0,0,0,0.15) 50%, transparent 50%)",
        backgroundSize: "40px 100%"
      }}
    >
      <div className="w-full max-w-sm flex flex-col items-center">
        
        {/* Logotipo */}
        <img 
          src={logoCineKeep} 
          alt="CineKeep Logo" 
          className="w-48 h-auto mb-8 object-contain"
        />

        {/* Formulário */}
        <form onSubmit={handleLogin} className="w-full flex flex-col gap-4">
          
          {/* Campo Email */}
          <div className="flex flex-col gap-1">
            <label className="text-gray-300 text-sm font-medium">Email</label>
            <input
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-[#252833] text-white rounded-lg border border-gray-700 focus:border-[#e2b659] outline-none transition-colors text-sm"
            />
          </div>

          {/* Campo Senha */}
          <div className="flex flex-col gap-1">
            <label className="text-gray-300 text-sm font-medium">Senha</label>
            <input
              type="password"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => handleSenhaChange(e.target.value)}
              className={`w-full px-4 py-3 bg-[#252833] text-white rounded-lg border outline-none transition-colors text-sm ${
                erroSenha ? "border-red-500 focus:border-red-500" : "border-gray-700 focus:border-[#e2b659]"
              }`}
            />
            {erroSenha && (
              <span className="text-red-400 text-xs mt-0.5 font-medium pl-1">
                {erroSenha}
              </span>
            )}
          </div>

          {/* Mensagem de Erro Geral */}
          {erroGeral && (
            <p className="text-red-500 text-xs font-semibold bg-red-950/40 border border-red-900/50 px-3 py-2 rounded-md">
              ⚠️ {erroGeral}
            </p>
          )}

          {/* Botão Login */}
          <button
            type="submit"
            className="w-full mt-2 py-3 bg-[#e2b659] hover:bg-[#cf9e47] text-[#1a1c24] font-bold rounded-lg transition-colors shadow-lg text-sm uppercase tracking-wider"
          >
            Login
          </button>
        </form>

        {/* Links de Apoio */}
        <div className="w-full mt-4 flex flex-col gap-2 text-left self-start text-xs font-medium">
          <button 
            onClick={() => navigate("/confirmar-senha")}
            className="text-gray-400 hover:text-white transition-colors text-left"
          >
            Esqueceu sua senha? <span className="underline">Clique aqui</span>
          </button>
          
          <button 
            onClick={() => navigate("/cadastro-usuario")}
            className="text-gray-400 hover:text-white transition-colors text-left"
          >
            Cadastrar-se
          </button>
        </div>

      </div>
    </div>
  );
}

export default Login;