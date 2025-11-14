import useSWR, { mutate } from "swr";
import { useCallback } from "react";
import type { HistoriaMedicaProps } from "../schema/historiaMedica.schema";

const API_URL = "http://localhost:8088/historiaMedica";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (res.status === 204 || res.status === 404) return null;
  const text = await res.text();
  if (!res.ok) throw new Error(text || "Error en la solicitud");
  return text ? JSON.parse(text) : null;
};

export function useHistoriaPorPaciente(pacienteId?: number) {
  const key = pacienteId ? `${API_URL}/buscar/paciente/${pacienteId}` : null;

  const { data, error, isLoading } = useSWR<HistoriaMedicaProps | null>(key, fetcher, {
    revalidateOnFocus: false,
  });

  // Guardar historia (POST)
  const guardarHistoria = useCallback(
    async (payload: Omit<HistoriaMedicaProps, "mensaje">) => {
      const body = { ...payload, pacienteId: payload.pacienteId }; // asegúrate pacienteId presente
      const res = await fetch(`${API_URL}/guardar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const text = await res.text();
      const data = text ? JSON.parse(text) : null;

      if (!res.ok) {
        const msg = (data && data.mensaje) || (typeof text === "string" ? text : "Error al guardar historia médica");
        throw new Error(msg);
      }

      // refrescar cache del paciente y lista
      if (key) await mutate(key);
      await mutate(`${API_URL}/listar`);

      return data;
    },
    [key]
  );

  // Actualizar historia (PUT)
  const actualizarHistoria = useCallback(
    async (id: number, payload: Partial<HistoriaMedicaProps>) => {
      const res = await fetch(`${API_URL}/actualizar/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const text = await res.text();
      const data = text ? JSON.parse(text) : null;

      if (!res.ok) {
        const msg = (data && data.mensaje) || (typeof text === "string" ? text : "Error al actualizar historia médica");
        throw new Error(msg);
      }

      if (key) await mutate(key);
      await mutate(`${API_URL}/listar`);

      return data;
    },
    [key]
  );

  return {
    historiaPaciente: data ?? null,
    loading: isLoading,
    error: error instanceof Error ? error.message : null,
    guardarHistoria,
    actualizarHistoria,
  };
}
