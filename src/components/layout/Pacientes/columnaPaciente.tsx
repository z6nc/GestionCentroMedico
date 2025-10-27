import type { Paciente } from "../../../schema/paciente.schema";
import type { Column } from "../../common/Tablas/tabla";
import { Link } from "react-router-dom";

export const columnasPacientes = (handleEditar: (p: Paciente) => void): Column<Paciente>[] => [
    { header: "DNI", accessor: "DniPaciente" },
    { header: "Nombre", accessor: "Nombre" },
    { header: "Apellido", accessor: "Apellido" },
    { header: "Género", accessor: "Genero" },
    { header: "Fecha de Nacimiento", accessor: "FechaNacimiento" },
    { header: "Edad", accessor: "Edad" },
    { header: "Teléfono", accessor: "Telefono" },
    { header: "Dirección", accessor: "Direccion" },
    { header: "Email", accessor: "Email" },
    { header: "Tipo de Sangre", accessor: "TipodeSangre" },
    { header: "Peso", accessor: "PesoPaciente" },
    { header: "Altura", accessor: "AlturaPaciente" },
    {
        header: "Acciones",
        cell: (row: Paciente) => (
            <div className="flex flex-wrap gap-2">
              
                <Link to={`/dashboard/historia-medica/${row.DniPaciente}`}>
                    <button className="ml-2 px-3 py-1 text-blue-600 border border-blue-500 rounded-md hover:bg-blue-50 cursor-pointer">
                        Historial
                    </button>
                </Link>
                <button
                    onClick={() => handleEditar(row)}
                    className="ml-2 px-3 py-1 text-green-600 border border-green-500 rounded-md hover:bg-green-50 cursor-pointer"
                >
                    Editar
                </button>
            </div>

        ),
    },
];
