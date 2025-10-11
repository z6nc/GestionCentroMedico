

// user.types.ts

export type BaseUser = {
    id: string;        // DNI
    nombre: string;
    apellido: string;
    email: string;
    celular: string;
    tipo: 'medico' | 'enfermero' | 'administrativo' | 'cajero';
};

export type Medico = BaseUser & {
    tipo: 'medico';
    especialidad: string;
    consultorio: string;
};

export type Enfermero = BaseUser & {
    tipo: 'enfermero';
    // aquí podrías agregar campos propios si hubiera
};

export type Administrativo = BaseUser & {
    tipo: 'administrativo' | 'cajero';
    // campos específicos de administrativo/cajero si los hay
};

export type User = Medico | Enfermero | Administrativo;

export type AuthResponse = {
    user: User;
    token: string;
};
