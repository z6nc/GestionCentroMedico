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

    return {
        horarios: data || [],
        error,
        agregarHorario,
        quitarHorario,
    };
}
