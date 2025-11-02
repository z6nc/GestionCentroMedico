import { z } from "zod";

export const MedicosSchema = z.object({
  numero: z.number().optional(),
  dni: z.string().min(8, "Por favor ingresa el DNI del medico").max(8, "El DNI debe tener 8 caracteres"),
  nombre: z.string().min(1, "Por favor ingresa el nombre del Medico"),
  apellido: z.string().min(1, "Por favor ingresa el apellido del medico"),
  especialidad: z.string().min(1, "Por favor ingresa la especialidad del medico"),
  telefono: z.string().min(9, "Por favor ingresa su telefono").max(9, "El telefono debe tener 9 caracteres"),
  email: z.string().email("Email inválido").optional().or(z.literal("")),
  estado: z.preprocess(
    (val) => val === "true",
    z.boolean()
  )

});



export type MedicoProps = z.infer<typeof MedicosSchema>;
