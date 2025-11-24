// hooks/usePacientes.ts
import useSWR from "swr";
import type  { Paciente } from "../schema/paciente.schema";

const fetcher = (url: string) => fetch(url).then(res => res.json());

export function usePacientes() {
  const { data, error, mutate } = useSWR<Paciente[]>("http://localhost:8092/paciente/listar", fetcher);
  return {
    pacientes: data,
    error,
    mutate, // permite actualizar la data localmente o volver a fetch
  };
}

export function usePacientePorID(id: string) {
  const { data, error, mutate } = useSWR<Paciente>(`http://localhost:8092/paciente/buscar/${id}`, fetcher);
  return {
    paciente: data,
    error,
    mutate, // permite actualizar la data localmente o volver a fetch
  };
}