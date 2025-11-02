import type { MedicoProps } from "../../../schema/medicos.schema";
import type { Column } from "../../common/Tablas/tabla";
import { Link } from "react-router-dom";
import { UserPen, CalendarClock, FileBadge, Trash2 } from "lucide-react";

interface ColumnasMedicosProps {
  handleEditar: (p: MedicoProps) => void;
  handleEliminar: (id: number) => void; // nueva función para eliminar
}

export const columnasMedicos = ({ handleEditar, handleEliminar }: ColumnasMedicosProps): Column<MedicoProps>[] => [
  { header: "DNI", accessor: "dni" },
  { header: "Nombre", accessor: "nombre" },
  { header: "Apellido", accessor: "apellido" },
  { header: "Especialidad", accessor: "especialidad" },
  { header: "Teléfono", accessor: "telefono" },
  { header: "Email", accessor: "email" },
  { header: "Estado", accessor: "estado" },
  {
    header: "Acciones",
    cell: (row: MedicoProps) => (
      <div className="flex flex-wrap gap-2">
        <Link to={`/dashboard/historia-medica/${row.numero}`}>
          <button className="ml-2 px-3 py-1 bg-blue-400 border text-white rounded-full cursor-pointer inline-flex items-center">
            <FileBadge />
          </button>
        </Link>

        <Link to={`/dashboard/programacion-medica/${row.numero}`}>
          <button className="ml-2 px-3 py-1 bg-green-500 border text-white rounded-full cursor-pointer">
            <CalendarClock />
          </button>
        </Link>

        <button
          onClick={() => handleEditar(row)}
          className="ml-2 px-3 py-1 bg-orange-400 border text-white rounded-full cursor-pointer"
        >
          <UserPen />
        </button>

        <button
          onClick={() => handleEliminar(row.numero!)}
          className="ml-2 px-3 py-1 bg-red-500 border text-white rounded-full cursor-pointer"
        >
          <Trash2 />
        </button>
      </div>
    ),
  },
];
