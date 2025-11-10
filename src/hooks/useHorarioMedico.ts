// hooks/usePacientes.ts
import useSWR from "swr";
// import type  { Paciente } from "../schema/paciente.schema";

interface HorarioMedico {
    numero: number;
    medicoId: string;
    fecha: Date;
    horaInicio: string;
    horaFin: string;
    disponibilidad: boolean;
    consultorio: string;
}   

const fetcher = (url: string) => fetch(url).then(res => res.json());

export function useHorarioMedico() {
  const { data, error, mutate } = useSWR<HorarioMedico[]>("http://localhost:8085/horariomedico/listar", fetcher);
  return {
    horarios: data,
    error,
    mutate, // permite actualizar la data localmente o volver a fetch
  };
}








