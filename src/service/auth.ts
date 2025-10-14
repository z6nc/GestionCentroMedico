import type { PropsUser } from '../types/user.types';

type LoginPayload = {
  email: string;
  password: string;
};

// Datos de prueba locales
const fakeUsers: PropsUser[] = [
  {
    id: '12345678',
    nombre: 'Juan',
    apellido: 'Perez',
    email: 'medico@mail.com',
    celular: '987654321',
    tipo: 'medico',
    especialidad: 'Cardiología',
    consultorio: '101',
  },
  {
    id: '87654321',
    nombre: 'Ana',
    apellido: 'Gomez',
    email: 'admin@gmail.com',
    celular: '912345678',
    tipo: 'administrativo',
  },
  {
    id: '11223344',
    nombre: 'Carlos',
    apellido: 'Lopez',
    email: 'cajero@mail.com',
    celular: '923456789',
    tipo: 'cajero',
  },
];

export async function loginRequest(payload: LoginPayload): Promise<PropsUser> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const user = fakeUsers.find((u) => u.email === payload.email);

  if (!user ) {
    // Contraseña de prueba para todos: '1234'
    throw new Error('Email o contraseña incorrectos');
  }

  return user;
}
