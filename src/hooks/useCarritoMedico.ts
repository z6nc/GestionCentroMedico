import useSWR, { mutate } from "swr";

export interface CarritoHorario {
    id?: number;
    numero?: number | null;
    fecha: string;
    horaInicio: string;
    horaFin: string;
    medicoId: number;
    consultorio: string;
}

const fetcher = (url: string) => fetch(url).then(res => res.json());

export function useCarritoHorario() {
    const { data, error } = useSWR<CarritoHorario[]>("http://localhost:8094/carritohorario/listar", fetcher);

    const agregarHorario = async (horario: CarritoHorario) => {
        await fetch("http://localhost:8094/carritohorario/agregar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(horario),
        });
        mutate("http://localhost:8094/carritohorario/listar"); // Refresca SWR
    };

    const quitarHorario = async (id: number) => {
        await fetch(`http://localhost:8094/carritohorario/quitar/${id}`, { method: "DELETE" });
        mutate("http://localhost:8094/carritohorario/listar"); // Refresca SWR
    };

    const ActualizarHorarios = async () => {
        try {
            // 1. Envía los horarios a programación médica
            const response = await fetch(
                "http://localhost:8087/programacionmedica/nueva/1",
                { method: "POST" }
            );

            if (!response.ok) {
                throw new Error(`Error al actualizar horarios: ${response.status}`);
            }
            const result = await response.json().catch(() => null);

            await mutate("http://localhost:8094/carritohorario/listar");
            await mutate("http://localhost:8085/horariomedico/listar"); 
            return result;
        } catch (error) {
            console.error("Error en ActualizarHorarios:", error);
            throw error;

        }
    };
    return {
        ListaCarritoHorarios: data || [],
        error,
        agregarHorario,
        quitarHorario,
        ActualizarHorarios
    };
}
