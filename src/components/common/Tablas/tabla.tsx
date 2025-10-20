import { Pencil } from "lucide-react"

export type TablaCustomProps<T> = {
    datas: T[];
};

export const TablaCustom = <T extends Record<string, unknown>>({ datas }: TablaCustomProps<T>) => {

    if (!datas || datas.length === 0) {
        return <p className="text-center p-4">No hay datos para mostrar</p>;
    }
    const keys = Object.keys(datas[0]) as (keyof T)[];
    
    return (
        <div className="relative overflow-x-auto shadow-md rounded-lg max-w-max mx-auto  ">
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

                <tbody className="text-center">
                    {datas.map((item, index) => (
                        <tr
                            key={index}
                            className="bg-white border-b border-gray-200 hover:bg-green-400/5"
                        >
                            {keys.map((key) => (
                                <td
                                    key={String(key)}
                                    className="px-6 py-4  text-gray-900 whitespace-nowrap"
                                >
                                    {String(item[key] ?? '')}
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