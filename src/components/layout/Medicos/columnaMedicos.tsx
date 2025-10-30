import type { MedicoProps } from "../../../schema/medicos.schema";
// import { ItemFormsIcon } from "../../../data/itemFormsIcon";
import type { Column } from "../../common/Tablas/tabla";
import { Link } from "react-router-dom";
import { UserPen } from "lucide-react";

export const columnasMedicos = (handleEditar: (p: MedicoProps) => void): Column<MedicoProps>[] => [
    { header: "ID", accessor: "numero" },
    { header: "Nombre", accessor: "nombre" },
    { header: "Apellido", accessor: "apellido" },
    { header: "Especialidad", accessor: "especialidad" },
    { header: "Estado", accessor: "estado" },


    {
        header: "Acciones",
        cell: (row: MedicoProps) => (
            <div className="flex flex-wrap gap-2">

                <Link to={`/dashboard/historia-medica/${row.numero}`}>
                    <button className="ml-2 px-3 py-1 text-blue-400 border border-blue-500 rounded-md hover:bg-blue-50 cursor-pointer inline-flex items-center">
                        HistoriaMedico
                    </button>
                </Link>
                <button
                    onClick={() => handleEditar(row)}
                    className="ml-2 px-3 py-1 text-orange-400 border border-orange-500 rounded-md hover:bg-green-50 cursor-pointer"
                >
                    <UserPen />
                </button>
                <Link to={`/dashboard/programacion-medica/${row.numero}`}>
                    <button className="ml-2 px-3 py-1 text-green-500 border border-green-500 rounded-md hover:bg-green-50">
                        🗓 Programación Médica
                    </button>
                </Link>
            </div>

        ),
    },
];
