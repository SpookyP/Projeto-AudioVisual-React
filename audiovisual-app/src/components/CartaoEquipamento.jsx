import { useState } from "react";
import { Link } from "react-router-dom";
import { Star, Heart, ImageOff } from "lucide-react";
import { useFavoritos } from "../Context/FavoritosContext.jsx";

export default function CartaoEquipamento({ equipamento }) {
  const [erroImagem, setErroImagem] = useState(false);
  const { isFavorito, toggleFavorito } = useFavoritos();
  const favorito = isFavorito(equipamento.id);

  const categoriaOuTipo =
    equipamento.tipo || equipamento.categoria || "Equipamento";

  return (
    <div className="group relative flex flex-col justify-between rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition duration-200 overflow-hidden">
      <div className="relative aspect-[4/3] w-full bg-slate-100 overflow-hidden flex items-center justify-center">
        {!erroImagem && equipamento.imagem ? (
          <img
            src={equipamento.imagem}
            alt={equipamento.nome}
            onError={() => setErroImagem(true)}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-slate-400 gap-1.5 p-4 text-center">
            <ImageOff className="w-8 h-8 stroke-[1.5]" />
            <span className="text-xs font-medium text-slate-400">
              Sem imagem
            </span>
          </div>
        )}

        <span className="absolute top-3 left-3 z-10 rounded-md bg-slate-900/80 backdrop-blur-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
          {categoriaOuTipo}
        </span>

        <button
          type="button"
          onClick={() => toggleFavorito(equipamento.id)}
          className="absolute top-3 right-3 z-10 rounded-full bg-white/90 p-2 text-slate-700 shadow-sm hover:bg-white transition"
          aria-label="Adicionar aos favoritos"
        >
          <Heart
            className={`w-4 h-4 ${
              favorito ? "fill-rose-500 text-rose-500" : "text-slate-500"
            }`}
          />
        </button>
      </div>

      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
            {equipamento.marca || "Geral"}
          </p>
          <h3 className="mt-1 text-base font-extrabold text-slate-900 line-clamp-1">
            {equipamento.nome}
          </h3>

          {equipamento.avaliacao && (
            <div className="mt-2 flex items-center gap-1 text-xs font-bold text-slate-700">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>{equipamento.avaliacao}</span>
            </div>
          )}
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
          <div>
            <span className="text-lg font-extrabold text-slate-900">
              {equipamento.precoDia}€
            </span>
            <span className="text-xs font-medium text-slate-400"> / dia</span>
          </div>

          <Link
            to={`/detalhes/${equipamento.id}`}
            className="rounded-lg bg-amber-500 hover:bg-amber-600 px-3.5 py-2 text-xs font-bold text-slate-950 transition shadow-sm"
          >
            Ver Detalhes
          </Link>
        </div>
      </div>
    </div>
  );
}
