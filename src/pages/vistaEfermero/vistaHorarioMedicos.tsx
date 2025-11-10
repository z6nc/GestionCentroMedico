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
        <main className="p-4">
            <TituloCustom titulo="Horario Médicos" />

            <ErrorBoundary FallbackComponent={() => <div>Error al mostrar la tabla de médicos.</div>}>
               {medicos.map((medico) => {
                                // Convertir medicoId (string) a number y verificar que medico.numero esté definido
                                const horariosDelMedico = medico.numero != null
                                    ? horarios.filter(h => Number(h.medicoId) === medico.numero)
                                    : [];

                                return (
                                    <div key={medico.numero} style={{ border: "1px solid #ccc", marginBottom: "16px", padding: "8px" }}>
                                        <h2>{medico.nombre} {medico.apellido} - {medico.especialidad}</h2>

                                        {horariosDelMedico.length > 0 ? (
                                            <ul>
                                                {horariosDelMedico.map(h => (
                                                    <li key={h.numero}>
                                                        Fecha: {new Date(h.fecha).toLocaleDateString()} | {h.horaInicio} - {h.horaFin} | {h.disponibilidad ? "Disponible" : "Ocupado"}
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p>No tiene horarios programados.</p>
                                        )}
                                    </div>
                                );
                            })}
                
            </ErrorBoundary>
        </main>
    );
}
