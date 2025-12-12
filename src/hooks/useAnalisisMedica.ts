import useSWR from "swr";
import useSWRMutation from "swr/mutation";

interface TipoAnalisisProps {
    idTipo: number;
    nombre: string;
    descripcion: string;
    costo: number;
    laboratorio: string;
}

const fetcher = (url: string) => fetch(url).then(res => res.json());

export const useTipoAnalisis = () => {
    const { data, error, isLoading, mutate } = useSWR<TipoAnalisisProps[]>(
        "http://localhost:8090/tipoanalisis/listar", 
        fetcher,
        { revalidateOnFocus: false }
    );

    return {
        tiposAnalisis: data ?? [],
        isLoading,
        isError: !!error,
        error,
        refresh: mutate,
    };
};



interface AgregarTipoAnalisisProps {
    idAnalisis: number;
    idTipo: number;
    indicaciones: string;
}

const agregarFetcher = async (url: string, { arg }: { arg: AgregarTipoAnalisisProps }) => {
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

export const useAgregarTipoAnalisis = () => {
    const { trigger, isMutating, error } = useSWRMutation(
        "http://localhost:8190/agregartipo/agregar",
        agregarFetcher
    );

    return {
        agregarTipoAnalisis: trigger,
        loading: isMutating,
        error,
    };
};



interface NuevoAnalisisProps {
    idAtencion: number;
    idMedico: number;
}

const crearAnalisisFetcher = async (url: string, { arg }: { arg: NuevoAnalisisProps }) => {
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

export const useCrearAnalisis = () => {
    const { trigger, isMutating, error } = useSWRMutation(
        "http://localhost:8198/gestionanalisis/nuevo",
        crearAnalisisFetcher
    );

    return {
        crearAnalisis: trigger,
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

interface DetalleAnalisisProps {
    idDetalle: number;
    idAnalisis: number;
    idTipo: number;
    nombreTipo: string;
    descripcionTipo: string;
    costoTipo: number;
    laboratorioTipo: string;
    indicaciones: string;
}


export interface AnalisisFinalizadoProps {
    idAnalisis: number;
    fecha: string;
    estado: string;
    medico: MedicoProps;
    atencion: AtencionProps;
    detalles: DetalleAnalisisProps[];
}

const finalizarAnalisisFetcher = async (url: string) => {
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

export const useFinalizarAnalisis = (idAnalisis: number) => {
    const { trigger, isMutating, error, data } = useSWRMutation<AnalisisFinalizadoProps>(
        `http://localhost:8198/gestionanalisis/finalizar/${idAnalisis}`,
        finalizarAnalisisFetcher
    );

    return {
        finalizarAnalisis: trigger,
        loading: isMutating,
        error,
        analisisFinalizado: data,
    };
};



// ver receta Carrito
export const useVerAnalisis = (idAnalisis: number) => {
    const { data, error, isLoading, mutate } = useSWR<AnalisisFinalizadoProps>(
        idAnalisis ? `http://localhost:8198/gestionanalisis/ver/${idAnalisis}` : null,
        fetcher,
        { revalidateOnFocus: false }
    );

    return {
        analisis: data,
        isLoading,
        isError: !!error,
        error,
        refresh: mutate,
    };
};