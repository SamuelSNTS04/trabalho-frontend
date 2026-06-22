import { useWatchlist } from "../context/WatchlistContext";
import MovieCard from "../components/MovieCard";
import AddMovieButton from "../components/AddMovieButton";

function MinhaLista() {
  const { movies } = useWatchlist();

  // 🛡️ Filtragem corrigida: agrupa tanto o novo status 'assistir' quanto o antigo 'na_lista'
  const assistir = movies.filter((m) => m.status === "assistir" || m.status === "na_lista" || !m.status);
  const assistindo = movies.filter((m) => m.status === "assistindo");
  const assistido = movies.filter((m) => m.status === "assistido");

  const renderSecao = (titulo, listaFilmes, corTexto) => {
    if (listaFilmes.length === 0) return null;

    return (
      <section className="mb-10">
        <h2 className={`text-xl font-bold mb-4 flex items-center gap-2 ${corTexto}`}>
          <span className="text-sm">●</span> {titulo} ({listaFilmes.length})
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {listaFilmes.map((filme) => (
            <MovieCard key={filme.id} filme={filme} />
          ))}
        </div>
      </section>
    );
  };

  return (
    <main className="container mx-auto px-4 pt-6 pb-24 min-h-screen relative">
      <header className="mb-8 flex justify-between items-center border-b border-[var(--borda)] pb-4">
        <div>
          <h1 className="text-3xl font-bold text-[var(--cor-destaque)]">Minha Lista</h1>
          <p className="text-[var(--texto-secundario)] mt-1">Seu progresso organizado em tempo real.</p>
        </div>
        <div className="hidden md:block">
          <AddMovieButton />
        </div>
      </header>

      {movies.length === 0 ? (
        <p className="text-[var(--texto-secundario)] text-center py-10">
          Sua lista está vazia. Adicione alguns filmes!
        </p>
      ) : (
        <>
          {renderSecao("👀 Assistindo Agora", assistindo, "text-yellow-400")}
          {renderSecao("⏳ Quero Assistir", assistir, "text-blue-400")}
          {renderSecao("✓ Já Assistidos", assistido, "text-green-400")}
        </>
      )}

      <div className="md:hidden">
        <AddMovieButton />
      </div>
    </main>
  );
}

export default MinhaLista;