import { ErrorBoundary } from "react-error-boundary";
import { TituloCustom } from "../../components/common/titulos/tituloCustom";
import { useHorarioMedico } from "../../hooks/useHorarioMedico";
import { useMedicosPorEspecialidad } from "../../hooks/useMedicos";

export function VistaHorarioMedicos() {
    const { horarios, error: errorHorarios } = useHorarioMedico();
    const { medicos, error: errorMedicos } = useMedicosPorEspecialidad();

    if (errorHorarios || errorMedicos) {
        return <div>Error al cargar los datos.</div>;
    }

    if (!horarios || !medicos) {
        return <p>Cargando datos...</p>;
    }
    // Crear un mapa { medicoId: [horarios...] }


    return (
        <main className="">
            <TituloCustom titulo="Horario Médicos" />

            <ErrorBoundary FallbackComponent={() => <div>Error al mostrar la tabla de médicos.</div>}>
                <section className="flex flex-col gap-4 p-4">
                    {medicos.map((medico) => {
                        // Convertir medicoId (string) a number y verificar que medico.numero esté definido
                        const horariosDelMedico = medico.numero != null
                            ? horarios.filter(h => Number(h.medicoId) === medico.numero)
                            : [];

                        return (
                            <div key={medico.numero} className=" flex justify-between px-9 py-14 bg-white rounded-xl border border-gray-300 max-w-7xl items-center ">
                                <div className="flex items-center gap-6">
                                    <div className="w-16 h-16 bg-gradient-to-br from-[#00c950] to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                                        {medico.nombre
                                            .split(" ")
                                            .map((n) => n[0])
                                            .join("")}
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <h2 className="font-bold text-lg">{medico.nombre} {medico.apellido}  </h2>
                                        <p className="text-gray-500 text-sm">{medico.especialidad}</p>

                                    </div>

                                </div>

                                {horariosDelMedico.length > 0 ? (
                                    <ul className="">
                                        {horariosDelMedico.map(h => (
                                            <li key={h.numero} className="text-gray-500">
                                                Fecha: {new Date(h.fecha).toLocaleDateString()} | {h.horaInicio} - {h.horaFin} | {h.disponibilidad ? "Disponible" : "Ocupado"}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-gray-500">No tiene horarios programados.</p>
                                )}
                            </div>
                        );
                    })}
                </section>

            </ErrorBoundary>
        </main>
    );
}
