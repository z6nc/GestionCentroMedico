import { z } from "zod";

export const MedicosSchema = z.object({
    IDMedico: z
        .string()
        .min(8, "El ID del medicamento debe tener 8 dígitos")
        .max(8, "El ID del medicamento debe tener 8 dígitos"),
    NombreMedico: z.string().min(1, "Por favor ingresa el nombre del Medico"),
    ApellidoMedico: z.string().min(1, "Por favor ingresa el apellido del medico"),
    Especialidad: z.string().min(1, "Por favor ingresa el apellido del medico"),
    telefono: z.string().min(1, "Por favor ingresa su telefono"),
    email : z.email()

});

export type MedicoProps = z.infer<typeof MedicosSchema>;
