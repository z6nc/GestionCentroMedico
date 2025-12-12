import {
  Calendar,
  User,
  Stethoscope,
  Activity,
  Clock,
  FileCheck,
  Building2
} from 'lucide-react';
import { useVerAnalisis } from '../../hooks/useAnalisisMedica';
import { useParams } from 'react-router-dom';
export function VistaAnalisisAtencion() {
  // Datos proporcionados por el usuario (Simulación de Props)
  const { id } = useParams();
  const { analisis, isLoading, isError, error } = useVerAnalisis(id);

  if (isLoading) return <div>Cargando receta...</div>;
  if (!analisis) return <div>No se encontró la receta.</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  // Función auxiliar para formatear fechas amigables
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-PE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden font-sans my-8">

      {/* 1. CABECERA: Estado y Meta-datos */}
      <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-blue-100 p-2 rounded-full text-blue-600">
            <FileCheck size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-800">Análisis #{analisis.idAnalisis}</h1>
            <p className="text-sm text-slate-500 flex items-center gap-1">
              <Calendar size={14} />
              {formatDate(analisis?.fecha)}
            </p>
          </div>
        </div>
        <div>
          <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wider border
            ${analisis?.estado === 'FINALIZADO'
              ? 'bg-green-100 text-green-700 border-green-200'
              : 'bg-yellow-100 text-yellow-700 border-yellow-200'
            }`}>
            {analisis?.estado}
          </span>
        </div>
      </div>

      <div className="p-6 grid gap-8">

        {/* 2. TARJETA DE INFORMACIÓN DEL MÉDICO Y DIAGNÓSTICO */}
        <div className="grid md:grid-cols-3 gap-6">

          {/* Columna Izquierda: El Médico */}
          <div className="md:col-span-1 space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <User size={14} /> Profesional
            </h3>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold text-sm">
                {analisis?.medico.nombre[0]}{analisis?.medico.apellido[0]}
              </div>
              <div>
                <p className="font-semibold text-slate-800 text-sm">Dr. {analisis?.medico.nombre} {analisis?.medico.apellido}</p>
                <p className="text-xs text-blue-600 font-medium bg-blue-50 inline-block px-2 py-0.5 rounded mt-1">
                  {analisis?.medico.especialidad}
                </p>
                <p className="text-xs text-slate-400 mt-1">CMP: {analisis?.medico.dni}</p>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Resumen Clínico (Diagnóstico/Tratamiento) */}
          <div className="md:col-span-2 bg-slate-50 rounded-lg p-4 border border-slate-100">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Activity size={14} /> Resumen Clínico
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <span className="text-xs font-semibold text-slate-500 block mb-1">Diagnóstico</span>
                <p className="text-sm text-slate-800 leading-relaxed font-medium">
                  {analisis?.atencion.diagnostico}
                </p>
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-500 block mb-1">Tratamiento General</span>
                <p className="text-sm text-slate-800 leading-relaxed">
                  {analisis?.atencion.tratamiento}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 3. LISTA DE MEDICAMENTOS (DETALLE) */}
        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2 border-b border-slate-100 pb-2">
            <Stethoscope size={20} className="text-blue-500" />
            Exámenes clinicos Solicitados
            <span className="text-xs font-normal text-slate-400 ml-auto bg-slate-100 px-2 py-1 rounded-full">
              {analisis?.detalles.length} items
            </span>
          </h3>

          <div className="space-y-3">
            {analisis?.detalles.map((item) => (
              <div
                key={item.idDetalle}
                className="group border border-slate-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition-all bg-white relative overflow-hidden"
              >
                {/* Barra decorativa lateral */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 group-hover:bg-blue-600 transition-colors"></div>

                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pl-2">

                  {/* Info Medicamento */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-bold text-slate-800 text-base">
                        {item.nombreTipo}
                      </h4>
                      <span className="text-[10px] uppercase font-bold text-slate-500 border border-slate-200 px-1.5 py-0.5 rounded bg-slate-50 flex items-center gap-1">
                        <Building2 size={10} /> {item.laboratorioTipo}
                      </span>
                    </div>

                    <div className="flex items-start gap-2 mt-2">
                      <Clock size={14} className="text-blue-500 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-slate-600 italic">
                        "{item.indicaciones}"
                      </p>
                    </div>
                  </div>

                  {/* Cantidad Badge */}
                  
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* FOOTER / LEGAL */}
      <div className="bg-slate-50 p-4 border-t border-slate-200 text-center">
        <p className="text-xs text-slate-400">
          Documento generado electrónicamente el {new Date().toLocaleDateString()}. Validez legal sujeta a firma digital del médico.
        </p>
      </div>
    </div>
  );
};
