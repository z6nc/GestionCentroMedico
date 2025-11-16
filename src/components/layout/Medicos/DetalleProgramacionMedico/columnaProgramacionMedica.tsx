// import type { CarritoHorario } from "../../../../hooks/useCarritoMedico";
// import { ItemFormsIcon } from "../../../data/itemFormsIcon";
import type { Column } from "../../../common/Tablas/tabla";
import type { HorarioMedico } from "../../../../hooks/useHorarioMedico";
import { Trash } from "lucide-react";
 


export const columnasHorarioMedico = (EliminarHorario: (numero: number) => void): Column<HorarioMedico>[] => [
    { header: "ID", accessor: "medicoId" },
    { header: "Fecha", accessor: "fecha" },
    { header: "Hora de inicio", accessor: "horaInicio" },
    { header: "Hora de fin", accessor: "horaFin" },
    { header: "Consultorio", accessor: "consultorio" },
    { header: "Disponibilidad", accessor: "disponible" },
    {
        header: "Acciones",
        cell: (row: HorarioMedico) => (
            <div className="flex flex-wrap gap-2">

                <button
                    onClick={() => EliminarHorario(row.numero!)}
                    className="ml-2 px-3 py-1 text-red-400 border border-red-500 rounded-md hover:bg-green-50 cursor-pointer"
                >
                    <Trash />
                </button>

            </div>

        ),
    },
];
