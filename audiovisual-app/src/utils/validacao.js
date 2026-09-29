export function validarReserva({ dataInicio, dataFim, quantidade, nome, email }, maxQuantidade) {
    const erros = {};
    const hoje = new Date().toISOString().slice(0, 10);

    if (!nome.trim()) erros.nome = "O nome é obrigatório.";
    if (!/^\S+@\S+\.\S+$/.test(email)) erros.email = "Email inválido.";
    if (!dataInicio) erros.dataInicio = "Escolhe a data de levantamento.";
    else if (dataInicio < hoje) erros.dataInicio = "A data não pode ser no passado.";
    if (!dataFim) erros.dataFim = "Escolhe a data de devolução.";
    else if (dataInicio && dataFim < dataInicio)
        erros.dataFim = "A devolução não pode ser antes do levantamento.";
    const q = Number(quantidade);
    if (!Number.isInteger(q) || q < 1 || q > maxQuantidade)
        erros.quantidade = `Quantidade entre 1 e ${maxQuantidade}.`;

    return erros;
}