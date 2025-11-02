import { TituloCustom } from "../../components/common/titulos/tituloCustom"
// import { PersonaData } from "../../data/pacientes.data"
import { columnasPacientes } from "../../components/layout/Pacientes/columnaPaciente"
import { DataTable } from "../../components/common/Tablas/tabla"
import type { Paciente } from "../../schema/paciente.schema"
import { useState } from "react"
import { usePacientes } from "../../hooks/usePaciente"
import { FormModalPaciente } from "../../components/layout/Pacientes/formPaciente"
import { ModalCustom } from "../../components/common/Modal/modalCustom"
import { ErrorBoundary } from "react-error-boundary"
import { toast } from "react-toastify"

export function VistaPacientes() {
    const { pacientes, mutate, error } = usePacientes();
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
                await fetch(`http://localhost:8092/paciente/actualizar/${pacienteSeleccionado.numero}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                });
                toast.success("Paciente actualizado correctamente");
            } else {
                // POST al backend para agregar nuevo paciente
                await fetch("http://localhost:8092/paciente/guardar", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                });
                toast.success("Paciente agregado correctamente");
            }
            mutate(); // refetch SWR
            setIsModalOpen(false);
        } catch (err) {
            console.error("Error guardando paciente:", err);
            toast.error("Error al guardar el paciente. Por favor, inténtelo de nuevo.");
        }
    };

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
                <ErrorBoundary FallbackComponent={() => <div>Error al cargar la tabla de Paciente.</div>}>
                    {pacientes ? (
                        <DataTable columns={columnasPacientes(handleEditar)} data={pacientes || []} />
                    ) : error ? (
                        <div>
                            Error al cargar la tabla de pacientes.
                        </div>
                    ) : (
                        <p>Cargando tabla...</p>
                    )}
                </ErrorBoundary>

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
