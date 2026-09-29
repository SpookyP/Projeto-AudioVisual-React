import { calcularDias } from "../utils/precos";

const formatarData = (data) =>
    new Date(data).toLocaleDateString("pt-PT");

export default function ReservaCard({ reserva, onCancelar, aCancelar }) {
    const nome = reserva.item?.nome ?? `Equipamento #${reserva.itemId}`;
    const dias = calcularDias(reserva.dataInicio, reserva.dataFim);

    return (
        <li className="flex flex-col gap-3 rounded border border-gray-200 p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <div>
                <h3 className="text-lg font-semibold">{nome}</h3>
                <p className="text-sm text-gray-600">
                    {formatarData(reserva.dataInicio)} → {formatarData(reserva.dataFim)} (
                    {dias} {dias === 1 ? "dia" : "dias"})
                </p>
                <p className="text-sm text-gray-600">Quantidade: {reserva.quantidade}</p>
                <p className="mt-1 font-bold">
                    Total: {Number(reserva.total).toFixed(2)} €
                </p>
            </div>

            <button
                type="button"
                onClick={() => onCancelar(reserva.id)}
                disabled={aCancelar}
                className="rounded border border-red-600 px-4 py-2 text-red-600 hover:bg-red-50 disabled:opacity-50"
            >
                {aCancelar ? "A cancelar..." : "Cancelar"}
            </button>
        </li>
    );
}