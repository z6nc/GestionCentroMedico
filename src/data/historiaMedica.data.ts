import type { HistoriaMedicaProps } from "../schema/historiaMedica.schema";
export interface PropsListaAtencioMedica {
    IdHistoria: string;
    pacienteId: number;
    IDCita: string;
    medicoId: string;
    FechaCita: string;
    costoCita: number;
    FechaAtencionMedica: string;
    descripcion: string;
    diagnostico: string;
    tratamiento: string;
    notas: string;
    analisis?: string[];
    recetas?: string[];
}

// Datos de ejemplo para historias médicas de pacientes
export const AtencionMedicaData: PropsListaAtencioMedica[] = [
    // Paciente 1
    {
        IdHistoria: "hm001",
        pacienteId: 1,
        IDCita: "CIT-001",
        medicoId: "med001",
        FechaCita: "2025-01-15T10:00:00Z",
        costoCita: 50,
        FechaAtencionMedica: "2025-01-15T10:30:00Z",
        descripcion: "Consulta inicial por síntomas de resfriado.",
        diagnostico: "Resfriado común",
        tratamiento: "Descanso, líquidos y paracetamol",
        notas: "Se recomienda seguimiento en una semana",
    },
    {
        IdHistoria: "hm002",
        pacienteId: 1,
        IDCita: "CIT-002",
        medicoId: "med002",
        FechaCita: "2025-03-10T14:30:00Z",
        costoCita: 40,
        FechaAtencionMedica: "2025-03-10T15:00:00Z",
        descripcion: "Revisión general y vacunas.",
        diagnostico: "Buen estado general",
        tratamiento: "Vacunas aplicadas",
        notas: "Siguiente control en 6 meses",
    },
    // Paciente 2
    {
        IdHistoria: "hm003",
        pacienteId: 2,
        IDCita: "CIT-003",
        medicoId: "med003",
        FechaCita: "2025-02-20T09:15:00Z",
        costoCita: 45,
        FechaAtencionMedica: "2025-02-20T09:45:00Z",
        descripcion: "Dolor de garganta y fiebre.",
        diagnostico: "Faringitis bacteriana",
        tratamiento: "Antibióticos 7 días",
        notas: "Control en 1 semana",
    },
    {
        IdHistoria: "hm004",
        pacienteId: 2,
        IDCita: "CIT-004",
        medicoId: "med001",
        FechaCita: "2025-04-05T11:00:00Z",
        costoCita: 55,
        FechaAtencionMedica: "2025-04-05T11:30:00Z",
        descripcion: "Chequeo anual de rutina.",
        diagnostico: "Buen estado general",
        tratamiento: "Recomendaciones de dieta y ejercicio",
        notas: "Control anual recomendado",
    },
];

export const HistoriaDataMedicaPaciente: HistoriaMedicaProps[] =[
    {
        IDHistoriaMedica: "hm001",
        pacienteId: 1,
        edad: 30,
        peso: "70.5",
        altura: "175.3",
        tipoSangre: "A+",
    }
]