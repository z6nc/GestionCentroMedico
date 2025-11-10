import { z } from "zod";

export const HistoriaMedicaSchema = z.object({
    IDHistoriaMedica: z.string(),
    pacienteId: z.number(),
    edad: z.number().min(0).max(120),
    peso: z.string().regex(/^\d+(\.\d{1,2})?$/, "Peso inválido"),
    altura: z.string().regex(/^\d+(\.\d{1,2})?$/, "Altura inválida"),
    tipoSangre: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]),
    // presionArterial: z.string().regex(/^\d{2,3}\/\d{2,3}$/, "Presión arterial inválida"),
    // frecuenciaCardiaca: z.string().regex(/^\d{2,3}$/, "Frecuencia cardiaca inválida"),
    // fecha: z.date(),
    // diagnostico: z.string().min(10).max(500),
    // sintomas: z.string().min(10).max(500),
    // tratamiento: z.string().min(10).max(500),
    // alergias: z.string().max(300).optional(),
    // antecedentesMedicos: z.string().max(500).optional(),
});

export type HistoriaMedicaProps = z.infer<typeof HistoriaMedicaSchema>;