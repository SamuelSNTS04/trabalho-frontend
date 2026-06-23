import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoCineKeep from "../assets/Logo.svg";

function CadastroUsuario() {
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [aceitouTermos, setAceitouTermos] = useState(false);

  // Estados de erro
  const [erroGeral, setErroGeral] = useState("");
  const [erroSenha, setErroSenha] = useState("");

  // Estados para alternar visibilidade da senha (olhinho)
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);

  const navigate = useNavigate();

  // Validação em tempo real da senha
  const handleSenhaChange = (valor) => {
    setSenha(valor);
    if (valor.length > 0 && valor.length < 8) {
      setErroSenha("Mínimo 8 caracteres");
    } else {
      setErroSenha("");
    }
  };

  // Envio dos dados para o db.json
  const handleCadastro = async (e) => {
    e.preventDefault();

    // 1. Validar campos vazios
    if (!nome.trim() || !sobrenome.trim() || !email.trim() || !senha.trim() || !confirmarSenha.trim()) {
      setErroGeral("Por favor, preencha todos os campos.");
      return;
    }

    // 2. Validar tamanho da senha
    if (senha.length < 8) {
      setErroSenha("Mínimo 8 caracteres");
      return;
    }

    // 3. Validar se as senhas são iguais
    if (senha !== confirmarSenha) {
      setErroGeral("As senhas não coincidem.");
      return;
    }

    // 4. Validar checkbox de termos
    if (!aceitouTermos) {
      setErroGeral("Você precisa concordar com os termos para continuar.");
      return;
    }

    // 📡 ENVIO REAL PARA O BANCO (json-server)
    try {
      const novoUsuario = {
        nome: nome.trim(),
        sobrenome: sobrenome.trim(),
        email: email.trim().toLowerCase(),
        senha: senha 
      };

      const resposta = await fetch("http://localhost:3000/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(novoUsuario)
      });

      if (resposta.ok) {
        setErroGeral("");
        setErroSenha("");
        alert("Usuário cadastrado com sucesso!");
        navigate("/login"); // Redireciona de volta para a tela de Login
      } else {
        setErroGeral("Erro ao salvar o usuário. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      setErroGeral("Não foi possível conectar ao servidor backend.");
    }
  };

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center py-8 px-4"
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
          className="w-44 h-auto mb-6 object-contain"
        />

        {/* Formulário */}
        <form onSubmit={handleCadastro} className="w-full flex flex-col gap-3">
          
          {/* Primeiro Nome */}
          <div className="flex flex-col gap-1">
            <label className="text-gray-300 text-sm font-medium">Primeiro Nome</label>
            <input
              type="text"
              placeholder="Digite seu nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full px-4 py-2.5 bg-[#252833] text-white rounded-lg border border-gray-700 focus:border-[#e2b659] outline-none transition-colors text-sm"
            />
          </div>

          {/* Sobrenome */}
          <div className="flex flex-col gap-1">
            <label className="text-gray-300 text-sm font-medium">Sobrenome</label>
            <input
              type="text"
              placeholder="Digite seu sobrenome"
              value={sobrenome}
              onChange={(e) => setSobrenome(e.target.value)}
              className="w-full px-4 py-2.5 bg-[#252833] text-white rounded-lg border border-gray-700 focus:border-[#e2b659] outline-none transition-colors text-sm"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-gray-300 text-sm font-medium">Email</label>
            <input
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 bg-[#252833] text-white rounded-lg border border-gray-700 focus:border-[#e2b659] outline-none transition-colors text-sm"
            />
          </div>

          {/* Senha */}
          <div className="flex flex-col gap-1 relative">
            <label className="text-gray-300 text-sm font-medium">Senha</label>
            <div className="relative">
              <input
                type={mostrarSenha ? "text" : "password"}
                placeholder="Digite sua senha"
                value={senha}
                onChange={(e) => handleSenhaChange(e.target.value)}
                className={`w-full pr-10 px-4 py-2.5 bg-[#252833] text-white rounded-lg border outline-none transition-colors text-sm ${
                  erroSenha ? "border-red-500 focus:border-red-500" : "border-gray-700 focus:border-[#e2b659]"
                }`}
              />
              {/* Botão do Olhinho */}
              <button
                type="button"
                onClick={() => setMostrarSenha(!mostrarSenha)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {mostrarSenha ? "🔒" : "👁️"}
              </button>
            </div>
            {erroSenha && (
              <span className="text-red-400 text-xs font-medium pl-1">{erroSenha}</span>
            )}
          </div>

          {/* Confirmar Senha */}
          <div className="flex flex-col gap-1 relative">
            <label className="text-gray-300 text-sm font-medium">Confirmar Senha</label>
            <div className="relative">
              <input
                type={mostrarConfirmarSenha ? "text" : "password"}
                placeholder="Confirme sua senha"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                className="w-full pr-10 px-4 py-2.5 bg-[#252833] text-white rounded-lg border border-gray-700 focus:border-[#e2b659] outline-none transition-colors text-sm"
              />
              {/* Botão do Olhinho */}
              <button
                type="button"
                onClick={() => setMostrarConfirmarSenha(!mostrarConfirmarSenha)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {mostrarConfirmarSenha ? "🔒" : "👁️"}
              </button>
            </div>
          </div>

          {/* Checkbox Termos de Aceite */}
          <div className="flex items-start gap-2 mt-1">
            <input
              type="checkbox"
              id="termos"
              checked={aceitouTermos}
              onChange={(e) => setAceitouTermos(e.target.checked)}
              className="mt-1 accent-[#e2b659] rounded cursor-pointer"
            />
            <label htmlFor="termos" className="text-gray-300 text-xs cursor-pointer select-none leading-tight">
              Termo de... <br />
              <span className="text-gray-400">Concordo com os termos...</span>
            </label>
          </div>

          {/* Mensagem de Erro Geral */}
          {erroGeral && (
            <p className="text-red-500 text-xs font-semibold bg-red-950/40 border border-red-900/50 px-3 py-2 rounded-md mt-1">
              ⚠️ {erroGeral}
            </p>
          )}

          {/* Botão Criar */}
          <button
            type="submit"
            className="w-full mt-3 py-2.5 bg-[#e2b659] hover:bg-[#cf9e47] text-[#1a1c24] font-bold rounded-lg transition-colors shadow-lg text-sm uppercase tracking-wider"
          >
            Criar
          </button>
        </form>

        {/* Link para voltar ao Login */}
        <button 
          onClick={() => navigate("/login")}
          className="mt-4 text-xs font-medium text-gray-400 hover:text-white transition-colors underline"
        >
          Já tem uma conta? Faça login
        </button>

      </div>
    </div>
  );
}

export default CadastroUsuario;