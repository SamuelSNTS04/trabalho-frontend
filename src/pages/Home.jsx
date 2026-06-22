import { useWatchlist } from "../context/WatchlistContext";

function Home() {
  // Consumindo os dados globais que já vieram da API via Contexto
  const { movies } = useWatchlist();

  return (
    <main className="container mx-auto p-6">
      <header className="mb-8 border-b border-gray-800 pb-4">
        <h1 className="text-3xl font-bold text-yellow-500">Catálogo CineKeep</h1>
        <p className="text-gray-400 mt-2">
          Explore nossa coleção. Total de {movies.length} título(s) carregado(s).
        </p>
      </header>

      {/* Container Principal da Listagem */}
      <section className="catalogo-container">
        
        {/* Implementação inicial do estado de "Loading / Lista Vazia" exigido nas Tasks */}
        {movies.length === 0 ? (
          <div className="flex justify-center items-center h-40">
            <p className="text-gray-400 text-lg animate-pulse">
              Carregando catálogo ou lista vazia...
            </p>
          </div>
        ) : (
          /* Grid que futuramente vai receber o loop (map) dos MovieCards */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <div className="col-span-full p-4 bg-gray-800 rounded-lg text-center text-gray-400 border border-dashed border-gray-600">
              <p>Boilerplate do contêiner pronto! Aguardando a sub-issue 4.2 para renderizar os cards.</p>
            </div>
          </div>
        )}

      </section>
    </main>
  );
}

export default Home;