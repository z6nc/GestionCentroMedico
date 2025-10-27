import { ProfileCard } from "../../common/historia/ProfileCard"
import type { Paciente } from "../../../schema/paciente.schema"
import type { PropsHistoriaMedica } from "../../../data/historiaMedica.data"
interface HistoriaMedicaProps {
 pacienteProps: Paciente
 historiaProps: PropsHistoriaMedica[]
}   
export function HistoriaMedicaPaciente({ pacienteProps, historiaProps }: HistoriaMedicaProps) {

    return (
         <section className="text-black  flex  p-9 gap-9">
            <ProfileCard
                title="Información del Paciente"
                data={pacienteProps}
                Nombre={pacienteProps.Nombre}
                Apellido={pacienteProps.Apellido}
            />
            <div className="flex-1 bg-white rounded-lg shadow-md p-5">
                <h2 className="border-b border-gray-100  text-gray-400 font-semibold text-xl uppercase">Historial medico del Paciente</h2>

                {historiaProps.length > 0 ? (
                    historiaProps.map((historia) => (
                        <div key={historia.IdHistoria} className=" py-4 rounded-lg mb-3">
                            <p><span className="font-semibold text-gray-700">Fecha:</span> {new Date(historia.fecha).toLocaleDateString()}</p>
                            <p><span className="font-semibold text-gray-700">Descripción:</span> {historia.descripcion}</p>
                            <p><span className="font-semibold text-gray-700">Diagnóstico:</span> {historia.diagnostico}</p>
                            <p><span className="font-semibold text-gray-700">Tratamiento:</span> {historia.tratamiento}</p>
                            <p><span className="font-semibold text-gray-700">Notas:</span> {historia.notas}</p>
                        </div>
                    ))
                ) : (
                    <p>No hay historial registrado para este paciente.</p>
                )}
            </div>
         </section>
    )
}

