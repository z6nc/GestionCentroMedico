import { ModalCustom } from "../../common/Modal/modalCustom"
import { FormModalAnalisis } from "./formAnalisis"
import { useState } from "react"
export const AgregarAnalisis = ({ titulo }: { titulo: string }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <div className="flex justify-between w-full">
            <button
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-600 p-2 text-white rounded-lg text-sm"
            >
                Añadir {titulo}
            </button>

            <ModalCustom
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={`Añadir nuevo ${titulo}`}
            >
                <FormModalAnalisis onSubmit={() => alert("Registrado")} mode="agregar"  />

            </ModalCustom>
        </div>
    )
}

           
