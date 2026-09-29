import { useForm } from "react-hook-form";

const hoje = () => new Date().toLocaleDateString("sv-SE"); // AAAA-MM-DD, hora local

const classeInput =
    "w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none";
const classeErro = "mt-1 text-sm text-red-600";

export default function FormularioReserva({ item }) {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({ mode: "onTouched" });

    const dataInicio = watch("dataInicio");

    const onSubmit = (dados) => {
        console.log("Dados válidos:", dados); // temporário
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
                                !dataInicio || v >= dataInicio || "A devolução não pode ser antes do levantamento.",
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
                    defaultValue={1}
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

            <button
                type="submit"
                className="w-full rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
                Reservar
            </button>
        </form>
    );
}