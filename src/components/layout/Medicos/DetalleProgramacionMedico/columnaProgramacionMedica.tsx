import type { CarritoHorario } from "../../../../hooks/useCarritoMedico";
// import { ItemFormsIcon } from "../../../data/itemFormsIcon";
import type { Column } from "../../../common/Tablas/tabla";

export const columnasCarritoHorarios = (): Column<CarritoHorario>[] => [
    { header: "ID", accessor: "medicoId" },
    { header: "Fecha", accessor: "fecha" },
    { header: "Hora de inicio", accessor: "horaInicio" },
    { header: "Hora de fin", accessor: "horaFin" },
    { header: "Consultorio", accessor: "consultorio" },


    // {
    //     header: "Acciones",
    //     cell: (row: CarritoHorario) => (
    //         <div className="flex flex-wrap gap-2">

    //             <button
    //                 onClick={() => quitarHorario(row.id!)}
    //                 className="ml-2 px-3 py-1 text-red-400 border border-red-500 rounded-md hover:bg-green-50 cursor-pointer"
    //             >
    //                 <Trash />
    //             </button>

    //         </div>

    //     ),
    // },
];
