import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoCineKeep from "../assets/Logo.svg";

function ConfirmarSenha() {
  const [email, setEmail] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [erroGeral, setErroGeral] = useState("");
  const [erroSenha, setErroSenha] = useState("");

  const navigate = useNavigate();

  const handleSenhaChange = (valor) => {
    setNovaSenha(valor);
    if (valor.length > 0 && valor.length < 8) {
      setErroSenha("Mínimo 8 caracteres");
    } else {
      setErroSenha("");
    }
  };

  const handleRecuperar = async (e) => {
    e.preventDefault();

    if (!email.trim() || !novaSenha.trim() || !confirmarSenha.trim()) {
      setErroGeral("Por favor, preencha todos os campos.");
      return;
    }

    if (novaSenha.length < 8) {
      setErroSenha("Mínimo 8 caracteres");
      setErroGeral("");
      return;
    }

    if (novaSenha !== confirmarSenha) {
      setErroGeral("As senhas não coincidem.");
      return;
    }

    try {
      const urlBusca = `http://localhost:3000/usuarios?email=${email.trim().toLowerCase()}`;
      const respostaBusca = await fetch(urlBusca);
      
      if (!respostaBusca.ok) {
        setErroGeral("Erro ao consultar o servidor. Tente novamente.");
        return;
      }

      const usuariosEncontrados = await respostaBusca.json();

      if (usuariosEncontrados.length === 0) {
        setErroGeral("Nenhum usuário cadastrado com este e-mail.");
        return;
      }

      const usuario = usuariosEncontrados[0];

      const respuestaAtualizacao = await fetch(`http://localhost:3000/usuarios/${usuario.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ senha: novaSenha })
      });

      if (respuestaAtualizacao.ok) {
        setErroGeral("");
        setErroSenha("");
        alert("Senha atualizada com sucesso!");
        navigate("/login");
      } else {
        setErroGeral("Não foi possível atualizar a senha. Tente novamente.");
      }

    } catch (error) {
      console.error("Erro na requisição:", error);
      setErroGeral("Não foi possível conectar ao servidor backend.");
    }
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
        <img src={logoCineKeep} alt="CineKeep Logo" className="w-48 h-auto mb-8 object-contain" />
        <h2 className="text-white text-lg font-bold mb-4 self-start tracking-wide uppercase">Recuperar Senha</h2>

        <form onSubmit={handleRecuperar} className="w-full flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-gray-300 text-sm font-medium">Confirme seu Email</label>
            <input
              type="email"
              placeholder="Digite seu email cadastrado"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-[#252833] text-white rounded-lg border border-gray-700 focus:border-[#e2b659] outline-none transition-colors text-sm"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-gray-300 text-sm font-medium">Nova Senha</label>
            <input
              type="password"
              placeholder="Mínimo 8 caracteres"
              value={novaSenha}
              onChange={(e) => handleSenhaChange(e.target.value)}
              className={`w-full px-4 py-3 bg-[#252833] text-white rounded-lg border outline-none transition-colors text-sm ${
                erroSenha ? "border-red-500 focus:border-red-500" : "border-gray-700 focus:border-[#e2b659]"
              }`}
            />
            {erroSenha && <span className="text-red-400 text-xs mt-0.5 font-medium pl-1">{erroSenha}</span>}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-gray-300 text-sm font-medium">Confirmar Nova Senha</label>
            <input
              type="password"
              placeholder="Digite a senha novamente"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              className="w-full px-4 py-3 bg-[#252833] text-white rounded-lg border border-gray-700 focus:border-[#e2b659] outline-none transition-colors text-sm"
            />
          </div>

          {erroGeral && (
            <p className="text-red-500 text-xs font-semibold bg-red-950/40 border border-red-900/50 px-3 py-2 rounded-md">
              ⚠️ {erroGeral}
            </p>
          )}

          <button type="submit" className="w-full mt-2 py-3 bg-[#e2b659] hover:bg-[#cf9e47] text-[#1a1c24] font-bold rounded-lg transition-colors shadow-lg text-sm uppercase tracking-wider">
            Cadastrar Nova Senha
          </button>
        </form>

        <div className="w-full mt-4 flex text-left self-start text-xs font-medium">
          <button onClick={() => navigate("/login")} className="text-gray-400 hover:text-white transition-colors text-left underline">
            Voltar para o Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmarSenha;