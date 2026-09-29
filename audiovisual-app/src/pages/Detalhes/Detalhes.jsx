import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Heart, ArrowLeft } from 'lucide-react';
import { getEquipamentos } from '../../services/api';
import { useFavoritos } from '../../Context/FavoritosContext.jsx';
import FormularioReserva from "../../components/FormularioReserva";

export default function Detalhes() {
  const { id } = useParams();
  const [equipamento, setEquipamento] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isFavorito, toggleFavorito } = useFavoritos();

  useEffect(() => {
    getEquipamentos()
      .then((data) => {
        const equipamentoEncontrado = data.find(
          (item) => String(item.id) === String(id)
        );
        setEquipamento(equipamentoEncontrado);
        setLoading(false);
      })

      .catch((err) => {
        console.error('Erro ao carregar equipamento:', err);
        setLoading(false);
      });

  }, [id]);

  if (loading) {
    return (
      <div className="text-center py-12 text-gray-500">
        A carregar equipamento...
      </div>
    );
  }

  if (!equipamento) {
    return (
      <div className="text-center py-12 text-red-500">
        Equipamento não encontrado.
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">

      {/* Botão voltar */}
      <div className="w-full max-w-5xl mb-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-slate-700 hover:text-amber-600 font-medium transition"
        >
          <ArrowLeft className="w-5 h-5" />
          Voltar ao catálogo
        </Link>
      </div>

      {/* Cartão de detalhes */}
      <div className="w-full max-w-5xl bg-white rounded-xl shadow-md overflow-hidden">

        <div className="grid grid-cols-1 md:grid-cols-2">

          {/* Imagem */}
          <div className="relative h-96 md:h-full min-h-[500px] bg-gray-200">

            <img
              src={equipamento.imagem}
              alt={equipamento.nome}
              className="w-full h-full object-cover"
            />

            <span className="absolute top-4 left-4 bg-slate-900/80 text-white text-sm px-3 py-1 rounded-full uppercase tracking-wider font-semibold">
              {equipamento.tipo}
            </span>

          </div>

          {/* Informação */}
          <div className="p-8 flex flex-col justify-center">

            <div className="flex justify-between items-start gap-4">

              <div>
                <p className="text-sm text-gray-500 font-medium mb-1">
                  {equipamento.marca}
                </p>

                <h1 className="text-3xl font-bold text-gray-900">
                  {equipamento.nome}
                </h1>
              </div>

              <button
                onClick={() => toggleFavorito(equipamento.id)}
                className="bg-gray-100 hover:bg-gray-200 rounded-full p-3"
              >
                <Heart
                  className={`w-6 h-6 ${
                    isFavorito(equipamento.id)
                      ? 'fill-red-500 text-red-500'
                      : 'text-gray-500'
                  }`}
                />
              </button>

            </div>

            {/* Avaliação */}
            <div className="flex items-center gap-2 mt-5">

              <Star className="w-5 h-5 fill-amber-500 text-amber-500" />

              <span className="font-semibold text-gray-700">
                {equipamento.avaliacao}
              </span>

            </div>

            {/* Preço */}
            <div className="mt-8 border-t border-gray-100 pt-6">

              <span className="text-3xl font-bold text-slate-900">
                {equipamento.precoDia}€
              </span>

              <span className="text-gray-500 ml-1">
                / dia
              </span>

            </div>

            {/* Descrição */}
            <div className="mt-8">

              <h2 className="text-xl font-bold text-gray-900 mb-3">
                Descrição
              </h2>

              <p className="text-gray-600 leading-relaxed">
                {equipamento.descricao || 'Sem descrição disponível.'}
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Formulário de reserva */}
      <section
          id="reservar"
          className="mt-8 w-full max-w-5xl scroll-mt-24 rounded-xl bg-white p-8 shadow-md"
      >
        <h2 className="mb-4 text-2xl font-bold text-gray-900">
          Reservar este equipamento
        </h2>
        <FormularioReserva item={equipamento} />
      </section>

    </div>
  );
}

