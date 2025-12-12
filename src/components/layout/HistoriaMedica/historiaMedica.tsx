// import type { Paciente } from "../../../schema/paciente.schema";
// import type { PropsListaAtencioMedica } from "../../../data/historiaMedica.data";
import { useState } from "react";
import { AppointmentCard } from "./AppointmentCard";
import { DetalleHistoriaMedica } from "./detalleHistoriaMedica"
import type { ExpedienteMedico } from "../../../hooks/useHistoriaMedica";

// interface HistoriaMedicaDataProps {
//     pacienteProps: Paciente | null;
//     ListaAtencionProps: PropsListaAtencioMedica[];
// }

export function HistoriaMedicaPaciente(ExpedienteClinico: ExpedienteMedico) {
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const handleClick = (id: string) => {
        setSelectedId(prev => (prev === id ? null : id));
    };

    return (
        <section className="text-black flex p-9 gap-9">
            <DetalleHistoriaMedica
                Idpaciente={ExpedienteClinico.paciente.numero || 0}
                NombrePaciente={ExpedienteClinico.paciente.nombre}
                ApellidoPaciente={ExpedienteClinico.paciente.apellido}
            />

            <div className="flex-1 bg-white rounded-lg shadow-md p-5">
                {ExpedienteClinico.listaCitas.length > 0 ? (
                    <div className="flex flex-col gap-6">
                        {ExpedienteClinico.listaCitas.map((historia) => (
                            <AppointmentCard
                                key={historia.cita.numero}
                                citasMedica={historia.cita}
                                atencionMedica={historia.atencion}
                                isSelected={selectedId === historia.cita.numero.toString()}
                                onClick={() => handleClick(historia.cita.numero.toString())}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="flex-1">
                        <p>No hay atenciones médicas registradas.</p>
                    </div>
                )}
            </div>
        </section>
    );
}
