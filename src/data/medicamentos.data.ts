import type { Medicamento } from "../schema/medicamentos.schema"
export const MedicamentosData: Medicamento[] = [
    {
        IDMedicamento: "00000001",
        NombreMedicamento: "Paracetamol",
        stockMedicamento: 100,
        PrecioMedicamento: 10.5,
        FechaMedicamento: "2023-01-15",
    },
    {
        IDMedicamento: "00000002",
        NombreMedicamento: "Ibuprofeno",
        stockMedicamento: 50,
        PrecioMedicamento: 15.0,
        FechaMedicamento: "2023-02-20",
    },  
    {
        IDMedicamento: "00000003",
        NombreMedicamento: "Amoxicilina",
        stockMedicamento: 75,
        PrecioMedicamento: 25.0,
        FechaMedicamento: "2023-03-10",
    }

]