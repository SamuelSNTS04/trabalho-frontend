function NoResults({ searchTerm }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-gray-800/50 rounded-lg border border-dashed border-gray-600">
      <span className="text-5xl mb-4 opacity-70">🍿</span>
      <h3 className="text-xl font-bold text-gray-200 mb-2">Poxa, nenhum título encontrado!</h3>
      <p className="text-gray-400 max-w-md">
        Não achamos nada na nossa base com os filtros que você selecionou.
        {searchTerm && (
          <span className="block mt-1">
            Tente verificar a ortografia de <strong>"{searchTerm}"</strong> ou limpe os filtros.
          </span>
        )}
      </p>
    </div>
  );
}

export default NoResults;