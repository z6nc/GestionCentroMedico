import { z } from "zod";

export const analisisSchema = z.object({
  idAnalisis: z
    .string()
    .min(1, "El ID del análisis es obligatorio")
    .max(50, "El ID no puede exceder 50 caracteres"),

  nombreAnalisis: z
    .string()
    .min(2, "El nombre del análisis debe tener al menos 2 caracteres")
    .max(100, "El nombre del análisis no puede exceder 100 caracteres"),

  descripcion: z
    .string()
    .min(5, "La descripción debe tener al menos 5 caracteres")
    .max(500, "La descripción no puede exceder 500 caracteres"),

  precio: z.number().int("El precio debe ser un número entero"),
  duracionDias: z.number().int("La duración debe ser un número entero"),
});

export type AnalisisProps = z.infer<typeof analisisSchema>;



