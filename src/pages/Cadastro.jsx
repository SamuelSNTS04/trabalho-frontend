import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useWatchlist } from "../context/WatchlistContext";

function Cadastro() {
  const { addMovieToList } = useWatchlist();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const novoFilme = {
      titulo: data.titulo,
      diretor: "Desconhecido",
      ano: Number(data.ano),
      categoria: data.genero,
      status: "minha-lista",
      sinopse: data.sinopse,
      capaUrl: data.capaUrl,
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
      alert("Não foi possível conectar ao servidor.");
    }
  };

  return (
    <main className="container mx-auto p-6">
      {/* Cabeçalho centralizado para seguir o padrão do formulário */}
      <header className="mb-8 border-b border-gray-800 pb-6 text-center">
        <h1 className="text-3xl font-bold text-yellow-500">🎬 Cadastrar Novo Filme/Série</h1>
        <p className="text-gray-400 mt-2">
          Preencha os detalhes abaixo para adicionar um novo título ao catálogo.
        </p>
      </header>

      {/* Container do formulário centralizado */}
      <div className="max-w-xl mx-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          
          <div className="flex flex-col gap-2">
            <label htmlFor="titulo" className="font-bold text-gray-200">
              Título
            </label>
            <input
              id="titulo"
              type="text"
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-100 focus:outline-none focus:border-yellow-500 transition-colors"
              {...register("titulo", { required: "O título é obrigatório" })}
            />
            {errors.titulo && (
              <span className="text-red-500 text-sm">{errors.titulo.message}</span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="genero" className="font-bold text-gray-200">
              Gênero
            </label>
            <select
              id="genero"
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-100 focus:outline-none focus:border-yellow-500 transition-colors"
              {...register("genero", { required: "Selecione um gênero válido" })}
            >
              <option value="">Selecione um gênero...</option>
              <option value="Ação">Ação</option>
              <option value="Drama">Drama</option>
              <option value="Ficção Científica">Ficção Científica</option>
              <option value="Fantasia">Fantasia</option>
              <option value="Série / Drama">Série / Drama</option>
            </select>
            {errors.genero && (
              <span className="text-red-500 text-sm">{errors.genero.message}</span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="ano" className="font-bold text-gray-200">
              Ano de Lançamento
            </label>
            <input
              id="ano"
              type="number"
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-100 focus:outline-none focus:border-yellow-500 transition-colors"
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

          <div className="flex flex-col gap-2">
            <label htmlFor="sinopse" className="font-bold text-gray-200">
              Sinopse
            </label>
            <textarea
              id="sinopse"
              rows="4"
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-100 focus:outline-none focus:border-yellow-500 transition-colors resize-none"
              {...register("sinopse", {
                required: "A sinopse é obrigatória",
                minLength: {
                  value: 10,
                  message: "A sinopse precisa conter ao menos 10 letras",
                },
              })}
            ></textarea>
            {errors.sinopse && (
              <span className="text-red-500 text-sm">{errors.sinopse.message}</span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="capaUrl" className="font-bold text-gray-200">
              URL da Capa
            </label>
            <input
              id="capaUrl"
              type="text"
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-100 focus:outline-none focus:border-yellow-500 transition-colors"
              {...register("capaUrl", {
                required: "A URL da capa é obrigatória",
                pattern: {
                  value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/,
                  message: "Por favor, digite um endereço de imagem (URL) válido",
                },
              })}
            />
            {errors.capaUrl && (
              <span className="text-red-500 text-sm">{errors.capaUrl.message}</span>
            )}
          </div>

          {/* Botões usando Tailwind */}
          <div className="flex gap-4 mt-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex-1 py-3 px-4 bg-transparent text-gray-300 font-bold border border-gray-700 rounded-lg hover:bg-gray-800 hover:text-white transition-colors"
            >
              Voltar
            </button>

            <button
              type="submit"
              className="flex-[2] py-3 px-4 bg-yellow-500 text-gray-900 font-bold rounded-lg hover:bg-yellow-600 transition-colors"
            >
              Salvar Filme
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default Cadastro;