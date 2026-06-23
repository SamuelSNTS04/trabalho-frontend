import { Link } from "react-router-dom"; // 👈 CONFIRA SE ESSA LINHA ESTÁ AQUI!

function Erro404() {
  return (
    <main className="container mx-auto min-h-[75vh] flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-8xl md:text-9xl font-black text-yellow-500 tracking-wider">
        404
      </h1>

      <div className="max-w-md mx-auto mt-6 bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-xl">
        <span className="text-4xl mb-3 block" role="img" aria-label="Nave Espacial">
          🛸
        </span>
        <h2 className="text-xl md:text-2xl font-bold text-gray-100 mb-3 leading-snug">
          "Estes não são os droids... digo, a página que você está procurando."
        </h2>
        <p className="text-xs md:text-sm text-yellow-500/80 font-semibold tracking-wide uppercase">
          — Adaptação de Obi-Wan Kenobi, Star Wars
        </p>
      </div>

      <p className="text-gray-400 text-sm md:text-base mt-6 max-w-xs md:max-w-sm leading-relaxed">
        Parece que você pegou um atalho errado no hiperespaço. A URL digitada não corresponde a nenhum filme ou recurso do nosso catálogo.
      </p>

      <Link
        to="/"
        className="mt-8 inline-block w-full sm:w-auto py-3 px-8 bg-yellow-500 text-gray-900 font-bold rounded-lg hover:bg-yellow-600 transition-colors shadow-md text-base"
      >
        Voltar para a Base Segura 🏠
      </Link>
    </main>
  );
}

export default Erro404;