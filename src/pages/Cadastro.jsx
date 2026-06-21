import { useForm } from "react-hook-form";

function Cadastro() {
  // Inicializando o hook form
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="cadastro-container">
      <h2>Cadastro de Filmes/Séries</h2>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="titulo">Título</label>
          {/* Validação: Obrigatório */}
          <input id="titulo" type="text" {...register("titulo", { required: "O título é obrigatório" })} />
        </div>

        <div>
          <label htmlFor="genero">Gênero</label>
          {/* Validação: Obrigatório */}
          <select id="genero" {...register("genero", { required: "Selecione um gênero válido" })}>
            <option value="">Selecione um gênero...</option>
            <option value="Ação">Ação</option>
            <option value="Drama">Drama</option>
            <option value="Ficção Científica">Ficção Científica</option>
            <option value="Fantasia">Fantasia</option>
            <option value="Série / Drama">Série / Drama</option>
          </select>
        </div>

        <div>
          <label htmlFor="ano">Ano de Lançamento</label>
          {/* Validação: Obrigatório, valor mínimo e máximo */}
          <input 
            id="ano" 
            type="number" 
            {...register("ano", { 
              required: "O ano é obrigatório",
              min: { value: 1888, message: "Ano inválido" },
              max: { value: 2030, message: "O ano não pode ser muito no futuro" }
            })} 
          />
        </div>

        <div>
          <label htmlFor="sinopse">Sinopse</label>
          {/* Validação: Obrigatória, tamanho mínimo */}
          <textarea 
            id="sinopse" 
            rows="4" 
            {...register("sinopse", { 
              required: "A sinopse é obrigatória",
              minLength: { value: 10, message: "A sinopse deve ter pelo menos 10 caracteres" }
            })}
          ></textarea>
        </div>

        <div>
          <label htmlFor="capaUrl">URL da Capa</label>
          {/* Validação: Obrigatória e validação de padrão URL por Regex */}
          <input 
            id="capaUrl" 
            type="text" 
            {...register("capaUrl", { 
              required: "A URL da capa é obrigatória",
              pattern: {
                value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/,
                message: "Insira uma URL válida (ex: https://...)"
              }
            })} 
          />
        </div>

        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default Cadastro;