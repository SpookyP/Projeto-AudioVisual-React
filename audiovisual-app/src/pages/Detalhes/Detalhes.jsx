import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Heart, ArrowLeft, ImageOff } from 'lucide-react';
import { getEquipamentos } from '../../services/api';
import { useFavoritos } from '../../Context/FavoritosContext.jsx';
import FormularioReserva from "../../components/FormularioReserva";

export default function Detalhes() {
  const { id } = useParams();
  const [equipamento, setEquipamento] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erroImagem, setErroImagem] = useState(false);
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
      <div className="text-center py-16 text-slate-500 font-medium">
        A carregar equipamento...
      </div>
    );
  }

  if (!equipamento) {
    return (
      <div className="text-center py-16 text-rose-600 font-medium">
        Equipamento não encontrado.
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Botão voltar */}
      <div className="mb-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-amber-600 font-semibold text-sm transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar ao catálogo
        </Link>
      </div>

      {/* Grelha Principal (2 Colunas no Desktop) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Coluna Esquerda: Imagem e Detalhes do Produto (7 Colunas) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Contentor de Imagem com Fallback */}
          <div className="relative aspect-[4/3] w-full rounded-2xl bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center">
            {!erroImagem && equipamento.imagem ? (
              <img
                src={equipamento.imagem}
                alt={equipamento.nome}
                onError={() => setErroImagem(true)}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-slate-400 gap-2 p-6">
                <ImageOff className="w-12 h-12 stroke-[1.5]" />
                <span className="text-xs font-medium">Sem imagem disponível</span>
              </div>
            )}

            {/* Badge de Categoria/Tipo */}
            <span className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md text-white text-xs px-3 py-1 rounded-md uppercase tracking-wider font-bold shadow-sm">
              {equipamento.tipo}
            </span>
          </div>

          {/* Cartão de Informação Principal */}
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-4">
            <div className="flex justify-between items-start gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  {equipamento.marca}
                </p>
                <h1 className="text-2xl font-extrabold text-slate-900 mt-1">
                  {equipamento.nome}
                </h1>
              </div>

              {/* Botão Favorito */}
              <button
                type="button"
                onClick={() => toggleFavorito(equipamento.id)}
                className="bg-slate-100 hover:bg-slate-200 rounded-full p-3 transition"
                aria-label="Adicionar aos favoritos"
              >
                <Heart
                  className={`w-5 h-5 ${
                    isFavorito(equipamento.id)
                      ? 'fill-rose-500 text-rose-500'
                      : 'text-slate-500'
                  }`}
                />
              </button>
            </div>

            {/* Avaliação */}
            {equipamento.avaliacao && (
              <div className="flex items-center gap-1.5 text-sm font-bold text-slate-700">
                <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                <span>{equipamento.avaliacao}</span>
              </div>
            )}

            <hr className="border-slate-100" />

            {/* Descrição */}
            <div>
              <h2 className="text-base font-bold text-slate-900 mb-2">
                Descrição
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                {equipamento.descricao || 'Sem descrição disponível.'}
              </p>
            </div>
          </div>

        </div>

        {/* Coluna Direita: Cartão Sticky de Reserva (5 Colunas) */}
        <div id="reservar" className="lg:col-span-5 lg:sticky lg:top-6 scroll-mt-24">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-md space-y-6">
            
            {/* Preço por dia */}
            <div className="flex items-baseline justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-3xl font-black text-slate-900">
                  {equipamento.precoDia}€
                </span>
                <span className="text-sm text-slate-500 font-medium"> / dia</span>
              </div>
            </div>

            {/* Formulário de Reserva */}
            <div>
              <h2 className="mb-4 text-lg font-bold text-slate-900">
                Reservar este equipamento
              </h2>
              <FormularioReserva item={equipamento} />
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}