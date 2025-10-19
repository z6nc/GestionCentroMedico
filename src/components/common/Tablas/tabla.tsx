import { Pencil } from "lucide-react"
const PersonaData = [
    {
        DniPaciente: "12345678",
        Nombre: "Juan",
        Apellido: "Perez",
        FechaNacimiento: "01/01/1990",
        Genero: "Masculino",
        Telefono: "987654321",
        Direccion: "Av. Siempre Viva 123",
        Email: "juan.perez@example.com"
    },
    {
        DniPaciente: "12345678",
        Nombre: "Juan",
        Apellido: "Perez",
        FechaNacimiento: "01/01/1990",
        Genero: "Masculino",
        Telefono: "987654321",
        Direccion: "Av. Siempre Viva 123",
        Email: "juan.perez@example.com"
    },
    {
        DniPaciente: "12345678",
        Nombre: "Juan",
        Apellido: "Perez",
        FechaNacimiento: "01/01/1990",
        Genero: "Masculino",
        Telefono: "987654321",
        Direccion: "Av. Siempre Viva 123",
        Email: "juan.perez@example.com"
    }
]

export const TablaCustom = () => {
    const keys = Object.keys(PersonaData[0]);
    return (
        <div className="relative overflow-x-auto shadow-md rounded-lg max-w-max mx-auto  ">
            <table className="w-full text-sm   ">
                <thead className="text-xs text-gray-700 uppercase bg-green-400">
                    <tr>
                        {keys.map((key) => (
                            <th key={key} scope="col" className="px-9 py-5">
                                {key}
                            </th>
                        ))}
                        <th colSpan={keys.length} className="px-9 py-5 text-right">
                            <a href="">editar</a>
                        </th>
                    </tr>

                </thead>

                <tbody className="text-center">
                    {PersonaData.map((persona, index) => (
                        <tr
                            key={index}
                            className="bg-white border-b border-gray-200 hover:bg-green-500/5"
                        >
                            {keys.map((key) => (
                                <td
                                    key={key}
                                    className="px-6 py-4  text-gray-900 whitespace-nowrap"
                                >
                                    {persona[key as keyof typeof persona]}
                                </td>
                            ))}

                            <td className="px-9 py-4 text-center ">
                                <a
                                    href="#"
                                    className=" "
                                >
                                    <div className="bg-orange-200 flex flex-col items-center py-2 rounded-lg ">
                                        <Pencil className=" size-5  rounded-lg text-black" />
                                    </div>
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>
        </div>


    )
}