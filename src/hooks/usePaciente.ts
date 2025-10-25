// hooks/usePacientes.ts
import useSWR from "swr";
import type  { Paciente } from "../schema/paciente.schema";

const fetcher = (url: string) => fetch(url).then(res => res.json());

export function usePacientes() {
  const { data, error, mutate } = useSWR<Paciente[]>("/api/pacientes", fetcher);
  return {
    pacientes: data,
    error,
    isLoading: !data && !error,
    mutate, // permite actualizar la data localmente o volver a fetch
  };
}
