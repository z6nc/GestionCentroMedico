import useSWR from "swr";
import type { MedicoProps } from "../schema/medicos.schema";

const fetcher = (url: string) => fetch(url).then(res => res.json());


export function useMedicosPorEspecialidad(especialidad?: string) {
  const url = especialidad
    ? `http://localhost:8091/medico/porEspecialidad?especialidad=${especialidad}`
    : "http://localhost:8091/medico/listar";

  const { data, error, mutate } = useSWR<MedicoProps[]>(url, fetcher /* no suspense */);

  const eliminarMedico = async (id: number) => {
    try {
      await fetch(`http://localhost:8091/medico/eliminar/${id}`, { method: "DELETE" });
      mutate(); // refresca automáticamente la data
    } catch (err) {
      console.error("Error eliminando el médico:", err);
    }
  };
  return { medicos: data, error, mutate, eliminarMedico };

}
