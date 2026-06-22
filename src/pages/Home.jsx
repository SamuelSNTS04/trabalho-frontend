import { useState } from "react";
import { useWatchlist } from "../context/WatchlistContext";
import MovieCard from "../components/MovieCard";

function Home() {
  const { movies } = useWatchlist();
  
  const [searchTerm, setSearchTerm] = useState("");
  // 4.5 - Criar o estado para armazenar o gênero selecionado
  const [selectedGenre, setSelectedGenre] = useState("");

  // 4.5 - Atualizamos a função de filtro para lidar tanto com o título quanto com o gênero
  const moviesFiltrados = movies.filter((filme) => {
    // Verifica se o título bate com a busca
    const matchTitle = filme.titulo.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Verifica se o gênero bate com o select (se o select estiver vazio "", ele aceita todos)
    const matchGenre = selectedGenre === "" || filme.categoria === selectedGenre;
    
    // Retorna verdadeiro apenas se passar nas duas condições
    return matchTitle && matchGenre;
  });

  return (
    <main className="container mx-auto p-6">
      <header className="mb-8 border-b border-gray-800 pb-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-yellow-500">Catálogo CineKeep</h1>
          <p className="text-gray-400 mt-2">
            Explore nossa coleção. Total de {movies.length} título(s) carregado(s).
          </p>
        </div>

        {/* Agrupamos os filtros do lado direito */}
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          
          {/* 4.4 - Input de Busca por Título */}
          <input
            type="text"
            placeholder="Buscar filme por título..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-64 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-yellow-500 transition-colors"
          />

          {/* 4.5 - Select de Gênero */}
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="w-full sm:w-48 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-100 focus:outline-none focus:border-yellow-500 transition-colors"
          >
            <option value="">Todos os Gêneros</option>
            <option value="Ação">Ação</option>
            <option value="Drama">Drama</option>
            <option value="Ficção Científica">Ficção Científica</option>
            <option value="Fantasia">Fantasia</option>
            <option value="Série / Drama">Série / Drama</option>
          </select>

        </div>
      </header>

      <section className="catalogo-container">
        {movies.length === 0 ? (
          <div className="flex justify-center items-center h-40">
            <p className="text-gray-400 text-lg animate-pulse">
              Carregando catálogo ou lista vazia...
            </p>
          </div>
        ) : moviesFiltrados.length === 0 ? (
          <div className="text-center py-12 text-gray-400 text-lg">
            Nenhum título encontrado com os filtros aplicados.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {moviesFiltrados.map((filme) => (
              <MovieCard key={filme.id} filme={filme} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default Home;