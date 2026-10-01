import { useEffect, useState, useMemo } from "react";
import { getEquipamentos } from "../services/api";
import CartaoEquipamento from "../components/CartaoEquipamento";
import BarraPesquisaFiltros from "../components/BarraPesquisaFiltros";

export default function PaginaPrincipal() {
  const [equipamentos, setEquipamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  // Estados dos Filtros
  const [textoPesquisa, setTextoPesquisa] = useState("");
  const [tipoSelecionado, setTipoSelecionado] = useState("");
  const [marcaSelecionada, setMarcaSelecionada] = useState("");
  const [ordenacao, setOrdenacao] = useState("relevancia");

  // Obter equipamentos da API
  useEffect(() => {
    getEquipamentos()
      .then((data) => {
        setEquipamentos(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao carregar equipamentos:", err);
        setErro("Não foi possível carregar os equipamentos.");
        setLoading(false);
      });
  }, []);

  // Obter lista única de marcas para o menu dropdown
  const marcasDisponiveis = useMemo(() => {
    const marcas = equipamentos.map((e) => e.marca).filter(Boolean);
    return [...new Set(marcas)];
  }, [equipamentos]);

  // Lógica combinada de Filtragem e Ordenação
  const equipamentosFiltrados = useMemo(() => {
    return equipamentos
      .filter((eq) => {
        const atendeTexto = eq.nome
          ?.toLowerCase()
          .includes(textoPesquisa.toLowerCase());

        // Verifica tipo ou categoria
        const categoriaOuTipo = eq.tipo || eq.categoria || "";
        const atendeTipo = tipoSelecionado
          ? categoriaOuTipo
              .toLowerCase()
              .includes(tipoSelecionado.toLowerCase())
          : true;

        const atendeMarca = marcaSelecionada
          ? eq.marca === marcaSelecionada
          : true;

        return atendeTexto && atendeTipo && atendeMarca;
      })
      .sort((a, b) => {
        if (ordenacao === "preco-asc") return a.precoDia - b.precoDia;
        if (ordenacao === "preco-desc") return b.precoDia - a.precoDia;
        if (ordenacao === "avaliacao")
          return (b.avaliacao || 0) - (a.avaliacao || 0);
        return 0;
      });
  }, [
    equipamentos,
    textoPesquisa,
    tipoSelecionado,
    marcaSelecionada,
    ordenacao,
  ]);

  if (loading) {
    return (
      <div className="text-center py-16 text-gray-500 font-medium">
        A carregar catálogo...
      </div>
    );
  }

  if (erro) {
    return (
      <div className="text-center py-16 text-red-600 font-medium">{erro}</div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
        Catálogo de Equipamentos
      </h1>

      <BarraPesquisaFiltros
        textoPesquisa={textoPesquisa}
        setTextoPesquisa={setTextoPesquisa}
        tipoSelecionado={tipoSelecionado}
        setTipoSelecionado={setTipoSelecionado}
        marcaSelecionada={marcaSelecionada}
        setMarcaSelecionada={setMarcaSelecionada}
        ordenacao={ordenacao}
        setOrdenacao={setOrdenacao}
        marcasDisponiveis={marcasDisponiveis}
      />

      {equipamentosFiltrados.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
          {equipamentosFiltrados.map((equipamento) => (
            <CartaoEquipamento key={equipamento.id} equipamento={equipamento} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-gray-500 bg-white rounded-xl border border-gray-100 max-w-md mx-auto shadow-sm mt-8">
          Nenhum equipamento encontrado com os filtros selecionados.
        </div>
      )}
    </div>
  );
}
