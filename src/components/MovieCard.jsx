function MovieCard({ filme }) {
  // Recebemos a prop "filme" que conterá todos os dados de um item específico
  
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg border border-gray-700 hover:scale-105 transition-transform duration-300 flex flex-col">
      {/* Imagem da Capa */}
      <img
        src={filme.capaUrl || "https://via.placeholder.com/300x450?text=Sem+Capa"}
        alt={`Capa de ${filme.titulo}`}
        className="w-full h-64 object-cover border-b border-gray-700"
      />

      {/* Corpo do Card (Informações) */}
      <div className="p-4 flex flex-col flex-1 gap-2">
        {/* Título com truncate para não quebrar o layout se for muito grande */}
        <h3 className="text-xl font-bold text-gray-100 truncate" title={filme.titulo}>
          {filme.titulo}
        </h3>

        {/* Categoria e Ano */}
        <div className="flex justify-between items-center text-sm text-gray-400 font-medium">
          <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded-md">
            {filme.categoria}
          </span>
          <span>{filme.ano}</span>
        </div>

        {/* Sinopse resumida a no máximo 3 linhas */}
        <p className="text-gray-400 text-sm mt-2 line-clamp-3 flex-1" title={filme.sinopse}>
          {filme.sinopse || "Sem sinopse disponível para este título."}
        </p>

        {/* Indicador de Status */}
        <div className="mt-3 pt-3 border-t border-gray-700">
          <span
            className={`text-xs px-2 py-1 rounded-full font-semibold ${
              filme.status === "assistido"
                ? "bg-green-900 text-green-300"
                : "bg-yellow-900 text-yellow-300"
            }`}
          >
            {filme.status === "assistido" ? "✓ Assistido" : "➕ Na Minha Lista"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;