import { z } from "zod";

export const pacienteSchema = z.object({
    numero: z.number().optional(),
    dni: z
        .string()
        .min(8, "El DNI debe tener 8 dígitos")
        .max(8, "El DNI debe tener 8 dígitos"),
    nombre: z.string().min(1, "Por favor ingresa el nombre del paciente"),
    apellido: z.string().min(1, "Por favor ingresa el apellido del paciente"),
    fechaNacimiento: z.iso.date(),
    // Genero: z.enum(["Masculino", "Femenino"]),
    email: z.email("Ingresa un email válido").optional().or(z.literal("")),
    direccion: z.string().optional(),
    telefono: z
        .string()
        .regex(/^9\d{8}$/, "El teléfono debe comenzar con 9 y tener 9 dígitos"),
    estado: z.preprocess(
        (val) => val === "true",
        z.boolean()
    )

    // ESTO ES PARA  HISTORIA MEDICA FUTURAMENTE
    // Edad : z.string().min(1, "Por favor ingresa la edad del paciente"),
    // TipodeSangre: z
    //     .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
    //     .optional(),
    // PesoPaciente: z.string(),
    // AlturaPaciente: z.string(),
});

export type Paciente = z.infer<typeof pacienteSchema>;
