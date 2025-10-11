import { z } from 'zod';

export const loginSchema = z.object({
    email: z.email('Email inválido'),
    password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

export type LoginForm = z.infer<typeof loginSchema>;