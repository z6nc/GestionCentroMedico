import useSWR from "swr";
import type { MedicoProps } from "../schema/medicos.schema";

const fetcher = (url: string) => fetch(url).then(res => res.json());

export function useMedicosPorEspecialidad(especialidad?: string) {
  const url = especialidad
    ? `http://localhost:8091/medico/porEspecialidad?especialidad=${especialidad}`
    : "http://localhost:8091/medico/listar";

  const { data, error, mutate } = useSWR<MedicoProps[]>(url, fetcher , { suspense: true });

  return {
    medicos: data,
    error,
    mutate,
  };
}
