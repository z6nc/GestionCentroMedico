// import { InputSelect } from "../../common/InputCustom"
import { useState } from "react";
import { useMedicosPorEspecialidad } from "../../../hooks/useMedicos";
import { useHorariosPorMedico } from "../../../hooks/useHorarioMedico";
import type { propshoraiosPorMedico } from "../../../hooks/useHorarioMedico";
export const DisponibilidadMedico = () => {
    const Especialidad = ['Cardiologia', 'Dermatologia', 'Psiquiatria', 'Medicina General', 'Pediatria'];
    const [especialidadSeleccionada, setEspecialidadSeleccionada] = useState<string>("");
    // id Medico para enviar a la  url 
    const [medicoSeleccionado, setMedicoSeleccionado] = useState<string>("");
    const { medicos, error } = useMedicosPorEspecialidad(especialidadSeleccionada);
    const [selectedDate, setSelectedDate] = useState<string>("");
    const [parametrosQuery, setParametrosQuery] = useState<propshoraiosPorMedico | null>(null);

    const { horariosFiltrados, isLoading, error: errorHorarios } = useHorariosPorMedico({
        medicoId: parametrosQuery?.medicoId,
        fecha: parametrosQuery?.fecha,
        disponible: parametrosQuery?.disponible, // Asumiendo que también quieres pasarlo
    });


    // 4. El manejador del botón
    const handleFiltrarClick = () => {
        
        setParametrosQuery({
            medicoId: medicoSeleccionado,
            fecha: selectedDate,
            // disponible: "true", // O cualquier valor que tengas para 'disponible'
        });
    };

    return (
        <section className="m-9 px-9 py-9 bg-white border-2 rounded-lg  border-gray-200 flex flex-col gap-y-6 ">
            <h2 className="text-xl font-semibold">Disponibilidad de Medico</h2>
            <div className="flex flex-col gap-y-4 ">
                <div className="flex flex-col mr-auto gap-y-2">
                    <label>Selecciona especialidad:</label>
                    <select className="w-full h-10 px-3 py-2 border border-slate-300 rounded-md" onChange={(e) => setEspecialidadSeleccionada(e.target.value)}>
                        <option value="">Todas las especialidades</option>
                        {Especialidad.map((especialidad) => (
                            <option key={especialidad} value={especialidad}  >
                                {especialidad}
                            </option>
                        ))}
                    </select>

                </div>
                <div className="flex flex-col mr-auto">
                    {error && <div>Error al cargar los médicos.</div>}

                    {!medicos ? (
                        <div>Cargando médicos...</div>
                    ) : (
                        <div className="flex flex-col gap-y-2">
                            <label htmlFor="">Selecciona médico (opcional)</label>
                            <select className="w-full h-10 px-3 py-2 border border-slate-300 rounded-md" name="" id="" onChange={(e) => setMedicoSeleccionado(e.target.value)}>
                                <option value="">Todos los medicos</option>
                                {medicos.map((medico) => (
                                    <option key={medico.numero} value={medico.numero}>{medico.nombre}</option>
                                ))}
                            </select>
                        </div>

                    )}
                </div>
                <div className="flex flex-col mr-auto">
                    <div className="flex flex-col gap-y-2">
                        <label className="">
                            Selecciona fecha
                        </label>
                        <input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="w-full h-10 px-3 py-2 border border-slate-300 rounded-md"
                        />
                    </div>

                </div>
                <button className="bg-blue-600 mr-auto rounded-lg cursor-pointer text-white px-9 py-2" onClick={handleFiltrarClick} disabled={!medicoSeleccionado || isLoading}>
                    {isLoading ? "Buscando..." : "Filtrar"}
                </button>
                {
                    horariosFiltrados && horariosFiltrados.length > 0 ? (
                        <div>
                            <h3 className="text-lg font-medium mb-4">Horarios Disponibles:</h3>
                            <div className="flex flex-wrap gap-9">
                                {horariosFiltrados.map((horario) => (
                                    <div key={horario.numero} className="flex flex-col border border-gray-300 rounded-lg p-4 w-60 gap-y-2 shadow-md">
                                        <span> Hora Inicio: {horario.horaInicio}</span>
                                        <span> Hora Fin: {horario.horaFin} </span>
                                        <span className={`text-sm py-1 rounded-lg text-center   ${horario.disponible ? "text-green-700 bg-green-100" : "text-red-600 bg-red-100"}`} > {horario.disponible ? "Disponible" : "No Disponible"}</span>
                                        <span className="bg-purple-100  text-purple-700  text-xs rounded-lg text-center  py-1 ">Consultorio {horario.consultorio}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div>No hay horarios disponibles para los filtros seleccionados.</div>
                    )
                }
            </div>



        </section>
    )
}
