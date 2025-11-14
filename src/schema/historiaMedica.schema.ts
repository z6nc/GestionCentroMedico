import { z } from "zod";

export const HistoriaMedicaSchema = z.object({
  idHistoriaMedica: z.number().optional(), 
  pacienteId: z.number(),
  tipoSangre: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]),
  alergias: z.string().optional(),
  enfermedadesCronicas: z.string().optional(),
  antecedentesFamiliares: z.string().optional(),
  fechaCreacion: z.string().optional(), // opcional si la crea el backend
  mensaje: z.string().optional(),
});

export type HistoriaMedicaProps = z.infer<typeof HistoriaMedicaSchema>;

