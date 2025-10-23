import type { AnalisisProps } from "../schema/analisis.schema";
export const AnalisisData: AnalisisProps[] = [
  {
    idAnalisis: 'A001',
    nombreAnalisis: 'Hemograma completo',
    descripcion: 'Evaluación de glóbulos rojos, glóbulos blancos y plaquetas para detectar anemias, infecciones y otras alteraciones sanguíneas.',
    precio: 25.0,
    duracionDias: 0,
  },
  {
    idAnalisis: 'A002',
    nombreAnalisis: 'Perfil bioquímico (química sanguínea)',
    descripcion: 'Conjunto de pruebas que incluyen función hepática, renal, electrolitos y perfil lipídico para evaluar el estado metabólico.',
    precio: 40.0,
    duracionDias: 1,
  },
  {
    idAnalisis: 'A003',
    nombreAnalisis: 'Prueba de glucosa (glicemia)',
    descripcion: 'Medición de la concentración de glucosa en sangre para el diagnóstico y control de la diabetes.',
    precio: 10.0,
    duracionDias: 0,
  },
  {
    idAnalisis: 'A004',
    nombreAnalisis: 'Perfil lipídico',
    descripcion: 'Incluye colesterol total, HDL, LDL y triglicéridos para evaluar el riesgo cardiovascular.',
    precio: 30.0,
    duracionDias: 1,
  },
  {
    idAnalisis: 'A005',
    nombreAnalisis: 'Prueba de función tiroidea (TSH, T4 libre)',
    descripcion: 'Evaluación del funcionamiento de la glándula tiroides mediante la medición de hormonas tiroideas y TSH.',
    precio: 35.0,
    duracionDias: 2,
  },
  {
    idAnalisis: 'A006',
    nombreAnalisis: 'Examen general de orina (EGO)',
    descripcion: 'Evaluación de la orina para detectar infecciones, hematuria, proteinuria y otras alteraciones del tracto urinario.',
    precio: 15.0,
    duracionDias: 0,
  },
  {
    idAnalisis: 'A007',
    nombreAnalisis: 'Prueba de coagulación (TP/INR, TPT)',
    descripcion: 'Pruebas para evaluar la capacidad de coagulación de la sangre; importantes antes de cirugías o para pacientes con anticoagulación.',
    precio: 28.0,
    duracionDias: 1,
  },
  {
    idAnalisis: 'A008',
    nombreAnalisis: 'Serología para VIH/HBV/HCV',
    descripcion: 'Detección de anticuerpos y/o antígenos para infecciones virales como VIH, hepatitis B y hepatitis C.',
    precio: 45.0,
    duracionDias: 3,
  },
  {
    idAnalisis: 'A009',
    nombreAnalisis: 'Prueba de embarazo (hCG)',
    descripcion: 'Detección de la hormona hCG en sangre u orina para confirmar embarazo.',
    precio: 12.0,
    duracionDias: 0,
  },
  {
    idAnalisis: 'A010',
    nombreAnalisis: 'Cultivo y antibiograma',
    descripcion: 'Recolección y cultivo de muestras (orina, heces, secreciones) para identificar microorganismos y determinar su sensibilidad a antibióticos.',
    precio: 60.0,
    duracionDias: 3,
  },
];



export default AnalisisData;
