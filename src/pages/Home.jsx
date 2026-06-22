import { useWatchlist } from "../context/WatchlistContext";
import MovieCard from "../components/MovieCard"; // <-- Importamos o novo componente!

function Home() {
  const { movies } = useWatchlist();

  return (
    <main className="container mx-auto p-6">
      <header className="mb-8 border-b border-gray-800 pb-4">
        <h1 className="text-3xl font-bold text-yellow-500">Catálogo CineKeep</h1>
        <p className="text-gray-400 mt-2">
          Explore nossa coleção. Total de {movies.length} título(s) carregado(s).
        </p>
      </header>

      <section className="catalogo-container">
        
        {movies.length === 0 ? (
          <div className="flex justify-center items-center h-40">
            <p className="text-gray-400 text-lg animate-pulse">
              Carregando catálogo ou lista vazia...
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            
            {/* 4.3 - Aqui acontece o Loop de Renderização! */}
            {movies.map((filme) => (
              <MovieCard key={filme.id} filme={filme} />
            ))}

          </div>
        )}

      </section>
    </main>
  );
}

export default Home;