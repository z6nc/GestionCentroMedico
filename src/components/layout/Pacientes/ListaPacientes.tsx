import { TablaCustom } from "../../common/Tablas/tabla"
import { Input } from "../../common/input"
import { Search } from "lucide-react"
export const ListaPacientes = () => {
    return (
        <section className="max-w-max mx-auto  my-9 flex flex-col gap-y-9 items-start">
            <div className="flex  justify-between w-full">
                <button className="bg-blue-600 p-2 text-white rounded-lg">
                    Añadir Paciente
                </button>
                <div className="relative">
                    <Input id="buscar" type="text" placeholder="Buscar Paciente" estilo="bg-white" >
                        <Search className="  text-gray-400" />
                    </Input>

                </div>
            </div>

            <TablaCustom />
        </section>
    )
}