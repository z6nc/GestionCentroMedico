import useSWR, { mutate } from "swr";
import { useState, useCallback } from "react";

export interface HistoriaMedica {
  idHistoriaMedica?: number;
  pacienteId: number;
  alergias: string;
  tipoSangre: string;
  enfermedadesCronicas: string;
  antecedentesFamiliares: string;
  fechaCreacion?: string;
  mensaje?: string;
}

const API_URL = "http://localhost:8088/historiaMedica";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  const text = await res.text();
  if (!res.ok) {
    if (res.status === 404) {
      // Devuelve null cuando no hay historia médica
      return null;
    }
    throw new Error(text || "Error en la solicitud");
  }

  const data = text ? JSON.parse(text) : null;

  // Si viene un mensaje, significa que no hay historia
  if (data && data.mensaje) return null;

  return data;
};


export function useHistoriaMedica() {
  // 🔹 SWR para listar todas las historias
  const { data: historias, error: errorListar, isLoading: isLoadingListar } =
    useSWR<HistoriaMedica>(`${API_URL}/listar`, fetcher);

  // 🔹 Estados de loading y error para cada endpoint
  const [loadingGuardar, setLoadingGuardar] = useState(false);
  const [errorGuardar, setErrorGuardar] = useState<string | null>(null);

  const [loadingActualizar, setLoadingActualizar] = useState(false);
  const [errorActualizar, setErrorActualizar] = useState<string | null>(null);

  const [loadingBuscarId, setLoadingBuscarId] = useState(false);
  const [errorBuscarId, setErrorBuscarId] = useState<string | null>(null);

  // 🔹 Guardar historia
  const guardarHistoria = async (
    historia: Omit<HistoriaMedica, "idHistoriaMedica" | "fechaCreacion">
  ) => {
    setLoadingGuardar(true);
    setErrorGuardar(null);
    try {
      const res = await fetch(`${API_URL}/guardar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(historia),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Error al guardar historia médica");
      }

      // Actualiza SWR global de listar
      await mutate(`${API_URL}/listar`);

      // Actualiza cache por paciente automáticamente
      await mutate(`${API_URL}/buscar/paciente/${historia.pacienteId}`);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error al guardar historia médica";
      setErrorGuardar(message);
    } finally {
      setLoadingGuardar(false);
    }
  };

  // 🔹 Actualizar historia
  const actualizarHistoria = async (
    idHistoriaMedica: number,
    data: Partial<HistoriaMedica>
  ) => {
    setLoadingActualizar(true);
    setErrorActualizar(null);
    try {
      const res = await fetch(`${API_URL}/actualizar/${idHistoriaMedica}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Error al actualizar historia médica");
      }

      await mutate(`${API_URL}/listar`);

      if (data.pacienteId) {
        await mutate(`${API_URL}/buscar/paciente/${data.pacienteId}`);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error al actualizar historia médica";
      setErrorActualizar(message);
    } finally {
      setLoadingActualizar(false);
    }
  };

  // 🔹 Buscar por ID
  const buscarPorId = useCallback(
    async (idHistoriaMedica: number): Promise<HistoriaMedica | null> => {
      setLoadingBuscarId(true);
      setErrorBuscarId(null);
      try {
        const res = await fetch(`${API_URL}/buscar/${idHistoriaMedica}`);
        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || "Error al obtener historia médica por ID");
        }
        return await res.json();
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Error al buscar por ID";
        setErrorBuscarId(message);
        return null;
      } finally {
        setLoadingBuscarId(false);
      }
    },
    []
  );

  // 🔹 Buscar por paciente con SWR y caching


  return {
    // Listar
    historias,
    isLoadingListar,
    errorListar,

    // Guardar
    guardarHistoria,
    loadingGuardar,
    errorGuardar,

    // Actualizar
    actualizarHistoria,
    loadingActualizar,
    errorActualizar,

    // Buscar por ID
    buscarPorId,
    loadingBuscarId,
    errorBuscarId,

  };
}

export function useHistoriaPorPaciente(pacienteId?: number) {
  const key = pacienteId ? `${API_URL}/buscar/paciente/${pacienteId}` : null;
  const { data, error, isLoading } = useSWR<HistoriaMedica | null>(key, fetcher, {
    revalidateOnFocus: false,
  });

  return {
    historiaPaciente: data ? data : null,
    loading: isLoading,
    error: error instanceof Error ? error.message : null,
  };
}
