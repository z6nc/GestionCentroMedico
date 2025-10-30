import { z } from "zod";

export const programacionMedica = z.object({
    id: z.number().optional(),
    numero : z.number().optional(),
    fecha : z.date(),
    horaInicio : z.string(),
    horaFin : z.string(),
    medicoId : z.number(),
    consultorio: z.string(),
});

export type Paciente = z.infer<typeof programacionMedica>;
