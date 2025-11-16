// hooks/usePacientes.ts
import useSWR,{mutate} from "swr";
// import type  { Paciente } from "../schema/paciente.schema";

export interface HorarioMedico {
  numero: number;
  medicoId: string;
  fecha: Date;
  horaInicio: string;
  horaFin: string;
  disponible: boolean;
  consultorio: string;
}

const fetcher = (url: string) => fetch(url).then(res => res.json());

export function useHorarioMedico() {
  const { data, error } = useSWR<HorarioMedico[]>("http://localhost:8085/horariomedico/listar", fetcher);

  const EliminarHorario = async (numero: number) => {
    try {
      const response = await fetch(
        `http://localhost:8085/horariomedico/eliminar/${numero}`,
        { method: "DELETE" }
      );

      if (!response.ok) {
        throw new Error(`Error al eliminar: ${response.status}`);
      }

      // Refresca la caché específica de SWR
      await mutate("http://localhost:8085/horariomedico/listar"); // o la URL que uses para listar

    } catch (error) {
      console.error("Error en EliminarHorario:", error);
      throw error;
    }
  };

  return {
    horarios: data,
    error,
    mutate,
    EliminarHorario
  };
}








