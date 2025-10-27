
export interface PropsHistoriaMedica {
    IdHistoria: string;
    pacienteId: string;
    medicoId: string;
    fecha: string;
    descripcion: string;
    diagnostico: string;
    tratamiento: string;
    notas: string;
}

// Datos de ejemplo para historias médicas de pacientes
// En un caso real, estos datos vendrían de una base de datos o una API externa
export const HistoriaMedicaData: PropsHistoriaMedica[] = [
  // Paciente 1
  {
    IdHistoria: "hm001",
    pacienteId: "12345678",
    medicoId: "med001",
    fecha: "2025-01-15T10:00:00Z",
    descripcion: "Consulta inicial por síntomas de resfriado.",
    diagnostico: "Resfriado común",
    tratamiento: "Descanso, líquidos y paracetamol",
    notas: "Se recomienda seguimiento en una semana",
  },
  {
    IdHistoria: "hm002",
    pacienteId: "12345678",
    medicoId: "med002",
    fecha: "2025-03-10T14:30:00Z",
    descripcion: "Revisión general y vacunas.",
    diagnostico: "Buen estado general",
    tratamiento: "Vacunas aplicadas",
    notas: "Siguiente control en 6 meses",
  },
  // Paciente 2
  {
    IdHistoria: "hm003",
    pacienteId: "87654321",
    medicoId: "med003",
    fecha: "2025-02-20T09:15:00Z",
    descripcion: "Dolor de garganta y fiebre.",
    diagnostico: "Faringitis bacteriana",
    tratamiento: "Antibióticos 7 días",
    notas: "Control en 1 semana",
  },
  {
    IdHistoria: "hm004",
    pacienteId: "87654321",
    medicoId: "med001",
    fecha: "2025-04-05T11:00:00Z",
    descripcion: "Chequeo anual de rutina.",
    diagnostico: "Buen estado general",
    tratamiento: "Recomendaciones de dieta y ejercicio",
    notas: "Control anual recomendado",
  }
];
