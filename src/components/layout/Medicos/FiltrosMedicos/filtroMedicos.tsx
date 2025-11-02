import Select from "./FiltroSelect";
import { EspecialidadData } from "../../../../data/especialidad.data";

interface FiltrosProps {
  especialidad: string;
  setEspecialidad: (value: string) => void;
  handleAgregar: () => void;
}


export function FiltrosMedicos({ especialidad, setEspecialidad, handleAgregar }: FiltrosProps) {
  return (
    <div className="flex gap-7 flex-col w-full bg-white p-4  shadow-sm rounded-lg">
      <button
        onClick={handleAgregar}
        className="bg-sky-500 p-2 text-white rounded-lg text-sm cursor-pointer mr-auto"
      >
        Agregar Médico
      </button>


      <Select
        options={EspecialidadData.map((esp) => ({ value: esp, label: esp }))}
        value={especialidad}
        onChange={(value) => setEspecialidad(value)}
        placeholder="Filtrar por especialidad"
      />
    </div>
  );
}
