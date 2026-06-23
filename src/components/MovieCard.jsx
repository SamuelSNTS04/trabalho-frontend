import { useState } from "react"; // 💡 Importamos o useState para controlar a expansão
import { useWatchlist } from "../context/WatchlistContext";

function MovieCard({ filme }) {
  const { updateStatus, deleteMovie } = useWatchlist();
  const [isExpanded, setIsExpanded] = useState(false); // 🔥 Estado para controlar se o card está aberto

  // Busca automática da imagem (adicionado filme.capaUrl para bater com o Cadastro)
  const urlImagem = 
    filme.capaUrl || 
    filme.urlCapa || 
    filme.imagem || 
    filme.image || 
    filme.capa ||
    Object.values(filme).find(
      (valor) => 
        typeof valor === "string" && 
        (valor.startsWith("http://") || valor.startsWith("https://")) && 
        !valor.includes("localhost:3000")
    );

  const statusAtual = filme.status === "na_lista" || !filme.status ? "assistir" : filme.status;

  const statusStyles = {
    assistir: "bg-blue-950 text-blue-300 border-blue-700",
    assistindo: "bg-yellow-950 text-yellow-300 border-yellow-700",
    assistido: "bg-green-950 text-green-300 border-green-700",
    nao_quero: "bg-red-950 text-red-300 border-red-700",
  };

  return (
    <div 
      onClick={() => setIsExpanded(!isExpanded)} // 🔁 Clicar no card expande/recolhe
      className="bg-[var(--bg-card)] border border-[var(--borda)] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full relative group cursor-pointer"
    >
      
      {/* Botão de Deletar Permanente */}
      <button
        onClick={(e) => {
          e.stopPropagation(); // 🛑 Evita que o card expanda ao clicar em deletar
          if (confirm(`Tem certeza que deseja excluir "${filme.titulo}" permanentemente?`)) {
            deleteMovie(filme.id);
          }
        }}
        className="absolute top-2 right-2 z-10 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full shadow-md md:opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        title="Excluir filme do catálogo"
      >
        🗑️
      </button>
      
      {/* Imagem */}
      <div className="h-48 w-full bg-gray-700 relative">
        {urlImagem ? (
          <img
            src={urlImagem}
            alt={`Poster de ${filme.titulo}`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            <span>Sem Imagem</span>
          </div>
        )}
      </div>

      {/* Conteúdo */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-[var(--texto-principal)] mb-1 line-clamp-2">
          {filme.titulo}
        </h3>
        
        <div className="flex gap-2 mb-3 items-center">
          <span className="inline-block text-xs font-medium px-2 py-1 bg-gray-800 text-gray-300 rounded self-start">
            {filme.categoria}
          </span>
          {/* Mostra o ano discretamente ao lado da categoria */}
          {filme.ano && (
            <span className="text-xs text-gray-500 font-semibold">
              • {filme.ano}
            </span>
          )}
        </div>

        {/* 📑 SEÇÃO EXPANSÍVEL: Mostra a sinopse e detalhes se isExpanded for true */}
        <div className={`transition-all duration-300 overflow-hidden ${
          isExpanded ? "max-h-60 mb-4 opacity-100" : "max-h-0 opacity-0"
        }`}>
          <div className="border-t border-gray-800 pt-3 mt-1">
            <h4 className="text-xs uppercase tracking-wider text-yellow-500 font-bold mb-1">
              Sinopse
            </h4>
            <p className="text-sm text-gray-300 leading-relaxed text-justify">
              {filme.sinopse || "Nenhuma sinopse cadastrada para este título."}
            </p>
          </div>
        </div>

        {/* Indicador visual de "Ver mais" */}
        <div className="text-[11px] text-center text-gray-500 font-semibold mb-2 group-hover:text-yellow-500 transition-colors">
          {isExpanded ? "▲ Clique para recolher" : "▼ Clique para ver sinopse"}
        </div>

        {/* Menu de Seleção de Status */}
        <div className="mt-auto pt-3 border-t border-[var(--borda)]">
          <label className="block text-[10px] uppercase tracking-wider text-gray-400 mb-1 font-bold">
            Status do Filme
          </label>
          <select
            value={statusAtual}
            onClick={(e) => e.stopPropagation()} // 🛑 Impede fechar/abrir o card ao clicar no select
            onChange={(e) => updateStatus(filme.id, e.target.value)}
            className={`w-full text-xs px-3 py-2 rounded-lg font-semibold cursor-pointer outline-none border transition-colors ${
              statusStyles[statusAtual] || statusStyles.assistir
            }`}
          >
            <option value="assistir" className="bg-gray-900 text-white">⏳ Quero Assistir</option>
            <option value="assistindo" className="bg-gray-900 text-white">👀 Assistindo</option>
            <option value="assistido" className="bg-gray-900 text-white">✓ Assistido</option>
            <option value="nao_quero" className="bg-gray-900 text-white">❌ Não quero mais assistir</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;