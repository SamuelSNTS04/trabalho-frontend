import { useForm } from "react-hook-form";

function Cadastro() {
  // Extraindo errors do formState
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="cadastro-container">
      <h2>Cadastro de Filmes/Séries</h2>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="titulo">Título</label>
          <input id="titulo" type="text" {...register("titulo", { required: "O título é obrigatório" })} />
          {errors.titulo && <span style={{ color: "#ff4a4a", fontSize: "14px" }}>{errors.titulo.message}</span>}
        </div>

        <div>
          <label htmlFor="genero">Gênero</label>
          <select id="genero" {...register("genero", { required: "Selecione um gênero válido" })}>
            <option value="">Selecione um gênero...</option>
            <option value="Ação">Ação</option>
            <option value="Drama">Drama</option>
            <option value="Ficção Científica">Ficção Científica</option>
            <option value="Fantasia">Fantasia</option>
            <option value="Série / Drama">Série / Drama</option>
          </select>
          {errors.genero && <span style={{ color: "#ff4a4a", fontSize: "14px" }}>{errors.genero.message}</span>}
        </div>

        <div>
          <label htmlFor="ano">Ano de Lançamento</label>
          <input 
            id="ano" 
            type="number" 
            {...register("ano", { 
              required: "O ano é obrigatório",
              min: { value: 1888, message: "Ano inválido" },
              max: { value: 2030, message: "O ano não pode ser muito no futuro" }
            })} 
          />
          {errors.ano && <span style={{ color: "#ff4a4a", fontSize: "14px" }}>{errors.ano.message}</span>}
        </div>

        <div>
          <label htmlFor="sinopse">Sinopse</label>
          <textarea 
            id="sinopse" 
            rows="4" 
            {...register("sinopse", { 
              required: "A sinopse é obrigatória",
              minLength: { value: 10, message: "A sinopse deve ter pelo menos 10 caracteres" }
            })}
          ></textarea>
          {errors.sinopse && <span style={{ color: "#ff4a4a", fontSize: "14px" }}>{errors.sinopse.message}</span>}
        </div>

        <div>
          <label htmlFor="capaUrl">URL da Capa</label>
          <input 
            id="capaUrl" 
            type="text" 
            {...register("capaUrl", { 
              required: "A URL da capa é obrigatória",
              pattern: {
                value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/,
                message: "Insira uma URL válida"
              }
            })} 
          />
          {errors.capaUrl && <span style={{ color: "#ff4a4a", fontSize: "14px" }}>{errors.capaUrl.message}</span>}
        </div>

        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default Cadastro;