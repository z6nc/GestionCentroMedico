// hooks/usePacientes.ts
import useSWR, { mutate } from "swr";
// import type  { Paciente } from "../schema/paciente.schema";

export interface HorarioMedico {
  numero: number;
  medicoId: number;
  fecha: string;
  horaInicio: string;
  horaFin: string;
  disponible: string;
  consultorio: string;
}

const fetcher = (url: string) => fetch(url).then(res => res.json());

export function useHorarioMedico() {
  const { data, error } = useSWR<HorarioMedico[]>("http://localhost:8085/horariomedico/listar", fetcher);

  const EliminarHorario = async (numero: number , medicoId: string) => {
    try {
      const response = await fetch(
        `http://localhost:8085/horariomedico/eliminar/${numero}`,
        { method: "DELETE" }
      );

      if (!response.ok) {
        throw new Error(`Error al eliminar: ${response.status}`);
      }

      // Refresca la caché específica de SWR
       await mutate(
                `http://localhost:8185/disponibilidad/disponibles?medicoId=${medicoId}`
            );

    } catch (error) {
      console.error("Error en EliminarHorario:", error);
      throw error;
    }
  };

  return {
    horarios: data,
    error,
    mutate,
    EliminarHorario,
  };
}

export function useHorariosPorMedico(medicoId: string | null) {
  const { data, error, isLoading } = useSWR<HorarioMedico[]>(
    medicoId
      ? `http://localhost:8185/disponibilidad/disponibles?medicoId=${medicoId}`
      : null, // No hace fetch si medicoId es null
    fetcher
  );

  return {
    horariosFiltrados: data || [],
    isLoading,
    error
  };
}






