import useSWR from "swr";
import type { MedicoProps } from "../schema/medicos.schema";

const fetcher = (url: string) => fetch(url).then(res => {
  if (!res.ok) throw new Error('Error en la petición');
  return res.json();
});

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


interface Horario {
  numero: number;
  fecha: string;
  horaInicio: string;
  horaFin: string;
  medicoId: number;
  consultorio: string;
  disponible: string;
}

export interface MedicoConHorarios {
  numero: number;
  nombre: string;
  apellido: string;
  especialidad: string;
  dni: string | null;
  telefono: string | null;
  email: string;
  horarios: Horario[];
}
export function useDisponiblidadHorarioMedicoEspecialidad(especialidad: string) {
  const { data, error, isLoading, mutate } = useSWR<MedicoConHorarios[]>(
    especialidad ? `http://localhost:8189/solicitudcita/horariosdisponibles?especialidad=${especialidad}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return { 
    disponibilidades: data, 
    error,
    isLoading,
    mutate
  };
}