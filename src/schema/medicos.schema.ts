import { z } from "zod";

export const MedicosSchema = z.object({
    numero: z.number().optional(),
    nombre: z.string().min(1, "Por favor ingresa el nombre del Medico"),
    apellido: z.string().min(1, "Por favor ingresa el apellido del medico"),
    // Especialidad: z.enum([
    //     "Cardiología",
    //     "Medicina General",
    //     "Pediatría",
    //     "Dermatología",
    //     "Traumatología",
    //     "Ginecología",
    // ]),
    especialidad: z.string().min(1, "Por favor ingresa la especialidad del medico"),
    // telefono: z.string().min(1, "Por favor ingresa su telefono"),
    // email : z.email()
    estado: z.preprocess(
    (val) => val === "true",
    z.boolean()
  )

});

// schema/medicos.schema.ts
// export interface MedicoProps {
//   numero: number;
//   nombre: string;
//   apellido: string;
//   especialidad: string;
//   estado: boolean;
// }


export type MedicoProps = z.infer<typeof MedicosSchema>;
