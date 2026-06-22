import { useWatchlist } from "../context/WatchlistContext";

function MovieCard({ filme }) {
  const { updateStatus, deleteMovie } = useWatchlist();

  // Busca automática da imagem
  const urlImagem = 
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
    <div className="bg-[var(--bg-card)] border border-[var(--borda)] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col h-full relative group">
      
      {/* Botão de Deletar Permanente (Aparece no topo direito) */}
      <button
        onClick={() => {
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
        
        <span className="inline-block text-xs font-medium px-2 py-1 bg-gray-800 text-gray-300 rounded mb-4 self-start">
          {filme.categoria}
        </span>

        {/* Menu de Seleção de Status */}
        <div className="mt-auto pt-3 border-t border-[var(--borda)]">
          <label className="block text-[10px] uppercase tracking-wider text-gray-400 mb-1 font-bold">
            Status do Filme
          </label>
          <select
            value={statusAtual}
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