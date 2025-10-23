import { Pencil } from "lucide-react"

export type TablaCustomProps<T> = {
    datas: T[];
    onEdit: (item: T) => void; 
};

export const TablaCustom = <T extends Record<string, unknown>>({ datas, onEdit }: TablaCustomProps<T>) => {
    // Obtener las claves del primer objeto para los encabezados de la tabla
    const keys = Object.keys(datas[0]) as (keyof T)[];

    // Manejo de caso cuando no hay datos
    if (!datas || datas.length === 0) {
        return <p className="text-center p-4">No hay datos para mostrar</p>;
    }

    return (
        <div className="relative shadow-md rounded-lg  overflow-x-scroll max-w-5xl  2xl:max-w-max">
            <table className="w-full text-sm   ">
                <thead className="text-xs text-gray-800  uppercase bg-green-400">
                    <tr>
                        {keys.map((key) => (
                            <th key={String(key)}
                                scope="col" className="px-9 py-5">
                                {String(key)}
                            </th>
                        ))}
                        <th colSpan={keys.length} className="px-9 py-5 text-right">
                            <a href="">editar</a>
                        </th>
                    </tr>

                </thead>

                <tbody className="text-wrap text-center">
                    {datas.map((item, index) => (
                        <tr
                            key={index}
                            className="bg-white border-b border-gray-200 hover:bg-green-400/5"
                        >
                            {keys.map((key) => (
                                <td
                                    key={String(key)}
                                    className="px-6 py-4  text-gray-900  "
                                >
                                    {String(item[key] ?? '')}
                                </td>
                            ))}

                            <td className="px-9 py-4 text-center">
                                <button
                                    type="button"
                                    onClick={() => onEdit(item)}
                                    className="bg-orange-200 hover:bg-orange-300 transition flex items-center justify-center py-2 rounded-lg w-10 mx-auto"
                                    title="Editar registro"
                                >
                                    <Pencil className="size-5 text-black" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>
        </div>


    )
}