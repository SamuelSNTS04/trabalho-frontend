import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useWatchlist } from "../context/WatchlistContext";

function Cadastro() {
  const { addMovieToList } = useWatchlist();
  const navigate = useNavigate();
  const [enviando, setEnviando] = useState(false); // 🛡️ Proteção contra travamento de tela

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (enviando) return;
    setEnviando(true);

    const novoFilme = {
      titulo: data.titulo.trim(),
      diretor: "Desconhecido",
      ano: Number(data.ano),
      categoria: data.genero,
      status: "assistir", // Status compatível com a filtragem de MinhaLista
      sinopse: data.sinopse.trim(),
      capaUrl: data.capaUrl.trim(),
    };

    try {
      const response = await fetch("http://localhost:3000/movies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(novoFilme),
      });

      if (response.ok) {
        const filmeSalvo = await response.json();
        addMovieToList(filmeSalvo);
        reset();
        alert("Filme cadastrado com sucesso!");
        navigate("/minha-lista");
      } else {
        alert("Erro ao salvar o filme no servidor.");
      }
    } catch (error) {
      console.error("Erro na requisição POST:", error);
      alert("Não foi possível conectar ao servidor backend.");
    } finally {
      setEnviando(false); // Libera o estado da aplicação independente do resultado
    }
  };

  return (
    <main className="container mx-auto p-6">
      <header className="mb-8 border-b border-gray-800 pb-6 text-center">
        <h1 className="text-3xl font-bold text-yellow-500">
          🎬 Cadastrar Novo Filme/Série
        </h1>
        <p className="text-gray-400 mt-2">
          Preencha os detalhes abaixo para adicionar um novo título ao catálogo.
        </p>
      </header>

      <div className="max-w-xl mx-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          {/* Título */}
          <div className="flex flex-col gap-2">
            <label htmlFor="titulo" className="font-bold text-gray-200">
              Título
            </label>
            <input
              id="titulo"
              type="text"
              disabled={enviando}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-100 focus:outline-none focus:border-yellow-500 transition-colors disabled:opacity-50"
              {...register("titulo", { required: "O título é obrigatório" })}
            />
            {errors.titulo && (
              <span className="text-red-500 text-sm">
                {errors.titulo.message}
              </span>
            )}
          </div>

          {/* Gênero */}
          <div className="flex flex-col gap-2">
            <label htmlFor="genero" className="font-bold text-gray-200">
              Gênero
            </label>
            <select
              id="genero"
              disabled={enviando}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-100 focus:outline-none focus:border-yellow-500 transition-colors disabled:opacity-50"
              {...register("genero", {
                required: "Selecione um gênero válido",
              })}
            >
              <option value="">Selecione um gênero...</option>
              <option value="Ação">Ação</option>
              <option value="Drama">Drama</option>
              <option value="Ficção Científica">Ficção Científica</option>
              <option value="Fantasia">Fantasia</option>
              <option value="Série / Drama">Série / Drama</option>
            </select>
            {errors.genero && (
              <span className="text-red-500 text-sm">
                {errors.genero.message}
              </span>
            )}
          </div>

          {/* Ano de Lançamento */}
          <div className="flex flex-col gap-2">
            <label htmlFor="ano" className="font-bold text-gray-200">
              Ano de Lançamento
            </label>
            <input
              id="ano"
              type="number"
              disabled={enviando}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-100 focus:outline-none focus:border-yellow-500 transition-colors disabled:opacity-50"
              {...register("ano", {
                required: "O ano é obrigatório",
                min: { value: 1888, message: "O ano deve ser maior que 1888" },
                max: { value: 2030, message: "O ano limite é 2030" },
              })}
            />
            {errors.ano && (
              <span className="text-red-500 text-sm">{errors.ano.message}</span>
            )}
          </div>

          {/* Sinopse */}
          <div className="flex flex-col gap-2">
            <label htmlFor="sinopse" className="font-bold text-gray-200">
              Sinopse
            </label>
            <textarea
              id="sinopse"
              rows="4"
              disabled={enviando}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-100 focus:outline-none focus:border-yellow-500 transition-colors resize-none disabled:opacity-50"
              {...register("sinopse", {
                required: "A sinopse é obrigatória",
                minLength: {
                  value: 10,
                  message: "A sinopse precisa conter ao menos 10 letras",
                },
              })}
            ></textarea>
            {errors.sinopse && (
              <span className="text-red-500 text-sm">
                {errors.sinopse.message}
              </span>
            )}
          </div>

          {/* URL da Capa */}
          <div className="flex flex-col gap-2">
            <label htmlFor="capaUrl" className="font-bold text-gray-200">
              URL da Capa
            </label>
            <input
              id="capaUrl"
              type="text"
              disabled={enviando}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-100 focus:outline-none focus:border-yellow-500 transition-colors disabled:opacity-50"
              {...register("capaUrl", {
                required: "A URL da capa é obrigatória",
                pattern: {
                  value:
                    /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})(\/[\w.-]*)*\/?$/,
                  message:
                    "Por favor, digite um endereço de imagem (URL) válido",
                },
              })}
            />
            {errors.capaUrl && (
              <span className="text-red-500 text-sm">
                {errors.capaUrl.message}
              </span>
            )}
          </div>

          {/* Botões */}
          <div className="flex gap-4 mt-4">
            <button
              type="button"
              disabled={enviando}
              onClick={() => navigate(-1)}
              className="flex-1 py-3 px-4 bg-transparent text-gray-300 font-bold border border-gray-700 rounded-lg hover:bg-gray-800 hover:text-white transition-colors disabled:opacity-50"
            >
              Voltar
            </button>

            <button
              type="submit"
              disabled={enviando}
              className="flex-[2] py-3 px-4 bg-yellow-500 text-gray-900 font-bold rounded-lg hover:bg-yellow-600 transition-colors disabled:opacity-50"
            >
              {enviando ? "Salvando..." : "Salvar Filme"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default Cadastro;
