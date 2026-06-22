import { useState } from "react";
import { useWatchlist } from "../context/WatchlistContext";
import MovieCard from "../components/MovieCard";

function Categorias() {
  const { movies } = useWatchlist();
  const [searchTerm, setSearchTerm] = useState("");

  // 1. Filtra primeiro pela busca (se houver)
  const moviesFiltrados = movies.filter((filme) =>
    filme.titulo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 2. Agrupa os filmes filtrados por categoria
  // O resultado será um objeto ex: { "Ação": [filme1, filme2], "Terror": [filme3] }
  const categoriasAgrupadas = moviesFiltrados.reduce((acc, filme) => {
    const categoria = filme.categoria || "Outros";
    if (!acc[categoria]) {
      acc[categoria] = [];
    }
    acc[categoria].push(filme);
    return acc;
  }, {});

  return (
    /* padding-bottom generoso para não ficar escondido atrás de uma possível navbar inferior */
    <main className="container mx-auto px-4 pt-6 pb-24 min-h-screen">
      
      {/* Cabeçalho Mobile First (com Ícone de Usuário simulado) */}
      <header className="mb-6 flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <span className="text-3xl text-yellow-500">👤</span>
          <h1 className="text-3xl font-bold text-yellow-500">Categorias</h1>
        </div>

        {/* Barra de Pesquisa */}
        <div className="relative w-full">
          <span className="absolute left-3 top-2.5 text-gray-500">🔍</span>
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-yellow-500 transition-colors"
          />
        </div>
      </header>

      {/* Renderiza os grupos de categorias */}
      <section className="flex flex-col gap-8">
        {Object.entries(categoriasAgrupadas).length === 0 ? (
          <p className="text-gray-400 text-center mt-10">Nenhum título encontrado.</p>
        ) : (
          Object.entries(categoriasAgrupadas).map(([nomeCategoria, filmesDaCategoria]) => (
            <div key={nomeCategoria} className="flex flex-col gap-3">
              
              {/* Título da Categoria e Botão Ver Mais */}
              <div className="flex justify-between items-end px-1">
                <h2 className="text-2xl font-bold text-gray-100">{nomeCategoria}</h2>
                <button className="text-sm font-semibold text-yellow-500 hover:text-yellow-400 transition-colors">
                  Ver Mais
                </button>
              </div>

              {/* Lista Horizontal de Filmes (Mobile First)
                - overflow-x-auto: Permite rolar para os lados no celular.
                - snap-x: Dá aquele efeito suave de "encaixar" no próximo card.
                - md:grid md:grid-cols-3 lg:grid-cols-4 md:overflow-visible: Desativa o scroll lateral no desktop e transforma num grid padrão.
              */}
              <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 md:grid md:grid-cols-3 lg:grid-cols-4 md:overflow-visible md:pb-0 scrollbar-hide">
                {filmesDaCategoria.map((filme) => (
                  /* Reduzimos o tamanho base do card no mobile (w-40) para caberem vários na tela */
                  <div key={filme.id} className="w-40 md:w-auto flex-none snap-start">
                    <MovieCard filme={filme} />
                  </div>
                ))}
              </div>

            </div>
          ))
        )}
      </section>

    </main>
  );
}

export default Categorias;