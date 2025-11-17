import type { Column } from "../../common/Tablas/tabla";
import { Trash2} from "lucide-react";
import type { PropsCitaConfirmada } from "../../../hooks/useCitas";


export const columnasListaCitas = (handleEliminar: (p: number) => void): Column<PropsCitaConfirmada>[] => [
    
    {header : "NumeroCita", accessor: "numero" },
    { header: "Paciente", accessor: "pacienteId" },
    { header: "Horario", accessor: "horarioId" },
    { header: "Doctor", accessor: "idDoctor" },
    { header: "Fecha de Cita", accessor: "fecha" },
    { header: "Motivo", accessor: "motivo" },
    { header: "Tipo Cita", accessor: "tipoCita" },
    { header: "Costo", accessor: "costo" },
    { header: "Estado", accessor: "estado"},
    {
        header: "Acciones",
            cell: (row: PropsCitaConfirmada) => (
            <div className="flex flex-wrap gap-2">
                <button
                    onClick={() => handleEliminar(row.numero)}
                    className="ml-2 px-3 py-1 bg-orange-400 border text-white rounded-full cursor-pointer"
                >
                    <Trash2 />
                </button>
            </div>

        ),
    },
    
];
