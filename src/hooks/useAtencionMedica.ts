import useSWRMutation from "swr/mutation";
// Importa tus tipos existentes
import type { Paciente } from "../schema/paciente.schema";
import type { HistoriaMedicaProps } from "../schema/historiaMedica.schema";
import type { CitaDTO } from "./useHistoriaMedica";

// --- TIPOS ---

type PropsMedico = {
    numero: number;
    nombre: string;
    apellido: string;
    especialidad: string;
    estado: boolean;
    dni: string | null;
    telefono: string;
    email: string;
    precio: number;
}

// Input: Lo que envías al backend
export interface AtencionMedicaEntrada {
  idCita: number;
  idHistoriaMedica: number;
  idPaciente: number;
  idMedico: number; // Generalmente se saca del token, pero aquí lo enviamos explícito
  fechaAtencion: string; // ISO String
  diagnostico: string;
  tratamiento: string;
  estado: string; // "FINALIZADO"
  // Opcional: Agregar aquí los arrays de receta y analisis si tu backend los espera
  detalleReceta?: [];
  detalleAnalisis?: [];
}

// Output: Lo que el backend te responde (IDs generados, etc)
export interface AtencionMedicaSalida {
    idAtencionMedica: number;
    fechaAtencion: string;
    diagnostico: string;
    tratamiento: string;
    estado: string;
    receta: [];
    analisisClinico: [];
    cita: CitaDTO;
    medico: PropsMedico;
    historiaMedica: HistoriaMedicaProps;
    paciente: Paciente;
}

// --- FETCHER PARA MUTACIÓN (POST) ---
// Esta función realiza la petición real.
// 'url' viene del primer argumento del hook.
// 'arg' contiene los datos que pasas al llamar a trigger().
async function sendAtencionRequest(url: string, { arg }: { arg: AtencionMedicaEntrada }): Promise<AtencionMedicaSalida> {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            // Aquí agregarías tu token de autorización si fuera necesario
            // "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify(arg),
    });

    if (!response.ok) {
        // Esto permite que SWR capture el error
        const errorBody = await response.json();
        throw new Error(errorBody.message || "Error al registrar la atención médica");
    }

    return response.json();
}

// --- EL HOOK PERSONALIZADO ---
export const useGuardarAtencionMedica = () => {
    // Usamos useSWRMutation porque es una acción manual (POST), no automática (GET)
    const { trigger, data, error, isMutating, reset } = useSWRMutation<
        AtencionMedicaSalida, // Tipo de dato de retorno
        Error,                // Tipo de error
        string,               // Tipo de la Key (URL)
        AtencionMedicaEntrada // Tipo del argumento (Body)
    >(
        "http://localhost:8197/gestionatencion/registrar", // La Key (URL)
        sendAtencionRequest // La función fetcher
    );

    return {
        guardarAtencion: trigger, 
        atencionGuardada: data,   // La respuesta del backend (ej. para mostrar el PDF)
        cargando: isMutating,     // Boolean para desactivar el botón o mostrar spinner
        errorGuardado: error,     // Objeto de error si falla
        resetearEstado: reset     // Para limpiar el formulario o estado después de guardar
    };
};