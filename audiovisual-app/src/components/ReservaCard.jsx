import { calcularDias } from "../utils/precos";

const formatarData = (data) => new Date(data).toLocaleDateString("pt-PT");

export default function ReservaCard({ reserva, onCancelar, aCancelar }) {
  const nome = reserva.item?.nome ?? `Equipamento #${reserva.itemId}`;
  const dias = calcularDias(reserva.dataInicio, reserva.dataFim);

  return (
    <li className="flex flex-col gap-4 rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition hover:shadow-md sm:flex-row sm:items-center sm:justify-between">
      <div className="space-y-1">
        <h3 className="text-lg font-bold text-gray-900">{nome}</h3>

        <p className="text-sm text-gray-600 font-medium">
          {formatarData(reserva.dataInicio)} → {formatarData(reserva.dataFim)}{" "}
          <span className="text-xs text-gray-500 font-normal">
            ({dias} {dias === 1 ? "dia" : "dias"})
          </span>
        </p>

        <p className="text-xs text-gray-500">
          Quantidade:{" "}
          <span className="font-semibold text-gray-700">
            {reserva.quantidade}
          </span>
        </p>

        <p className="text-base font-extrabold text-slate-900 pt-1">
          Total: {Number(reserva.total).toFixed(2)} €
        </p>
      </div>

      <div className="flex sm:flex-col justify-end">
        <button
          type="button"
          onClick={() => onCancelar(reserva.id)}
          disabled={aCancelar}
          className="w-full sm:w-auto rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 hover:border-red-300 disabled:opacity-50 transition"
        >
          {aCancelar ? "A cancelar..." : "Cancelar Reserva"}
        </button>
      </div>
    </li>
  );
}
