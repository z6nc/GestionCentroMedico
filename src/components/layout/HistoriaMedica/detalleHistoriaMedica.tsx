import { ProfileCard } from "../../common/historia/ProfileCard";
import { ModalCustom } from "../../common/Modal/modalCustom";
import { FormModalHistoriaMedica } from "./formHistoriaMedica";
import { useState } from "react";
import type { HistoriaMedicaProps } from "../../../schema/historiaMedica.schema";
import { useHistoriaMedica, useHistoriaPorPaciente } from "../../../hooks/useHistoriaMedica";

interface PropsDetalleHistoriaMedica {
    Idpaciente: number;
    NombrePaciente: string;
    ApellidoPaciente: string;
}

export const DetalleHistoriaMedica = ({
    Idpaciente,
    NombrePaciente,
    ApellidoPaciente,
}: PropsDetalleHistoriaMedica) => {
    // Hook SWR para obtener la historia del paciente (cacheada)
    const {
        historiaPaciente,
        loading: loadingHistoriaPaciente,
        error: errorHistoriaPaciente,
    } = useHistoriaPorPaciente(Idpaciente);

 
    // 🔹 Crear un objeto nuevo para pasar a ProfileCard
    const historiaFiltrada = {
        alergias: historiaPaciente?.alergias ?? "No registrado",
        tipoSangre: historiaPaciente?.tipoSangre ?? "No registrado",
        enfermedadesCronicas: historiaPaciente?.enfermedadesCronicas ?? "No registrado",
        antecedentesFamiliares: historiaPaciente?.antecedentesFamiliares ?? "No registrado",
    };

    // mañana arreglar el agregar y editar
    const {
        guardarHistoria,
        actualizarHistoria,
    } = useHistoriaMedica();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modo, setModo] = useState<"agregar" | "editar">("agregar");
    const [historiaSeleccionada, setHistoriaSeleccionada] = useState<
        HistoriaMedicaProps | null
    >(null);

    // Abrir modal en modo agregar
    const handleAgregar = () => {
        setHistoriaSeleccionada(null);
        setModo("agregar");
        setIsModalOpen(true);
    };

    // Abrir modal en modo editar (si existe historia)
    const handleEditar = () => {
        if (!historiaPaciente) return;
        // Si tu tipo HistoriaMedicaProps tiene nombres distintos, mapea aquí
        setHistoriaSeleccionada(historiaPaciente as HistoriaMedicaProps);
        setModo("editar");
        setIsModalOpen(true);
    };

    // Submit del formulario dentro del modal (guardar o actualizar)
    // const handleSubmit = async (payload: HistoriaMedicaProps) => {
    //     try {
    //         if (modo === "agregar") {
    //             // payload no debe tener idHistoriaMedica
    //             await guardarHistoria({
    //                 pacienteId: payload.pacienteId,
    //                 alergias: payload.alergias,
    //                 tipoSangre: payload.tipoSangre,
    //                 enfermedadesCronicas: payload.enfermedadesCronicas,
    //                 antecedentesFamiliares: payload.antecedentesFamiliares,
    //             });
    //         } else {
    //             const id = payload.idHistoriaMedica;
    //             if (!id) throw new Error("ID de historia médica faltante para actualizar.");
    //             await actualizarHistoria(id, {
    //                 pacienteId: payload.pacienteId,
    //                 alergias: payload.alergias,
    //                 tipoSangre: payload.tipoSangre,
    //                 enfermedadesCronicas: payload.enfermedadesCronicas,
    //                 antecedentesFamiliares: payload.antecedentesFamiliares,
    //             });
    //         }
    //         setIsModalOpen(false);
    //         setHistoriaSeleccionada(null);
    //         // SWR mutate ya se encarga de refrescar lista y paciente
    //     } catch (err) {
    //         // los errores específicos se exponen por errorGuardar/errorActualizar,
    //         // aquí mostramos una alerta simple; puedes reemplazar por un toast.
    //         const message =
    //             err instanceof Error ? err.message : "Ocurrió un error al guardar/actualizar.";
    //         alert(message);
    //     }
    // };

    return (
        <div className="flex flex-col gap-y-7">

            <ProfileCard
                title="Historia Médica"
                Nombre={NombrePaciente}
                Apellido={ApellidoPaciente}
                data={historiaFiltrada ?? {}}
                isLoading={loadingHistoriaPaciente}
                isError={errorHistoriaPaciente ? errorHistoriaPaciente : (historiaPaciente === null ? "El paciente no tiene historia médica registrada" : null)}
            />


            {/* Botones */}
            <div className="flex flex-wrap gap-3">
                <button
                    onClick={handleAgregar}
                    className="bg-blue-600 p-2 text-white rounded-lg text-sm cursor-pointer"
                    type="button"
                >
                    Agregar Historia Médica
                </button>

                <button
                    onClick={handleEditar}
                    disabled={!historiaPaciente}
                    type="button"
                    className={`p-2 text-white rounded-lg text-sm cursor-pointer ${historiaPaciente ? "bg-green-500" : "bg-gray-400 cursor-not-allowed"
                        }`}
                >
                    Editar Historia Médica
                </button>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <ModalCustom
                    isOpen={isModalOpen}
                    onClose={() => {
                        setIsModalOpen(false);
                        setHistoriaSeleccionada(null);
                    }}
                    title={`${modo === "agregar" ? "Agregar" : "Editar"} Historia Médica`}
                >
                    <FormModalHistoriaMedica
                        onSubmit={handleSubmit}
                        initialData={historiaSeleccionada ?? undefined}
                        mode={modo}
                        pacienteId={Idpaciente}
                    // opcional: pasar estados de loading/error para deshabilitar botones en el formulario
                    // loading={modo === 'agregar' ? loadingGuardar : loadingActualizar}
                    // error={modo === 'agregar' ? errorGuardar : errorActualizar}
                    />
                </ModalCustom>
            )}
        </div>
    );
};
