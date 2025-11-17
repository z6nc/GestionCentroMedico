import { TituloCustom } from "../../components/common/titulos/tituloCustom"
import { useCitas } from "../../hooks/useCitas"
import { useMedicosPorEspecialidad } from "../../hooks/useMedicos";
import { usePacientes } from "../../hooks/usePaciente";
import { useHorarioMedico } from "../../hooks/useHorarioMedico";
import { useState } from "react";
export function VistaListaCitas() {
    const { pacientes } = usePacientes();
    const { medicos } = useMedicosPorEspecialidad();
    const { horarios } = useHorarioMedico();
    const { ListaCitas, isLoadingCitas, error, CancelarCita } = useCitas();
    const [cancelando, setCancelando] = useState<number | null>(null);

    const handleCancelar = async (numero: number) => {
        if (!confirm('¿Estás seguro de cancelar esta cita?')) return;

        setCancelando(numero);
        try {
            await CancelarCita(numero);
            alert('Cita cancelada exitosamente');
        } catch (err) {
            alert('Error al cancelar la cita');
            console.error(err);
        } finally {
            setCancelando(null);
        }
    };
    return (
        <main>
            <TituloCustom titulo="Lista de todas las Citas" />
            <section className="m-9 bg-white">
                {
                    isLoadingCitas ? <p>Cargando citas...</p> : error ? <p>Error al cargar las citas</p> : null
                }
                <h2 className="text-lg  font-semibold p-4 ">Lista de Citas</h2>
                <div className="  p-4 grid grid-cols-1 lg:grid-cols-3  gap-4">
                    {ListaCitas?.map((cita) => (


                        <div className="flex  flex-col shadow-md p-4 mb-4 " key={cita.numero}>
                            <div className="flex flex-col  gap-y-3">
                                <div className="flex items-center gap-4 mb-3">
                                    <div className="bg-[#00c950] text-white px-3 py-1 rounded-full text-sm font-semibold">{cita?.numero}</div>
                                    <span className="text-gray-600 text-sm">📅 {cita?.fecha.toString()}</span>
                                </div>
                                <ul className="text-sm text-gray-500">
                                    <li>DNI : <span>{pacientes?.find(paciente => paciente.numero == cita.pacienteId)?.dni}</span></li>
                                    <li>Paciente : <span>{pacientes?.find(paciente => paciente.numero == cita.pacienteId)?.nombre} {pacientes?.find(paciente => paciente.numero == cita.pacienteId)?.apellido}</span></li>
                                    <li>Medico : <span>{medicos?.find(medico => medico.numero == cita.idDoctor)?.nombre}</span></li>
                                    <li>especialidad : <span>{medicos?.find(medico => medico.numero == cita.idDoctor)?.especialidad}</span></li>
                                    <li>Tipo Cita : <span>{cita.tipoCita}</span></li>
                                    <li>Horario Inicio : <span>{horarios?.find(horario => horario.numero == cita.horarioId)?.horaInicio}</span></li>
                                    <li>Horario Fin : <span>{horarios?.find(horario => horario.numero == cita.horarioId)?.horaFin}</span></li>
                                    <li>Estado : <span className={`text-xs text-white font-semibold px-1 rounded ${cita.estado === "CANCELADA" ? "bg-red-500" : cita.estado === "RESERVADA" ? "bg-green-500" : "bg-orange-500"}`}>{cita.estado}</span></li>
                                </ul>
                                <div className="flex items-center gap-2">
                                    <span className="text-2xl font-bold text-gray-800">S/{cita?.costo}</span>
                                </div>
                            </div>
                            <button
                                className="bg-red-400 cursor-pointer ml-auto rounded-lg text-white p-2 text-sm disabled:opacity-50"
                                onClick={() => handleCancelar(cita.numero)}
                                disabled={cancelando === cita.numero || cita.estado === "CANCELADA"}
                            >
                                {cancelando === cita.numero ? 'Cancelando...' : 'Cancelar Cita'}
                            </button>
                        </div>
                    ))}
                </div>

            </section>

        </main>
    )
}