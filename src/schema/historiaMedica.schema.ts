import { z } from "zod";

export const HistoriaMedicaSchema = z.object({
  idHistoriaMedica: z.string().optional(), // puede ser undefined al crear
  pacienteId: z.number(),
  tipoSangre: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]),
  alergias: z.string().optional(),
  enfermedadesCronicas: z.string().optional(),
  antecedentesFamiliares: z.string().optional(),
  fechaCreacion: z.string().optional(), // opcional si la crea el backend
});

export type HistoriaMedicaProps = z.infer<typeof HistoriaMedicaSchema>;
