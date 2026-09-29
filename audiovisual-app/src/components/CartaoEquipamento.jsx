import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';

export default function CartaoEquipamento({ equipamento }) {
  const { id, nome, imagem, precoDia, avaliacao, tipo, marca } = equipamento;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow flex flex-col justify-between border border-gray-100">
      <div>
        <div className="relative h-48 bg-gray-200">
          <img
            src={imagem}
            alt={nome}
            className="w-full h-full object-cover"
          />
          <span className="absolute top-2 left-2 bg-slate-900/80 text-white text-xs px-2.5 py-1 rounded-full uppercase tracking-wider font-semibold">
            {tipo}
          </span>
        </div>

        <div className="p-5">
          <div className="text-xs text-gray-500 font-medium mb-1">{marca}</div>
          <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-1">{nome}</h3>

          <div className="flex items-center gap-1 text-amber-500 mb-4">
            <Star className="w-4 h-4 fill-amber-500" />
            <span className="text-sm font-semibold text-gray-700">{avaliacao}</span>
          </div>
        </div>
      </div>

      <div className="px-5 pb-5 pt-0 flex justify-between items-center border-t border-gray-100 mt-2">
        <div>
          <span className="text-2xl font-bold text-slate-900">{precoDia}€</span>
          <span className="text-xs text-gray-500"> / dia</span>
        </div>
        <Link
          to={`/detalhes/${id}`}
          className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold px-4 py-2 rounded-lg text-sm transition"
        >
          Ver Detalhes
        </Link>
      </div>
    </div>
  );
}