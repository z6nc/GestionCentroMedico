import type { Paciente } from "../../../schema/paciente.schema";
import type { Column } from "../../common/Tablas/tabla";

export const columnasPacientes = (handleEditar: (p: Paciente) => void): Column<Paciente>[] =>[
    { header: "DNI", accessor: "DniPaciente" },
    { header: "Nombre", accessor: "Nombre" },
    { header: "Apellido", accessor: "Apellido" },
    { header: "Género", accessor: "Genero" },
    { header: "Fecha de Nacimiento", accessor: "FechaNacimiento" },
    { header: "Teléfono", accessor: "Telefono" },
    { header: "Dirección", accessor: "Direccion" },
    {
        header: "Acciones",
        cell: (row: Paciente) => (
            <div>
                <button
                    onClick={() => alert(`Ver historial de ${row.Nombre} ${row.Apellido}`)}
                    className="px-3 py-1 text-blue-600 border border-blue-500 rounded-md hover:bg-blue-50"
                >
                    Ver historial
                </button>
                <button
                    onClick={() => handleEditar(row)}
                    className="ml-2 px-3 py-1 text-green-600 border border-green-500 rounded-md hover:bg-green-50"
                >
                    Editar
                </button>
            </div>

        ),
    },
];
