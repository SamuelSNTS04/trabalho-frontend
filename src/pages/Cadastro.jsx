function Cadastro() {
  return (
    <div className="cadastro-container">
      <h2>Cadastro de Filmes/Séries</h2>
      
      <form>
        <div>
          <label htmlFor="titulo">Título</label>
          <input id="titulo" type="text" />
        </div>

        <div>
          <label htmlFor="genero">Gênero</label>
          <select id="genero">
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
          <input id="ano" type="number" />
        </div>

        <div>
          <label htmlFor="sinopse">Sinopse</label>
          <textarea id="sinopse" rows="4"></textarea>
        </div>

        <div>
          <label htmlFor="capaUrl">URL da Capa</label>
          <input id="capaUrl" type="text" />
        </div>

        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default Cadastro;