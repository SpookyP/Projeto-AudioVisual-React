import { useState, useEffect } from "react";
import { getReservas, cancelarReserva } from "../services/api";
import ReservaCard from "../components/ReservaCard";

export default function MinhasReservas() {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");
  const [aCancelarId, setACancelarId] = useState(null);

  useEffect(() => {
    getReservas()
      .then(setReservas)
      .catch(() => setErro("Não foi possível carregar as reservas."))
      .finally(() => setLoading(false));
  }, []);

  const handleCancelar = async (id) => {
    if (!window.confirm("Queres mesmo cancelar esta reserva?")) return;

    setACancelarId(id);
    try {
      await cancelarReserva(id);
      setReservas((atuais) =>
        atuais.filter((r) => String(r.id) !== String(id)),
      );
    } catch {
      alert("Não foi possível cancelar a reserva.");
    } finally {
      setACancelarId(null);
    }
  };

  if (loading) {
    return (
      <p className="text-center py-16 text-gray-500 font-medium">
        A carregar reservas...
      </p>
    );
  }

  if (erro) {
    return <p className="text-center py-16 text-red-600 font-medium">{erro}</p>;
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-6 text-3xl font-extrabold text-gray-900 text-center">
        As minhas reservas
      </h1>

      {reservas.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-100 shadow-sm text-gray-500">
          Ainda não tens reservas efetuadas.
        </div>
      ) : (
        <ul className="space-y-4">
          {reservas.map((reserva) => (
            <ReservaCard
              key={reserva.id}
              reserva={reserva}
              aCancelar={aCancelarId === reserva.id}
              onCancelar={handleCancelar}
            />
          ))}
        </ul>
      )}
    </section>
  );
}
