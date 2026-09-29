import { useEffect, useState } from 'react';
import { getEquipamentos } from '../../services/api';
import CartaoEquipamento from '../../components/CartaoEquipamento';
import { useFavoritos } from '../../Context/FavoritosContext.jsx';

export default function Favoritos() {

  const { favoritos } = useFavoritos();
  const [equipamentos, setEquipamentos] = useState([]);

  useEffect(() => {
    getEquipamentos()
      .then((data) => {
        setEquipamentos(data);
      })
      .catch((err) => {
        console.error("Erro ao carregar favoritos:", err);
      });
  }, []);

  const equipamentosFavoritos = equipamentos.filter((equipamento) =>
    favoritos.includes(equipamento.id)
  );

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Meus Favoritos
      </h1>

      {equipamentosFavoritos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {equipamentosFavoritos.map((equipamento) => (
            <CartaoEquipamento
              key={equipamento.id}
              equipamento={equipamento}
            />
          ))}
        </div>
        
      ) : (

        <div className="text-center py-12 text-gray-500 bg-white rounded-xl border border-gray-100">
          Ainda não tens equipamentos favoritos.
        </div>
      )}

    </div>
  );
}

