import { columnasMedicos } from "./ColumnaMedicos"
import { DataTable } from "../../common/Tablas/tabla"
import { useState } from "react"
import { useMedicosPorEspecialidad } from "../../../hooks/useMedicos"
import { FormModalMedico } from "./FormularioMedicos"
import { ModalCustom } from "../../common/Modal/modalCustom"
import type { MedicoProps } from "../../../schema/medicos.schema"
import { Suspense } from "react"
import { FiltrosMedicos } from "./FiltrosMedicos/filtroMedicos"

export function VistaMedicoContent() {
    const [especialidad, setEspecialidad] = useState<string>("")
        const { medicos, mutate } = useMedicosPorEspecialidad(especialidad);
        const [medicoSeleccionado, setMedicoSeleccionado] = useState<MedicoProps | null>(null);
        const [modo, setModo] = useState<'agregar' | 'editar'>('agregar');
        const [isModalOpen, setIsModalOpen] = useState(false);
    
        const handleEditar = (medico: MedicoProps) => {
            setMedicoSeleccionado(medico);
            setModo('editar');
            setIsModalOpen(true);
        };
    
        const handleAgregar = () => {
            setMedicoSeleccionado(null);
            setModo('agregar');
            setIsModalOpen(true);
        };
    
        const onSubmit = async (data: MedicoProps) => {
            try {
                if (modo === 'editar' && medicoSeleccionado) {
                    // PUT al backend
                    await fetch(`http://localhost:8091/medico/actualizar/${medicoSeleccionado.numero}`, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(data),
                    });
                } else {
                    // POST al backend para agregar nuevo medico
                    await fetch("http://localhost:8091/medico/guardar", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(data),
                    });
                }
                mutate(); // refetch SWR
                setIsModalOpen(false);
            } catch (err) {
                console.error("Error guardando paciente:", err);
            }
        };
    
    return (
        <div className=" xl:max-w-max m-9 flex flex-col gap-y-9 items-start bg-white p-20 ">
            <FiltrosMedicos
                especialidad={especialidad}
                setEspecialidad={setEspecialidad}
                handleAgregar={handleAgregar}
            />

            <Suspense fallback={<p>Cargando tablassss.ss..</p>}>
                <DataTable columns={columnasMedicos(handleEditar)} data={medicos || []} />
            </Suspense>

            {isModalOpen && (
                <ModalCustom
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    title={`${modo} Médicos`}
                >
                    <FormModalMedico
                        onSubmit={onSubmit}
                        initialData={medicoSeleccionado || undefined}
                        mode={modo}
                    />
                </ModalCustom>
            )}
        </div>

    )
}