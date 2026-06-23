import { useNavigate } from "react-router-dom";

function Configuracoes() {
  const navigate = useNavigate();

  // Exemplo de dados para os círculos de temas (comum em configurações)
  const temas = [
    { id: "amarelo", cor: "bg-yellow-500", nome: "CineKeep Gold" },
    { id: "azul", cor: "bg-blue-500", nome: "Ocean Blue" },
    { id: "verde", cor: "bg-emerald-500", nome: "Classic Green" },
    { id: "roxo", cor: "bg-purple-500", nome: "Neon Purple" },
    { id: "vermelho", cor: "bg-red-500", nome: "Ruby Red" },
  ];

  return (
    <main className="container mx-auto p-6">
      {/* Cabeçalho padrão do app */}
      <header className="mb-8 border-b border-gray-800 pb-6 text-center md:text-left">
        <h1 className="text-3xl font-bold text-yellow-500">⚙️ Configurações</h1>
        <p className="text-gray-400 mt-2">
          Personalize as preferências da sua conta e do sistema.
        </p>
      </header>

      {/* Grid principal: 1 coluna no mobile, muda para grid maior no desktop */}
      <div className="max-w-2xl mx-auto flex flex-col gap-6">
        
        {/* Seção 1: Perfil (Onde geralmente tem o círculo da foto) */}
        <section className="bg-gray-800 border border-gray-700 rounded-xl p-5 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          {/* Círculo da Foto: usando shrink-0 para não achatar no mobile */}
          <div className="w-20 h-20 bg-gray-700 rounded-full flex items-center justify-center text-3xl shrink-0 border-2 border-yellow-500 shadow-inner">
            👤
          </div>
          <div className="flex-grow">
            <h3 className="text-lg font-bold text-gray-100">Nome do Usuário</h3>
            <p className="text-sm text-gray-400">usuario@email.com</p>
          </div>
          <button className="w-full sm:w-auto py-2 px-4 bg-gray-700 hover:bg-gray-600 text-white font-medium text-sm rounded-lg transition-colors">
            Editar
          </button>
        </section>

        {/* Seção 2: Preferências de Tema (Onde ficam as bolinhas de cores) */}
        <section className="bg-gray-800 border border-gray-700 rounded-xl p-5 flex flex-col gap-4">
          <div>
            <h3 className="text-lg font-bold text-gray-100">Tema do Aplicativo</h3>
            <p className="text-sm text-gray-400 mt-0.5">Selecione a cor de destaque da interface.</p>
          </div>

          {/* Grid de círculos: flex-wrap no mobile para descer de linha se faltar espaço */}
          <div className="flex flex-wrap gap-4 items-center justify-center sm:justify-start pt-2">
            {temas.map((tema) => (
              <button
                key={tema.id}
                title={tema.nome}
                className={`w-12 h-12 rounded-full ${tema.cor} border-2 border-transparent hover:border-white transition-all transform hover:scale-105 shadow-md shrink-0`}
                /* 💡 O segredo está no shrink-0 acima: impede o mobile de achatar a bolinha */
              />
            ))}
          </div>
        </section>

        {/* Seção 3: Sistema */}
        <section className="bg-gray-800 border border-gray-700 rounded-xl p-5 flex flex-col gap-4">
          <h3 className="text-lg font-bold text-gray-100">Preferências do Sistema</h3>
          
          <div className="flex items-center justify-between py-2 border-b border-gray-700 last:border-0">
            <span className="text-sm text-gray-300">Notificações por e-mail</span>
            {/* Toggle circular (Exemplo de mini-círculo) */}
            <button className="w-11 h-6 bg-yellow-500 rounded-full p-0.5 flex items-center justify-end shrink-0 transition-colors">
              <span className="bg-gray-900 w-5 h-5 rounded-full shrink-0 shadow-md" />
            </button>
          </div>

          <div className="flex items-center justify-between py-2 border-b border-gray-700 last:border-0">
            <span className="text-sm text-gray-300">Sincronização automática em segundo plano</span>
            <button className="w-11 h-6 bg-gray-600 rounded-full p-0.5 flex items-center justify-start shrink-0 transition-colors">
              <span className="bg-white w-5 h-5 rounded-full shrink-0 shadow-md" />
            </button>
          </div>
        </section>

        {/* Botão Voltar inferior */}
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="w-full py-3 px-4 bg-transparent text-gray-400 hover:text-white font-bold border border-gray-700 rounded-lg hover:bg-gray-800 transition-colors mt-2"
        >
          Voltar para a tela anterior
        </button>

      </div>
    </main>
  );
}

export default Configuracoes;