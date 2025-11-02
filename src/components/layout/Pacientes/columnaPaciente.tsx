import type { Paciente } from "../../../schema/paciente.schema";
import type { Column } from "../../common/Tablas/tabla";
import { Link } from "react-router-dom";
import { FileBadge, UserPen } from "lucide-react";

export const columnasPacientes = (handleEditar: (p: Paciente) => void): Column<Paciente>[] => [
    {header : "Número", accessor: "numero" },
    { header: "DNI", accessor: "dni" },
    { header: "Nombre", accessor: "nombre" },
    { header: "Apellido", accessor: "apellido" },
    // { header: "Género", accessor: "Genero" },
    { header: "Fecha de Nacimiento", accessor: "fechaNacimiento" },
    // { header: "Edad", accessor: "Edad" },
    { header: "Teléfono", accessor: "telefono" },
    { header: "Dirección", accessor: "direccion" },
    { header: "Email", accessor: "email" },
    { header: "Estado", accessor: "estado"},
    //{ header: "Tipo de Sangre", accessor: "TipodeSangre" },
    //{ header: "Peso", accessor: "PesoPaciente" },
    //{ header: "Altura", accessor: "AlturaPaciente" },
    {
        header: "Acciones",
        cell: (row: Paciente) => (
            <div className="flex flex-wrap gap-2">
              
                <Link to={`/dashboard/historia-medica/${row.numero}`}>
                    <button className="ml-2 px-3 py-1 bg-blue-400 border text-white rounded-full cursor-pointer inline-flex items-center">
                         <FileBadge />
                    </button>
                </Link>
                <button
                    onClick={() => handleEditar(row)}
                    className="ml-2 px-3 py-1 bg-orange-400 border text-white rounded-full cursor-pointer"
                >
                    <UserPen />
                </button>
            </div>

        ),
    },
];
