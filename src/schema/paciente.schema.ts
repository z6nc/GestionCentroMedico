import { z } from "zod";

export const pacienteSchema = z.object({
    DniPaciente: z.string().min(8, "El DNI debe tener al menos 8 dígitos"),
    Nombre: z.string().min(1, "El nombre es obligatorio"),
    Apellido: z.string().min(1, "El apellido es obligatorio"),
    FechaNacimiento: z.string(),
    Genero: z.enum(["Masculino", "Femenino"]),
    Telefono: z.string().min(9, "El teléfono debe tener al menos 9 dígitos"),
    Direccion: z.string().optional(),
    Email: z.email("Email inválido").optional(),
});

export type Paciente = z.infer<typeof pacienteSchema>;
