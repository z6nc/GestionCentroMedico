// hooks/usePacientes.ts
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
// import type  { Paciente } from "../schema/paciente.schema";

interface PropsConfirmarCita {
  idPaciente: number;
  idDoctor: number;
  horarioId: number;
  motivo: string;
  tipoCita: string;
}

export interface PropsCitaConfirmada {
  numero: number;
  pacienteId: number;
  dniPaciente: string | null;
  horarioId: number;
  idDoctor: number;
  motivo: string;
  tipoCita: string;
  fecha: string;
  costo: number;
  estado: string;
}

const fetcher = (url: string) => fetch(url).then(res => res.json());

export function useCitas() {
  const LISTAR_URL = "http://localhost:8089/cita/listar";

  const { data, error, isLoading, mutate } = useSWR<PropsCitaConfirmada[]>(
    LISTAR_URL,
    fetcher
  );

  const CancelarCita = async (numero: number) => {
    try {
      const response = await fetch(
        `http://localhost:8089/cita/cancelar/${numero}`,
        {
          method: "DELETE",
          
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error ${response.status}: ${errorText}`);
      }

      // Revalidar usando el mutate del hook, no el global
      await mutate();

      return await response.json();
    } catch (error) {
      console.error("Error en CancelarCita:", error);
      throw error;
    }
  };

  return {
    ListaCitas: data || [],
    error,
    isLoadingCitas: isLoading,
    CancelarCita
  };
}


async function confirmarCitaFetcher(url: string, { arg }: { arg: PropsConfirmarCita }) {
  // Enviar como query params en POST
  const queryUrl = `${url}?${new URLSearchParams({
    idPaciente: String(arg.idPaciente),
    idDoctor: String(arg.idDoctor),
    horarioId: String(arg.horarioId),
    motivo: arg.motivo,
    tipoCita: arg.tipoCita
  })}`;

  console.log('URL:', queryUrl); // Debug

  const response = await fetch(queryUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Error del servidor:', errorText);
    throw new Error(`Error ${response.status}: ${errorText}`);
  }

  return response.json();
}

export function useConfirmarCita() {
  const { trigger, data, isMutating, error } = useSWRMutation<PropsCitaConfirmada, Error, string, PropsConfirmarCita>(
    'http://localhost:8189/solicitudcita/confirmar',
    confirmarCitaFetcher
  );

  return {
    confirmarCita: trigger,
    citaConfirmada: data || null,
    isLoadingCita: isMutating,
    errorCita: error
  };
}

export function BuscarCitarPorId(CitaId: number) {
  const BUSCAR_URL = `http://localhost:8089/cita/buscar/${CitaId}`;

  const { data, error, isLoading } = useSWR<PropsCitaConfirmada>(
    BUSCAR_URL,
    fetcher
  );
  return {
    Cita: data || null,
    errorCita: error,
    isLoadingCita: isLoading
  };
}