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
import { ModalCustom } from "../../components/common/Modal/modalCustom";
import type { CarritoHorario } from "../../hooks/useCarritoMedico";
import { useHorarioMedico } from "../../hooks/useHorarioMedico";

export function VistaProgramacionMedica() {
    const [CalendarioOpen, setCalendarioOpen] = useState(false);
    const { ListaCarritoHorarios, agregarHorario, quitarHorario ,ActualizarHorarios} = useCarritoHorario();
    const {horarios ,EliminarHorario} = useHorarioMedico();
    const { medicos } = useMedicosPorEspecialidad();
    const { medicoId } = useParams();
    const handleAddHorario = (horario: Omit<CarritoHorario, "medicoId" | "id" | "numero">) => {
        agregarHorario({ ...horario, medicoId: Number(medicoId) }); // agrega el ID del médico automáticamente
    };

    const medico = medicos?.find((m) => m.numero === Number(medicoId));
    const HorarioDemedico = ListaCarritoHorarios.filter((h) => h.medicoId === Number(medicoId));

    return (
        <section className=" flex  flex-col gap-y-9">
            <TituloCustom titulo={`Programación médica para: ${medico?.nombre} ${medico?.apellido}`} />


            <div className="flex gap-x-5  px-8 py-4">
                <FormHorario medicoId={Number(medicoId)} onAdd={handleAddHorario} />
                <CarritoHorarios HorarioDemedico={HorarioDemedico} eliminarHorario={quitarHorario} actualizarHorarios={ActualizarHorarios} />
            </div>
            
            <div className="px-8 py-4">
                <button onClick={() => setCalendarioOpen(true)} className="btn">Ver Calendario de Horarios</button>
                <DataTable columns={columnasHorarioMedico(EliminarHorario)} data={horarios || []} />
            </div>
                
            <ModalCustom isOpen={CalendarioOpen} onClose={() => setCalendarioOpen(false)} title="Calendario de Horarios">
             <CalendarioHorarios horarios={horarios || []} />
            </ModalCustom>



        </section>
    );
}
