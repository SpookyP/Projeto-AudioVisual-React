export function calcularDias(inicio, fim) {
    const ms = new Date(fim) - new Date(inicio);
    return Math.round(ms / (1000 * 60 * 60 * 24)) + 1;
}

export function calcularTotal(precoDia, inicio, fim, quantidade) {
    if (!inicio || !fim || !quantidade) return 0;
    const dias = calcularDias(inicio, fim);
    return dias > 0 ? precoDia * dias * quantidade : 0;
}