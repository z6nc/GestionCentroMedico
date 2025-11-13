import type { Paciente } from "../../../schema/paciente.schema";
import type { PropsListaAtencioMedica } from "../../../data/historiaMedica.data";
import { useState } from "react";
import { AppointmentCard } from "./AppointmentCard";
import { DetalleHistoriaMedica } from "./detalleHistoriaMedica";

interface HistoriaMedicaDataProps {
    pacienteProps: Paciente | null;
    ListaAtencionProps: PropsListaAtencioMedica[];
}

export function HistoriaMedicaPaciente({
    pacienteProps,
    ListaAtencionProps,
}: HistoriaMedicaDataProps) {
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const handleClick = (id: string) => {
        setSelectedId(prev => (prev === id ? null : id));
    };

    // Pasar valores por defecto a DetalleHistoriaMedica para que nunca falte nada
    const numero = pacienteProps?.numero ?? 0; // si 0 significa "sin cargar" en tu app
    const nombre = pacienteProps?.nombre ?? "—";
    const apellido = pacienteProps?.apellido ?? "—";

    return (
        <section className="text-black flex p-9 gap-9">
            {/* Siempre renderizamos DetalleHistoriaMedica; ProfileCard internamente muestra error o loading */}
            <DetalleHistoriaMedica
                Idpaciente={numero}
                NombrePaciente={nombre}
                ApellidoPaciente={apellido}
            />

            <div className="flex-1 bg-white rounded-lg shadow-md p-5">
                {ListaAtencionProps.length > 0 ? (
                    <div className="flex flex-col gap-6">
                        {ListaAtencionProps.map((historia) => (
                            <AppointmentCard
                                key={historia.IdHistoria}
                                citaMedica={historia}
                                isSelected={selectedId === historia.IdHistoria}
                                onClick={() => handleClick(historia.IdHistoria)}
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
