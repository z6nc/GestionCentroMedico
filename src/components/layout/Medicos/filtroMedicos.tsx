import Select from "./FiltroSelect";
import { EspecialidadData } from "../../../data/especialidad.data";

interface FiltrosProps {
  especialidad: string;
  setEspecialidad: (value: string) => void;
  handleAgregar: () => void;
}


export function FiltrosMedicos({ especialidad, setEspecialidad, handleAgregar }: FiltrosProps) {
  return (
    <div className="flex gap-2 items-center justify-between w-full  ">
      <button
        onClick={handleAgregar}
        className="bg-blue-600 p-2 text-white rounded-lg text-sm cursor-pointer"
      >
        Agregar Médico
      </button>

    
       <Select
        options={EspecialidadData.map((esp) => ({ value: esp, label: esp }))}
        value={especialidad}
        onChange={(value) => setEspecialidad(value)}
        placeholder="Selecciona..."
      />
    </div>
  );
}
