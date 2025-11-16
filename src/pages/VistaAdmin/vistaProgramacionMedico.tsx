import { useParams } from "react-router-dom";
import { useState } from "react";
import { FormHorario } from "../../components/layout/Medicos/DetalleProgramacionMedico/formHorario";
import { useMedicosPorEspecialidad } from "../../hooks/useMedicos";
import { useCarritoHorario } from "../../hooks/useCarritoMedico";
import { CalendarioHorarios } from "../../components/layout/Medicos/DetalleProgramacionMedico/calendario";
import { CarritoHorarios } from "../../components/layout/Medicos/DetalleProgramacionMedico/carritoHorario";
import { TituloCustom } from "../../components/common/titulos/tituloCustom";
import { DataTable } from "../../components/common/Tablas/tabla"
import { columnasHorarioMedico } from "../../components/layout/Medicos/DetalleProgramacionMedico/columnaProgramacionMedica";
import type { CarritoHorario } from "../../hooks/useCarritoMedico";
import { useHorarioMedico, useHorariosPorMedico } from "../../hooks/useHorarioMedico";

export function VistaProgramacionMedica() {
    const { medicoId } = useParams();
    const { medicos } = useMedicosPorEspecialidad();
    const { ListaCarritoHorarios, agregarHorario, quitarHorario, ActualizarHorarios } = useCarritoHorario();
    const { horariosFiltrados, isLoading, error } = useHorariosPorMedico(medicoId || "");
    const { EliminarHorario } = useHorarioMedico();

    const handleAddHorario = (horario: Omit<CarritoHorario, "medicoId" | "id" | "numero">) => {
        agregarHorario({ ...horario, medicoId: Number(medicoId) }); // agrega el ID del médico automáticamente
    };

    const medico = medicos?.find((m) => m.numero === Number(medicoId));
    const HorarioDemedico = ListaCarritoHorarios.filter((h) => h.medicoId === Number(medicoId));
    const [isOpenVerHorarios, setIsOpenVerHorarios] = useState("tabla");
    const handleActualizar = async () => {
        // ✅ Pasa el medicoId para que sepa qué caché invalidar
        await ActualizarHorarios(medicoId || "");
    };

    const renderContenidoHorarios = () => {
        if (isLoading) {
            return (
                <div className="flex items-center justify-center h-64">
                    <p className="text-gray-500">Cargando horarios...</p>
                </div>
            );
        }

        if (error) {
            return (
                <div className="flex items-center justify-center h-64">
                    <p className="text-red-500">Error al cargar horarios</p>
                </div>
            );
        }

        return (
            <>
                {isOpenVerHorarios === "tabla" && (
                    <DataTable
                        columns={columnasHorarioMedico(EliminarHorario)}
                        data={horariosFiltrados || []}
                    />
                )}
                {isOpenVerHorarios === "calendario" && (
                    <CalendarioHorarios horarios={horariosFiltrados || []} />
                )}
            </>
        );
    };

    return (
        <section className=" flex  flex-col gap-y-9">
            <TituloCustom titulo={`Programación médica para: ${medico?.nombre} ${medico?.apellido}`} />


            <div className="flex gap-x-5  px-8 py-4">
                <FormHorario medicoId={Number(medicoId)} onAdd={handleAddHorario} />
                <CarritoHorarios HorarioDemedico={HorarioDemedico} eliminarHorario={quitarHorario} actualizarHorarios={handleActualizar} />
            </div>

            <div className="mx-8 py-4 px-4 rounded-lg bg-white shadow-md">
                <div className="inline-flex gap-4 mb-4   p-4 rounded-md  text-sm  ">
                    <button onClick={() => setIsOpenVerHorarios("tabla")} className="bg-blue-500 py-2 px-4 text-white rounded-lg cursor-pointer">Ver Tabla </button>
                    <button onClick={() => setIsOpenVerHorarios("calendario")} className="bg-amber-600 py-2 px-4 text-white rounded-lg cursor-pointer">Ver Calendario </button>
                </div>

                {renderContenidoHorarios()}

            </div>

        </section>
    );
}
