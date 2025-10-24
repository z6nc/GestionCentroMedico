import { useState } from "react";
import { TablaCustom } from "../../common/Tablas/tabla";
import { ModalCustom } from "../../common/Modal/modalCustom";
import { FormModalMedico } from "./formMedicos";
import type { MedicoProps } from "../../../schema/medicos.schema";

interface VistaCRUDMedicosProps {
    titulo: string;
    data: MedicoProps[];
    onEdit: (actualizado: MedicoProps) => void; // callback al editar
}

export function VistaCRUDMedicos({
    titulo,
    data,
    onEdit,
}: VistaCRUDMedicosProps) {
    const [editItem, setEditItem] = useState<Partial<MedicoProps> | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Cuando se hace clic en el ícono de editar
    const handleEditClick = (item: MedicoProps) => {
        setEditItem(item);
        setIsModalOpen(true);
    };

    // Cuando se envía el formulario dentro del modal
    const handleSubmit = (data: MedicoProps) => {
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
                    <FormModalMedico
                        onSubmit={handleSubmit}
                        initialData={editItem}
                        mode="editar"
                    />
                </ModalCustom>
            )}
        </div>
    );
}
