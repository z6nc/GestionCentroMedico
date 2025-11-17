// hooks/usePacientes.ts
import { mutate } from "swr";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
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

  const EliminarHorario = async (numero: number, medicoId: string) => {
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
