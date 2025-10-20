import { useState } from "react";
import { TablaCustom } from "./tabla";
import { ModalCustom } from "../Modal/modalCustom";
import { FormModalPaciente } from "../Modal/formModal";
import type { Paciente } from "../../../schema/paciente.schema";

interface VistaCRUDProps {
  titulo: string;
  data: Paciente[];
  onEdit: (actualizado: Paciente) => void; // callback al editar
}

export function VistaCRUD({
  titulo,
  data,
  onEdit,
}: VistaCRUDProps) {
  const [editItem, setEditItem] = useState<Partial<Paciente> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Cuando se hace clic en el ícono de editar
  const handleEditClick = (item: Paciente) => {
    setEditItem(item);
    setIsModalOpen(true);
  };

  // Cuando se envía el formulario dentro del modal
  const handleSubmit = (data: Paciente) => {
    onEdit(data); // llama al callback pasado desde el padre
    setEditItem(null);
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Tabla con botón editar */}
      <TablaCustom datas={data} onEdit={handleEditClick} />

      {/* Modal de edición */}
      {editItem && (
        <ModalCustom
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={`Editar ${titulo}`}
        >
          <FormModalPaciente
            onSubmit={handleSubmit}
            initialData={editItem}
            mode="editar"
          />
        </ModalCustom>
      )}
    </div>
  );
}
