import useSWR from "swr";
import useSWRMutation from "swr/mutation";

interface MedicamentosProps {
    idMedicamento: number;
    nombre: string;
    laboratorio: string;
    precio: number;
    stock: number;
}

const fetcher = (url: string) => fetch(url).then(res => res.json());

export const useMedicamentos = () => {
    const { data, error, isLoading, mutate } = useSWR<MedicamentosProps[]>(
        "http://localhost:8082/medicamento/listar", 
        fetcher,
        { revalidateOnFocus: false }
    );

    return {
        medicamentos: data ?? [],
        isLoading,
        isError: !!error,
        error,
        refresh: mutate,
    };
};



interface AgregarMedicamentoProps {
    idReceta: number;
    idMedicamento: number;
    cantidad: number;
    indicaciones: string;
}

const agregarFetcher = async (url: string, { arg }: { arg: AgregarMedicamentoProps }) => {
    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(arg),
    });

    if (!res.ok) {
        throw new Error(`Error ${res.status}`);
    }

    return res.json();
};

export const useAgregarMedicamento = () => {
    const { trigger, isMutating, error } = useSWRMutation(
        "http://localhost:8195/agregarmedicamento/agregar",
        agregarFetcher
    );

    return {
        agregarMedicamento: trigger,
        loading: isMutating,
        error,
    };
};



interface NuevaRecetaProps {
    idAtencion: number;
    idMedico: number;
}

const crearRecetaFetcher = async (url: string, { arg }: { arg: NuevaRecetaProps }) => {
    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(arg),
    });

    if (!res.ok) {
        throw new Error(`Error ${res.status}`);
    }

    return res.json();
};

export const useCrearReceta = () => {
    const { trigger, isMutating, error } = useSWRMutation(
        "http://localhost:8196/gestionreceta/nuevo",
        crearRecetaFetcher
    );

    return {
        crearReceta: trigger,
        loading: isMutating,
        error,
    };
};




// Interfaces para la respuesta
interface MedicoProps {
    numero: number;
    nombre: string;
    apellido: string;
    especialidad: string;
    estado: boolean;
    dni: string;
    telefono: string;
    email: string;
    precio: number | null;
}

interface AtencionProps {
    idAtencionMedica: number;
    idCita: number;
    idHistoriaMedica: number;
    idMedico: number;
    fechaAtencion: string;
    diagnostico: string;
    tratamiento: string;
    estado: string;
    receta: string;
    analisisClinico: string | null;
}

interface DetalleRecetaProps {
    idDetalle: number;
    idReceta: number;
    idMedicamento: number;
    nombreMedicamento: string;
    laboratorio: string;
    precio: number;
    cantidad: number;
    indicaciones: string;
}

export interface RecetaFinalizadaProps {
    idReceta: number;
    fecha: string;
    estado: string;
    medico: MedicoProps;
    atencion: AtencionProps;
    detalles: DetalleRecetaProps[];
}

const finalizarRecetaFetcher = async (url: string) => {
    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!res.ok) {
        throw new Error(`Error ${res.status}`);
    }

    return res.json();
};

export const useFinalizarReceta = (idReceta: number) => {
    const { trigger, isMutating, error, data } = useSWRMutation<RecetaFinalizadaProps>(
        `http://localhost:8196/gestionreceta/finalizar/${idReceta}`,
        finalizarRecetaFetcher
    );

    return {
        finalizarReceta: trigger,
        loading: isMutating,
        error,
        recetaFinalizada: data,
    };
};



// ver receta Carrito
export const useVerReceta = (idReceta: number) => {
    const { data, error, isLoading, mutate } = useSWR<RecetaFinalizadaProps>(
        idReceta ? `http://localhost:8196/gestionreceta/ver/${idReceta}` : null,
        fetcher,
        { revalidateOnFocus: false }
    );

    return {
        receta: data,
        isLoading,
        isError: !!error,
        error,
        refresh: mutate,
    };
};