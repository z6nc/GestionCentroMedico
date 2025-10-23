import { useState } from "react";
import { TablaCustom } from "../../common/Tablas/tabla";
import { ModalCustom } from "../../common/Modal/modalCustom";
import { FormModalAnalisis } from "./formAnalisis";
import type { AnalisisProps } from "../../../schema/analisis.schema";

interface VistaCRUDProps {
  titulo: string;
  data: AnalisisProps[];
  onEdit: (actualizado: AnalisisProps) => void; // callback al editar
}

export function VistaCRUDAnalisis({
  titulo,
  data,
  onEdit,
}: VistaCRUDProps) {
  const [editItem, setEditItem] = useState<Partial<AnalisisProps> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Cuando se hace clic en el ícono de editar
  const handleEditClick = (item: AnalisisProps) => {
    setEditItem(item);
    setIsModalOpen(true);
  };

  // Cuando se envía el formulario dentro del modal
  const handleSubmit = (data: AnalisisProps) => {
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
          <FormModalAnalisis
            onSubmit={handleSubmit}
            initialData={editItem}
            mode="editar"
          />
        </ModalCustom>
      )}
    </div>
  );
}
