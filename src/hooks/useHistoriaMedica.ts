import useSWR, { mutate } from "swr";
import { useCallback } from "react";
import type { HistoriaMedicaProps } from "../schema/historiaMedica.schema";
import type { Paciente } from "../schema/paciente.schema";

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

export interface CitaDTO {
  numero: number;
  pacienteId: number;
  dniPaciente: string;
  horarioId: string;
  idDoctor: string;
  motivo: string;
  fecha: Date; // o Date, según corresponda
  tipoCita: string; // CONSULTA | CONTROL | EMERGENCIA | TELECONSULTA
  costo: number;
  estado: "RESERVADA" | "CANCELADA" | "FINALIZADA";
}

export interface AtencionMedicaDTO {
  idAtencion: number;
  diagnostico: string;
  tratamiento: string;
  descripcion: string;
  FechaAtencionMedica: string;
  // Agrega más campos si tu AtencionMedicaDTO tiene más
}

export interface CitaConAtencion {
  cita: CitaDTO;
  atencion: AtencionMedicaDTO | null; // Puede ser null si no tiene atención
}

export interface ExpedienteMedico {
   paciente:Paciente;
   historialMedico: HistoriaMedicaProps;
   listaCitas: CitaConAtencion[];
}

export function useExpedientesMedicos(pacienteId: string | null) {
  const { data, error, isLoading } = useSWR<ExpedienteMedico>( // También cambié a singular
    pacienteId
      ? `http://localhost:8193/expediente/paciente/${pacienteId}`
      : null,
    fetcher
  );

  return {
    expediente: data || null, // Cambié el nombre porque es singular
    isLoading,
    error
  };
}


export function useBuscarHistoriaMedica(id : number){
  const BUSCAR_URL = `http://localhost:8088/historiaMedica/buscar/paciente/${id}`;
  const { data, error, isLoading } = useSWR<HistoriaMedicaProps>(`${BUSCAR_URL}`,fetcher,);
  return {
    historiaMedica: data,
    errorHistoria : error,
    isLoadingHistoria: isLoading,
    mutate, // permite actualizar la data localmente o volver a fetch
  };
}