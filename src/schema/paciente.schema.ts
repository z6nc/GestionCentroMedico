import { z } from "zod";

export const pacienteSchema = z.object({
    DniPaciente: z
        .string()
        .min(8, "El DNI debe tener 8 dígitos")
        .max(8, "El DNI debe tener 8 dígitos"),
    Nombre: z.string().min(1, "Por favor ingresa el nombre del paciente"),
    Apellido: z.string().min(1, "Por favor ingresa el apellido del paciente"),
    FechaNacimiento: z.iso.date(),
    Edad : z.string().min(1, "Por favor ingresa la edad del paciente"),
    Genero: z.enum(["Masculino", "Femenino"]),
    Telefono: z
        .string()
        .regex(/^9\d{8}$/, "El teléfono debe comenzar con 9 y tener 9 dígitos"),
    Direccion: z.string().optional(),
    TipodeSangre: z
        .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
        .optional(),
    Email: z.email("Ingresa un email válido"),
    PesoPaciente: z.string(),
    AlturaPaciente: z.string(),
});

export type Paciente = z.infer<typeof pacienteSchema>;
