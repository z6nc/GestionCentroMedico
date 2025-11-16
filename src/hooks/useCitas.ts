// hooks/usePacientes.ts
import useSWR, { mutate } from "swr";
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

export function useCitas() {
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

// export function useCitasPorEspecialidad(especialidad: string | null) {
//   const { data, error, isLoading } = useSWR<HorarioMedico[]>(
//     especialidad
//       ? `http://localhost:8189/solicitudcita/horariosdisponibles?especialidad=${especialidad}`
//       : null, // No hace fetch si especialidad es null
//     fetcher
//     mutate(`http://localhost:8189/solicitudcita/horariosdisponibles?especialidad=${especialidad}`)
//   );
//   return {
//     horariosFiltradosEspecialidad: data || [],
//     isLoading,
//     error
//   };
// }






