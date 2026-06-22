import { createContext, useState, useEffect, useContext } from "react";

export const WatchlistContext = createContext();

export function WatchlistProvider({ children }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/movies")
      .then((res) => {
        if (!res.ok) throw new Error("Servidor offline.");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) setMovies(data);
        else setMovies([]);
      })
      .catch((err) => {
        console.error("Erro ao carregar os filmes:", err);
        setMovies([]);
      });
  }, []);

  const addMovieToList = (newMovie) => {
    setMovies((prevMovies) => [...prevMovies, newMovie]);
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await fetch(`http://localhost:3000/movies/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      });

      setMovies((prevMovies) => 
        prevMovies.map(movie => 
          movie.id === id ? { ...movie, status: newStatus } : movie
        )
      );
    } catch (error) {
      console.error("Erro ao atualizar o status:", error);
    }
  };

  // 🗑️ NOVA FUNÇÃO: Remove o filme permanentemente do Banco de Dados e da tela
  const deleteMovie = async (id) => {
    try {
      await fetch(`http://localhost:3000/movies/${id}`, {
        method: "DELETE"
      });

      // Atualiza o estado removendo o filme deletado
      setMovies((prevMovies) => prevMovies.filter(movie => movie.id !== id));
    } catch (error) {
      console.error("Erro ao deletar o filme:", error);
    }
  };

  return (
    <WatchlistContext.Provider value={{ movies, updateStatus, addMovieToList, deleteMovie }}>
      {children}
    </WatchlistContext.Provider>
  );
}

export const useWatchlist = () => {
  return useContext(WatchlistContext);
};