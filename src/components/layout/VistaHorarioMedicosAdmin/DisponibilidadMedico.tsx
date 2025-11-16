// import { InputSelect } from "../../common/InputCustom"
import { useState } from "react";
import { useMedicosPorEspecialidad } from "../../../hooks/useMedicos";
export const DisponibilidadMedico = () => {
    const Especialidad = ["",'Cardiologia', 'Dermatologia', 'Neurologia', 'Pediatria'];
    const [especialidadSeleccionada, setEspecialidadSeleccionada] = useState<string>("");
    const [medicoSeleccionado, setMedicoSeleccionado] = useState<string>("");
    const { medicos, error } = useMedicosPorEspecialidad(especialidadSeleccionada);
    return (
        <section>
            <h2>DisponibilidadMedico</h2>
            <div>
                <div>
                    <label>Selecciona especialidad:</label>
                    <select onChange={(e) => setEspecialidadSeleccionada(e.target.value)}>
                    {Especialidad.map((especialidad) => (
                        <option key={especialidad} value={especialidad}  >
                            {especialidad}
                        </option>
                    ))}
                </select>
                
                </div>
                <div>
                    {error && <div>Error al cargar los médicos.</div>}
                    
                    {!medicos ? (
                        <div>Cargando médicos...</div>
                    ) : (
                        <div>
                            <label htmlFor="">Selecciona médico (opcional)</label>
                            <select name="" id="" onChange={(e) => setMedicoSeleccionado(e.target.value)}>
                                <option value="">--Todos los medicos--</option>
                                {medicos.map((medico) => (
                                    <option key={medico.numero} value={medico.numero}>{medico.nombre}</option>
                                ))}
                            </select>
                        </div>
                     
                    )}
                </div>
            </div>



        </section>
    )
}
