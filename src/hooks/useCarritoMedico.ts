import useSWR, { mutate } from "swr";
import { toast } from "react-toastify"
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

    // const agregarHorario = async (horario: CarritoHorario) => {
    //     await fetch("http://localhost:8094/carritohorario/agregar", {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify(horario),
    //     });
    //     mutate("http://localhost:8094/carritohorario/listar"); // Refresca SWR
    // };
    const agregarHorario = async (horario: CarritoHorario) => {
        try {
            const response = await fetch("http://localhost:8094/carritohorario/agregar", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(horario),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Error ${response.status}: ${errorText}`);
            }

            await mutate("http://localhost:8094/carritohorario/listar");

            // Toast de éxito
            toast.success("Horario agregado correctamente");

        } catch (error) {
            console.error("Error al agregar horario:", error);

            const errorMessage = error instanceof Error ? error.message : "Error desconocido";

            // Detectar si es un error de duplicado
            if (errorMessage.toLowerCase().includes("existe") ||
                errorMessage.toLowerCase().includes("duplicado") ||
                errorMessage.toLowerCase().includes("ya existe")) {
                toast.error("Este horario ya existe en el carrito");
            } else {
                toast.error("Error al agregar el horario");
            }

            throw error;
        }
    };

    const quitarHorario = async (id: number) => {
        await fetch(`http://localhost:8094/carritohorario/quitar/${id}`, { method: "DELETE" });
        mutate("http://localhost:8094/carritohorario/listar"); // Refresca SWR
    };

    const ActualizarHorarios = async (medicoId: string) => {
        try {
            // 1. Envía los horarios a programación médica
            const response = await fetch(
                "http://localhost:8187/programacioncompuesta/nuevo?idAdministrativo=1",
                { method: "POST" }
            );

            if (!response.ok) {
                throw new Error(`Error al actualizar horarios: ${response.status}`);
            }
            const result = await response.json().catch(() => null);

            await mutate("http://localhost:8094/carritohorario/listar");
            await mutate(
                `http://localhost:8185/disponibilidad/disponibles?medicoId=${medicoId}`
            );
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
