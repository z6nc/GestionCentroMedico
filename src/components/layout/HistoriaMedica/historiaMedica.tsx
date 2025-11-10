import { ProfileCard } from "../../common/historia/ProfileCard"
import type { Paciente } from "../../../schema/paciente.schema"
import type { PropsListaAtencioMedica } from "../../../data/historiaMedica.data"
import { useState } from "react"
import { AppointmentCard } from "./AppointmentCard"
import { FormModalHistoriaMedica } from "./formHistoriaMedica"
import { ModalCustom } from "../../common/Modal/modalCustom"
import type { HistoriaMedicaProps } from "../../../schema/historiaMedica.schema"
interface HistoriaMedicaDataProps {
    pacienteProps: Paciente
    ListaAtencionProps: PropsListaAtencioMedica[]
    historiaMedicaProps?: HistoriaMedicaProps
}

export function HistoriaMedicaPaciente({ pacienteProps, ListaAtencionProps, historiaMedicaProps }: HistoriaMedicaDataProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modo, setModo] = useState<'agregar' | 'editar'>('agregar');
    const [selectedId, setSelectedId] = useState<string | null>(null)
    const [historiaSeleccionada, setHistoriaSeleccionada] = useState<HistoriaMedicaProps | null>(null);
    const { edad, peso, altura, tipoSangre } = historiaMedicaProps || {};
    const { nombre, apellido } = pacienteProps || {};
    const datoscompletos = {
        nombre,
        apellido,
        edad,
        peso,
        altura,
        tipoSangre
    };

    const handleEditar = (historia: HistoriaMedicaProps) => {
        setHistoriaSeleccionada(historia);
        setModo('editar');
        setIsModalOpen(true);
    };

    const handleAgregar = () => {
        setHistoriaSeleccionada(null);
        setModo('agregar');
        setIsModalOpen(true);
    };


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
            <div className="flex flex-col gap-y-7">
                <ProfileCard
                    title="Información del Paciente"
                    data={datoscompletos || {}}
                    Nombre={pacienteProps.nombre}
                    Apellido={pacienteProps.apellido}
                />
                <div className="flex flex-wrap gap-3">
                    <button
                        onClick={handleAgregar}
                        className="bg-blue-600 p-2 text-white rounded-lg text-sm cursor-pointer"
                    >
                        Agregar Historia Medica
                    </button>
                    <button
                        onClick={() => handleEditar(historiaMedicaProps!)}
                        className="bg-green-500 p-2 text-white rounded-lg text-sm cursor-pointer"
                    >
                        Editar Historia Medica
                    </button>
                </div>


            </div>

            <div className="flex-1 bg-white rounded-lg shadow-md p-5">
                {
                    ListaAtencionProps.length > 0 ? (
                        <div className="flex flex-col gap-6">
                            {ListaAtencionProps.map((historia) => (
                                <AppointmentCard key={historia.IdHistoria} citaMedica={historia} isSelected={selectedId === historia.IdHistoria} onClick={() => handleClick(historia.IdHistoria)} />
                            ))}
                        </div>
                    ) : (
                        <div className="flex-1">
                            <p>No hay atenciones médicas registradas.</p>
                        </div>
                    )}


            </div>

            {isModalOpen && (
                <ModalCustom
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    title={`${modo} Historia Medica`}
                >
                    <FormModalHistoriaMedica
                        onSubmit={(historiaEditada) => {
                            console.log(historiaEditada);
                            setIsModalOpen(false); // cerrar modal
                        }}
                        initialData={historiaSeleccionada || undefined}
                        mode={modo}
                        pacienteId={pacienteProps.numero || 0} // importante para agregar
                    />
                </ModalCustom>
            )}

        </section>
    )
}

