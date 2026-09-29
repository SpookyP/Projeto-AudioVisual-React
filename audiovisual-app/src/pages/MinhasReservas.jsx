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
            // atualiza a lista sem recarregar a página
            setReservas((atuais) => atuais.filter((r) => r.id !== id));
        } catch {
            alert("Não foi possível cancelar a reserva.");
        } finally {
            setACancelarId(null);
        }
    };

    if (loading) return <p className="p-4">A carregar reservas...</p>;
    if (erro) return <p className="p-4 text-red-600">{erro}</p>;

    return (
        <section className="mx-auto max-w-3xl p-4">
            <h1 className="mb-4 text-2xl font-bold">As minhas reservas</h1>

            {reservas.length === 0 ? (
                <p className="text-gray-600">Ainda não tens reservas.</p>
            ) : (
                <ul className="space-y-3">
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