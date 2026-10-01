import { useEffect, useState } from "react";
import { getEquipamentos } from "../../services/api";
import CartaoEquipamento from "../../components/CartaoEquipamento";
import { useFavoritos } from "../../Context/FavoritosContext.jsx";

export default function Favoritos() {
  const { favoritos } = useFavoritos();
  const [equipamentos, setEquipamentos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEquipamentos()
      .then((data) => {
        setEquipamentos(data);
      })
      .catch((err) => {
        console.error("Erro ao carregar favoritos:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  // Garantir comparação segura por String entre os IDs
  const equipamentosFavoritos = equipamentos.filter((equipamento) =>
    favoritos.map(String).includes(String(equipamento.id)),
  );

  if (loading) {
    return (
      <div className="text-center py-16 text-gray-500 font-medium">
        A carregar favoritos...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
        Meus Favoritos
      </h1>

      {equipamentosFavoritos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {equipamentosFavoritos.map((equipamento) => (
            <CartaoEquipamento key={equipamento.id} equipamento={equipamento} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-gray-500 bg-white rounded-xl border border-gray-100 max-w-md mx-auto shadow-sm">
          Ainda não tens equipamentos salvos nos favoritos.
        </div>
      )}
    </div>
  );
}
