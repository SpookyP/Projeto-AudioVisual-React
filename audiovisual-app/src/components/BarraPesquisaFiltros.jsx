import { Search } from "lucide-react";

export default function BarraPesquisaFiltros({
  textoPesquisa,
  setTextoPesquisa,
  tipoSelecionado,
  setTipoSelecionado,
  marcaSelecionada,
  setMarcaSelecionada,
  ordenacao,
  setOrdenacao,
  marcasDisponiveis = [],
}) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row gap-4 justify-between items-center">
      <div className="relative w-full md:w-1/3">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Pesquisar por nome do equipamento..."
          value={textoPesquisa}
          onChange={(e) => setTextoPesquisa(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
        />
      </div>

      <div className="flex flex-wrap md:flex-nowrap gap-3 w-full md:w-auto">
        <select
          value={tipoSelecionado}
          onChange={(e) => setTipoSelecionado(e.target.value)}
          className="w-full md:w-auto px-3 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm bg-white"
        >
          <option value="">Todos os Tipos</option>
          <option value="Câmara">Câmara</option>
          <option value="Drone">Drone</option>
          <option value="Iluminação">Iluminação</option>
          <option value="Som">Som</option>
        </select>

        <select
          value={marcaSelecionada}
          onChange={(e) => setMarcaSelecionada(e.target.value)}
          className="w-full md:w-auto px-3 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm bg-white"
        >
          <option value="">Todas as Marcas</option>
          {marcasDisponiveis.map((marca) => (
            <option key={marca} value={marca}>
              {marca}
            </option>
          ))}
        </select>

        <select
          value={ordenacao}
          onChange={(e) => setOrdenacao(e.target.value)}
          className="w-full md:w-auto px-3 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm bg-white"
        >
          <option value="relevancia">Ordernar por: Relevância</option>
          <option value="preco-asc">Preço: Mais Baixo</option>
          <option value="preco-desc">Preço: Mais Alto</option>
          <option value="avaliacao">Melhor Avaliação</option>
        </select>
      </div>
    </div>
  );
}