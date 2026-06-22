import { useState } from "react"; 
import { useWatchlist } from "../context/WatchlistContext";
import MovieCard from "../components/MovieCard";

function Home() {
  const { movies } = useWatchlist();
  
  // 4.4 - Criar o estado de searchTerm para armazenar o texto da busca
  const [searchTerm, setSearchTerm] = useState("");

  // 4.4 - Função/Lógica que filtra a lista por título (Case Insensitive)
  const moviesFiltrados = movies.filter((filme) =>
    filme.titulo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="container mx-auto p-6">
      {/* Ajustamos o header com flexbox para o input alinhar bem ao lado do título em telas maiores */}
      <header className="mb-8 border-b border-gray-800 pb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-yellow-500">Catálogo CineKeep</h1>
          <p className="text-gray-400 mt-2">
            Explore nossa coleção. Total de {movies.length} título(s) carregado(s).
          </p>
        </div>

        {/* 4.4 - Componente visual do Input de Busca */}
        <div className="w-full md:w-80">
          <input
            type="text"
            placeholder="Buscar filme por título..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-yellow-500 transition-colors"
          />
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
          /* Mensagem temporária para quando a busca não encontra nada */
          <div className="text-center py-12 text-gray-400 text-lg">
            Nenhum filme encontrado para "{searchTerm}".
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            
            {/* 4.4 - Mudamos o loop para renderizar a partir da lista FILTRADA */}
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