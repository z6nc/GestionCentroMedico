import { z } from "zod";

export const MedicamentosSchema = z.object({
    IDMedicamento: z
        .string()
        .min(8, "El ID del medicamento debe tener 8 dígitos")
        .max(8, "El ID del medicamento debe tener 8 dígitos"),
    NombreMedicamento: z.string().min(1, "Por favor ingresa el nombre del medicamento"),
    stockMedicamento: z.number().min(0, "El stock no puede ser negativo"),
    PrecioMedicamento: z.number().min(0, "El precio no puede ser negativo"),
    FechaMedicamento: z.iso.date(),
});

export type Medicamento = z.infer<typeof MedicamentosSchema>;
    