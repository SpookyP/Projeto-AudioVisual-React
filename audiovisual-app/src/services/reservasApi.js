const BASE = "http://localhost:3001/audiovisual";

export async function verificarDisponibilidade(itemId, inicio, fim, quantidade) {
    const res = await fetch(
        `${BASE}/items/${itemId}/disponibilidade?inicio=${inicio}&fim=${fim}&quantidade=${quantidade}`,
    );
    if (!res.ok) throw new Error("Erro ao verificar disponibilidade");
    const data = await res.json();
    return data.disponivel;
}

export async function criarReserva(dados) {
    const res = await fetch(`${BASE}/reservas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
    });
    if (!res.ok) {
        const erro = await res.json().catch(() => ({}));
        const e = new Error(erro.erro || erro.message || "Erro ao criar reserva");
        e.status = res.status;
        throw e;
    }
    return res.json();
}

export async function listarReservas() {
    const res = await fetch(`${BASE}/reservas`);
    if (!res.ok) throw new Error("Erro ao carregar reservas");
    return res.json();
}

export async function cancelarReserva(id) {
    const res = await fetch(`${BASE}/reservas/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Erro ao cancelar reserva");
}