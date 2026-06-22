import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useWatchlist } from "../context/WatchlistContext";

function Cadastro() {
  const { addMovieToList } = useWatchlist();
  const navigate = useNavigate();

  // Incluindo o reset para limpar o form no sucesso
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // 3.4 - Função Assíncrona de Envio (POST)
  const onSubmit = async (data) => {
    const novoFilme = {
      // Como o json-server precisa mapear sua estrutura do db.json, vamos formatar os dados adequadamente:
      titulo: data.titulo,
      diretor: "Desconhecido", // Campo fixo exigido pela API mas opcional no form
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

        // 3.5 - Integração: Adiciona ao Estado Global sem nova chamada de GET
        addMovieToList(filmeSalvo);

        // 3.6 - Feedback de sucesso e limpeza
        reset();
        alert("Filme cadastrado com sucesso!");

        // 3.6 - Redirecionamento automático
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
    <div
      className="cadastro-container"
      style={{ maxWidth: "500px", margin: "0 auto" }}
    >
      <h2 style={{ color: "var(--cor-destaque)", marginBottom: "20px" }}>
        🎬 Cadastrar Novo Filme/Série
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <label htmlFor="titulo" style={{ fontWeight: "bold" }}>
            Título
          </label>
          <input
            id="titulo"
            type="text"
            style={{
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid var(--borda)",
              backgroundColor: "var(--bg-card)",
              color: "#fff",
            }}
            {...register("titulo", { required: "O título é obrigatório" })}
          />
          {errors.titulo && (
            <span style={{ color: "#ff4a4a", fontSize: "14px" }}>
              {errors.titulo.message}
            </span>
          )}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <label htmlFor="genero" style={{ fontWeight: "bold" }}>
            Gênero
          </label>
          <select
            id="genero"
            style={{
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid var(--borda)",
              backgroundColor: "var(--bg-card)",
              color: "#fff",
            }}
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
            <span style={{ color: "#ff4a4a", fontSize: "14px" }}>
              {errors.genero.message}
            </span>
          )}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <label htmlFor="ano" style={{ fontWeight: "bold" }}>
            Ano de Lançamento
          </label>
          <input
            id="ano"
            type="number"
            style={{
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid var(--borda)",
              backgroundColor: "var(--bg-card)",
              color: "#fff",
            }}
            {...register("ano", {
              required: "O ano é obrigatório",
              min: { value: 1888, message: "O ano deve ser maior que 1888" },
              max: { value: 2030, message: "O ano limite é 2030" },
            })}
          />
          {errors.ano && (
            <span style={{ color: "#ff4a4a", fontSize: "14px" }}>
              {errors.ano.message}
            </span>
          )}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <label htmlFor="sinopse" style={{ fontWeight: "bold" }}>
            Sinopse
          </label>
          <textarea
            id="sinopse"
            rows="4"
            style={{
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid var(--borda)",
              backgroundColor: "var(--bg-card)",
              color: "#fff",
              resize: "none",
            }}
            {...register("sinopse", {
              required: "A sinopse é obrigatória",
              minLength: {
                value: 10,
                message: "A sinopse precisa conter ao menos 10 letras",
              },
            })}
          ></textarea>
          {errors.sinopse && (
            <span style={{ color: "#ff4a4a", fontSize: "14px" }}>
              {errors.sinopse.message}
            </span>
          )}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <label htmlFor="capaUrl" style={{ fontWeight: "bold" }}>
            URL da Capa
          </label>
          <input
            id="capaUrl"
            type="text"
            style={{
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid var(--borda)",
              backgroundColor: "var(--bg-card)",
              color: "#fff",
            }}
            {...register("capaUrl", {
              required: "A URL da capa é obrigatória",
              pattern: {
                value:
                  /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/,
                message: "Por favor, digite um endereço de imagem (URL) válido",
              },
            })}
          />
          {errors.capaUrl && (
            <span style={{ color: "#ff4a4a", fontSize: "14px" }}>
              {errors.capaUrl.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          style={{
            padding: "12px",
            backgroundColor: "var(--cor-destaque)",
            color: "var(--bg-principal)",
            fontWeight: "bold",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            marginTop: "10px",
            fontSize: "16px",
          }}
        >
          Salvar Filme
        </button>
      </form>
    </div>
  );
}

export default Cadastro;
