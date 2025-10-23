import { ModalCustom } from "../../common/Modal/modalCustom"
import { FormModalMedicamento } from "./formMedicamentos"
import { useState } from "react"
export const AgregarMedicamentos = ({ titulo }: { titulo: string }) => {
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
                <FormModalMedicamento onSubmit={() => alert("Registrado")} mode="agregar"  />

            </ModalCustom>
        </div>
    )
}
