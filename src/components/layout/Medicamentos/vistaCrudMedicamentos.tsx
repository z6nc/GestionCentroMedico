import { useState } from "react";
import { TablaCustom } from "../../common/Tablas/tabla";
import { ModalCustom } from "../../common/Modal/modalCustom";
import { FormModalMedicamento } from "./formMedicamentos";
import type { Medicamento } from "../../../schema/medicamentos.schema";

interface VistaCRUDMedicamentosProps {
    titulo: string;
    data: Medicamento[];
    onEdit: (actualizado: Medicamento) => void; // callback al editar
}

export function VistaCRUDMedicamentos({
    titulo,
    data,
    onEdit,
}: VistaCRUDMedicamentosProps) {
    const [editItem, setEditItem] = useState<Partial<Medicamento> | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Cuando se hace clic en el ícono de editar
    const handleEditClick = (item: Medicamento) => {
        setEditItem(item);
        setIsModalOpen(true);
    };

    // Cuando se envía el formulario dentro del modal
    const handleSubmit = (data: Medicamento) => {
        onEdit(data); // llama al callback pasado desde el padre
        setEditItem(null);
        setIsModalOpen(false);
    };

    return (
        <div className="flex flex-col gap-6 w-full">
            <TablaCustom datas={data} onEdit={handleEditClick} />

            {editItem && (
                <ModalCustom
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    title={`Editar ${titulo}`}
                >
                    <FormModalMedicamento
                        onSubmit={handleSubmit}
                        initialData={editItem}
                        mode="editar"
                    />
                </ModalCustom>
            )}
        </div>
    );
}
