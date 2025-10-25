import { z } from "zod";

export const HistoriaMedicaSchema = z.object({
    IDHistoriaMedica: z.string(),
    pacienteId: z.string(),
    medicoId: z.string(),
    fecha: z.date(),
    tipoSangre: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]),
    diagnostico: z.string().min(10).max(500),
    sintomas: z.string().min(10).max(500),
    tratamiento: z.string().min(10).max(500),
    alergias: z.string().max(300).optional(),
    antecedentesMedicos: z.string().max(500).optional(),
});

export type HistoriaMedicaProps = z.infer<typeof HistoriaMedicaSchema>;