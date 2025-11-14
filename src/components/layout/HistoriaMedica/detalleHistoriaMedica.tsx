import { ProfileCard } from "../../common/historia/ProfileCard";
import { ModalCustom } from "../../common/Modal/modalCustom";
import { FormModalHistoriaMedica } from "./formHistoriaMedica";
import { useState } from "react";
import { toast } from "react-toastify";
import { useHistoriaPorPaciente } from "../../../hooks/useHistoriaMedica";
import type { HistoriaMedicaProps } from "../../../schema/historiaMedica.schema";
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

    // 🔹 Obtener historia del paciente desde SWR
    const { historiaPaciente, loading, error, actualizarHistoria, guardarHistoria } = useHistoriaPorPaciente(Idpaciente);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modo, setModo] = useState<"agregar" | "editar">("agregar");

    // 🔹 Datos para la tarjeta
    const historiaFiltrada = {
        alergias: historiaPaciente?.alergias ?? "No registrado",
        tipoSangre: historiaPaciente?.tipoSangre ?? "No registrado",
        enfermedadesCronicas: historiaPaciente?.enfermedadesCronicas ?? "No registrado",
        antecedentesFamiliares: historiaPaciente?.antecedentesFamiliares ?? "No registrado",
    };

    // Abrir modal en modo agregar
    const handleAgregar = () => {
        setModo("agregar");
        setIsModalOpen(true);
    };

    // Abrir modal en modo editar
    const handleEditar = () => {
        if (!historiaPaciente) return;
        setModo("editar");
        setIsModalOpen(true);
    };
    // 🔹 Submit tanto para agregar como actualizar
    const onSubmit = async (data: Omit<HistoriaMedicaProps, "mensaje">) => {
           const paylod = {
            pacienteId: Idpaciente,
            tipoSangre: data.tipoSangre || "No registrado",
            alergias: data.alergias || "No registrado",
            enfermedadesCronicas: data.enfermedadesCronicas || "No registrado",
            antecedentesFamiliares: data.antecedentesFamiliares || "No registrado",
            fechaCreacion : data.fechaCreacion || new Date().toISOString(),
           };
        try {

            if (modo === "editar" && historiaPaciente?.idHistoriaMedica) {
                await actualizarHistoria(historiaPaciente.idHistoriaMedica, data);
                toast.success("Historia médica actualizada correctamente");
            } else {
                await guardarHistoria(paylod);
                toast.success("Historia médica creada correctamente");
            }

            setIsModalOpen(false);

        } catch (err) {
            console.error("Error guardando historia médica:", err);
            toast.error("Error al guardar la historia médica");
        }
    };

    return (
        <div className="flex flex-col gap-y-7">

            <ProfileCard
                title="Historia Médica"
                Nombre={NombrePaciente}
                Apellido={ApellidoPaciente}
                data={historiaFiltrada}
                isLoading={loading}
                isError={error}
            />

            <div className="flex flex-wrap gap-3 items-center justify-center">
                {!historiaPaciente && (
                    <button
                        onClick={handleAgregar}
                        type="button"
                        className="p-2 bg-blue-600 text-white rounded-lg text-sm cursor-pointer"
                    >
                        Agregar Historia Médica
                    </button>
                )}

                {historiaPaciente && (
                    <button
                        onClick={handleEditar}
                        type="button"
                        className="p-2 bg-green-500 text-white rounded-lg text-sm cursor-pointer"
                    >
                        Editar Historia Médica
                    </button>
                )}
            </div>

            {isModalOpen && (
                <ModalCustom
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    title={`${modo === "agregar" ? "Agregar" : "Editar"} Historia Médica`}
                >
                    <FormModalHistoriaMedica
                        onSubmitt={onSubmit}
                        initialData={modo === "editar" ? historiaPaciente! : undefined}
                        mode={modo}
                        loading={loading}
                        error={error}
                    />
                </ModalCustom>
            )}
        </div>
    );
};
