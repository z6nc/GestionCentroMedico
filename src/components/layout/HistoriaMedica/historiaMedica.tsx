import { ProfileCard } from "../../common/historia/ProfileCard"
import type { Paciente } from "../../../schema/paciente.schema"
import type { PropsListaAtencioMedica } from "../../../data/historiaMedica.data"
import { useState } from "react"
import { AppointmentCard } from "./AppointmentCard"
interface HistoriaMedicaProps {
    pacienteProps: Paciente
    historiaProps: PropsListaAtencioMedica[]
}

export function HistoriaMedicaPaciente({ pacienteProps, historiaProps }: HistoriaMedicaProps) {
    const [selectedId, setSelectedId] = useState<string | null>(null)

    const handleClick = (id: string) => {
        // Si ya está abierto, lo cerramos
        if (selectedId === id) {
            setSelectedId(null)
        } else {
            setSelectedId(id)
        }
    }


    return (
        <section className="text-black  flex  p-9 gap-9">
            <ProfileCard
                title="Información del Paciente"
                data={pacienteProps}
                Nombre={pacienteProps.Nombre}
                Apellido={pacienteProps.Apellido}
            />

            <div className="flex-1 bg-white rounded-lg shadow-md p-5">
                {
                    historiaProps.length > 0 ? (
                        <div className="flex flex-col gap-6">
                            {historiaProps.map((historia) => (
                                <AppointmentCard key={historia.IdHistoria} citaMedica={historia} isSelected={selectedId === historia.IdHistoria} onClick={() => handleClick(historia.IdHistoria)} />
                            ))}
                        </div>
                    ) : (
                        <div className="flex-1">
                            <p>No hay atenciones médicas registradas.</p>
                        </div>
                    )}


            </div>

        </section>
    )
}

