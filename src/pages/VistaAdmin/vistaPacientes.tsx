import { TituloCustom } from "../../components/common/titulos/tituloCustom"
import { PersonaData } from "../../data/pacientes.data"
import { columnasPacientes } from "../../components/layout/Pacientes/columnaPaciente"
import { DataTable } from "../../components/common/Tablas/tabla"
import type { Paciente } from "../../schema/paciente.schema"
import { useState } from "react"
import { usePacientes } from "../../hooks/usePaciente"
import { FormModalPaciente } from "../../components/layout/Pacientes/formPaciente"
import { ModalCustom } from "../../components/common/Modal/modalCustom"

export function VistaPacientes() {
    const { pacientes, isLoading, mutate } = usePacientes();
    const [pacienteSeleccionado, setPacienteSeleccionado] = useState<Paciente | null>(null);
    const [modo, setModo] = useState<'agregar' | 'editar'>('agregar');
   const [isModalOpen, setIsModalOpen] = useState(false);
    const handleEditar = (paciente: Paciente) => {
        setPacienteSeleccionado(paciente);
        setModo('editar');
        setIsModalOpen(true);
    };

    const handleAgregar = () => {
        setPacienteSeleccionado(null);
        setModo('agregar');
        setIsModalOpen(true);
    };

    const onSubmit = async (data: Paciente) => {
        try {
            if (modo === 'editar' && pacienteSeleccionado) {
                // PUT al backend
                await fetch(`/api/pacientes/${pacienteSeleccionado.DniPaciente}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                });
            } else {
                // POST al backend para agregar nuevo paciente
                await fetch("/api/pacientes", {
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

    if (isLoading) return <p>Cargando pacientes...</p>;
    return (
        <section className="">
            <TituloCustom titulo="Pacientes" />
            <div className=" xl:max-w-max m-9 flex flex-col gap-y-9 items-start ">
                <button
                    onClick={handleAgregar}
                    className="bg-blue-600 p-2 text-white rounded-lg text-sm cursor-pointer"
                >
                    Agregar Paciente
                </button>

                <DataTable columns={columnasPacientes(handleEditar)} data={PersonaData || []} />

                {isModalOpen && (
                    <ModalCustom
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        title={`${modo} Pacientes`}
                    >
                        <FormModalPaciente
                            onSubmit={onSubmit}
                            initialData={pacienteSeleccionado || undefined}
                            mode={modo}
                        />
                    </ModalCustom>
                )}
            </div>

        </section>
    )
}
