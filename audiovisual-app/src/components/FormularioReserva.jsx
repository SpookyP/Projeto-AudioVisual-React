import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { verificarDisponibilidadeAPI, criarReserva } from "../services/api";
import { calcularTotal, calcularDias } from "../utils/precos";

// Data de hoje no formato AAAA-MM-DD, na hora local
const hoje = () => new Date().toLocaleDateString("sv-SE");

const classeInput =
    "w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none";
const classeErro = "mt-1 text-sm text-red-600";

export default function FormularioReserva({ item }) {
    const {
        register,
        handleSubmit,
        watch,
        trigger,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        mode: "onTouched",
        defaultValues: { quantidade: 1 },
    });

    const [disponivel, setDisponivel] = useState(null); // null | true | false
    const [aVerificar, setAVerificar] = useState(false);
    const [sucesso, setSucesso] = useState("");
    const [erroApi, setErroApi] = useState("");

    const [dataInicio, dataFim, quantidade] = watch([
        "dataInicio",
        "dataFim",
        "quantidade",
    ]);

    const dias = calcularDias(dataInicio, dataFim);
    const total = calcularTotal(item.precoDia, dataInicio, dataFim, Number(quantidade));

    // Se o utilizador mudar datas ou quantidade, a verificação anterior deixa de valer
    useEffect(() => {
        setDisponivel(null);
    }, [dataInicio, dataFim, quantidade]);

    const verificar = async () => {
        const valido = await trigger(["dataInicio", "dataFim", "quantidade"]);
        if (!valido) return;

        setAVerificar(true);
        try {
            const resultado = await verificarDisponibilidadeAPI(
                item.id,
                dataInicio,
                dataFim,
                Number(quantidade)
            );
            setDisponivel(resultado);
        } catch {
            setDisponivel(null);
            alert("Não foi possível verificar a disponibilidade.");
        } finally {
            setAVerificar(false);
        }
    };

    const onSubmit = async (dados) => {
        setSucesso("");
        setErroApi("");
        try {
            const reserva = await criarReserva({
                itemId: item.id,
                dataInicio: dados.dataInicio,
                dataFim: dados.dataFim,
                quantidade: dados.quantidade, // já é número (valueAsNumber)
                nome: dados.nome,
                email: dados.email,
            });
            setSucesso(`Reserva confirmada! Total: ${Number(reserva.total).toFixed(2)} €`);
            reset({ quantidade: 1 });
            setDisponivel(null);
        } catch (e) {
            if (e.status === 409) setErroApi("Sem disponibilidade para essas datas.");
            else if (e.status === 400) setErroApi(`Dados inválidos: ${e.message}`);
            else setErroApi("Erro inesperado. Tenta novamente.");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
            <div>
                <label className="mb-1 block font-medium">Nome</label>
                <input
                    className={classeInput}
                    {...register("nome", { required: "O nome é obrigatório." })}
                />
                {errors.nome && <p className={classeErro}>{errors.nome.message}</p>}
            </div>

            <div>
                <label className="mb-1 block font-medium">Email</label>
                <input
                    type="email"
                    className={classeInput}
                    {...register("email", {
                        required: "O email é obrigatório.",
                        pattern: { value: /^\S+@\S+\.\S+$/, message: "Email inválido." },
                    })}
                />
                {errors.email && <p className={classeErro}>{errors.email.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="mb-1 block font-medium">Levantamento</label>
                    <input
                        type="date"
                        min={hoje()}
                        className={classeInput}
                        {...register("dataInicio", {
                            required: "Escolhe a data de levantamento.",
                            validate: (v) => v >= hoje() || "A data não pode ser no passado.",
                        })}
                    />
                    {errors.dataInicio && (
                        <p className={classeErro}>{errors.dataInicio.message}</p>
                    )}
                </div>

                <div>
                    <label className="mb-1 block font-medium">Devolução</label>
                    <input
                        type="date"
                        min={dataInicio || hoje()}
                        className={classeInput}
                        {...register("dataFim", {
                            required: "Escolhe a data de devolução.",
                            validate: (v) =>
                                !dataInicio ||
                                v >= dataInicio ||
                                "A devolução não pode ser antes do levantamento.",
                        })}
                    />
                    {errors.dataFim && <p className={classeErro}>{errors.dataFim.message}</p>}
                </div>
            </div>

            <div>
                <label className="mb-1 block font-medium">
                    Quantidade (máx. {item.maxPorReserva})
                </label>
                <input
                    type="number"
                    className={classeInput}
                    {...register("quantidade", {
                        valueAsNumber: true,
                        required: "Indica a quantidade.",
                        min: { value: 1, message: "Mínimo 1." },
                        max: {
                            value: item.maxPorReserva,
                            message: `Máximo ${item.maxPorReserva} por reserva.`,
                        },
                    })}
                />
                {errors.quantidade && (
                    <p className={classeErro}>{errors.quantidade.message}</p>
                )}
            </div>

            {total > 0 && (
                <div className="rounded bg-gray-100 p-3">
                    <p>
                        {item.precoDia} € × {dias} {dias === 1 ? "dia" : "dias"} × {quantidade}
                    </p>
                    <p className="text-lg font-bold">Total: {total.toFixed(2)} €</p>
                </div>
            )}

            <button
                type="button"
                onClick={verificar}
                disabled={aVerificar}
                className="w-full rounded border border-blue-600 px-4 py-2 text-blue-600 hover:bg-blue-50 disabled:opacity-50"
            >
                {aVerificar ? "A verificar..." : "Verificar disponibilidade"}
            </button>

            {disponivel === true && (
                <p className="rounded bg-green-100 p-2 text-green-800">
                    ✔ Disponível nestas datas.
                </p>
            )}
            {disponivel === false && (
                <p className="rounded bg-red-100 p-2 text-red-800">
                    ✖ Indisponível nestas datas.
                </p>
            )}

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
            >
                {isSubmitting ? "A enviar..." : "Reservar"}
            </button>

            {sucesso && <p className="rounded bg-green-100 p-2 text-green-800">{sucesso}</p>}
            {erroApi && <p className="rounded bg-red-100 p-2 text-red-800">{erroApi}</p>}
        </form>
    );
}