import { createContext, useState, useEffect } from "react";

// 2.1 - Inicializar o createContext
export const WatchlistContext = createContext();

export function WatchlistProvider({ children }) {
  // 2.3 - Criar o estado movies
  const [movies, setMovies] = useState([]);

  // 2.3 - Implementar o useEffect com fetch(GET) para carregar os dados do db.json
  useEffect(() => {
    fetch("http://localhost:3000/filmes")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao buscar filmes da API");
        }
        return response.json();
      })
      .then((data) => setMovies(data))
      .catch((error) => console.error("Erro no fetch inicial:", error));
  }, []);

  // 2.4 - Criar a função addMovieToList usando o operador spread
  const addMovieToList = (newMovie) => {
    setMovies((prevMovies) => [...prevMovies, newMovie]);
  };

  // 2.6 - Fornecer o total de filmes (movies.length)
  const totalMovies = movies.length;

  return (
    <WatchlistContext.Provider
      value={{
        movies,
        setMovies,
        addMovieToList,
        totalMovies,
      }}
    >
      {children}
    </WatchlistContext.Provider>
  );
}

import { useContext } from "react"; // Certifique-se de importar o useContext no topo do arquivo se não tiver

// 2.5 - Criar e exportar o hook useWatchlist
export function useWatchlist() {
  const context = useContext(WatchlistContext);
  if (!context) {
    throw new Error("useWatchlist deve ser usado dentro de um WatchlistProvider");
  }
  return context;
}