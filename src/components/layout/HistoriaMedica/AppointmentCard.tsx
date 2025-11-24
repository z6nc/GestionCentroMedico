
// import type { PropsListaAtencioMedica } from "../../../data/historiaMedica.data"
import { ChevronRight, Calendar, FileText, Stethoscope, Pill, Hash ,CheckCircle,Clock } from "lucide-react"
import { ModalCustom } from "../../common/Modal/modalCustom"
import type { CitaDTO } from "../../../hooks/useHistoriaMedica";
import type { AtencionMedicaEntrada } from "../../../hooks/useAtencionMedica";
import { useHorarioMedico } from "../../../hooks/useHorarioMedico";

interface AppointmentCardProps {
    citasMedica: CitaDTO | null;
    atencionMedica: AtencionMedicaEntrada | null;
    isSelected: boolean
    onClick: () => void
}

export function AppointmentCard({ citasMedica, atencionMedica, isSelected, onClick }: AppointmentCardProps) {
    // call hook inside component and safely compute formatted date
    const { horarios } = useHorarioMedico();

    // Find matching horario by coercing both sides to string to avoid type mismatch,
    // then format if a fecha is present; otherwise show a fallback.
    const horarioFecha = horarios?.find(horario => String(citasMedica?.horarioId) === String(horario?.numero))?.fecha;
    const formattedDate = horarioFecha
        ? new Date(horarioFecha).toLocaleDateString('es-ES', {
            timeZone: 'UTC',
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        })
        : '—';


        const formatearFecha = (fechaString: string | undefined) => {
    if (!fechaString) return "Fecha no válida";
    return new Date(fechaString).toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Color dinámico según el estado
  const getEstadoBadge = (estado: string | undefined) => {
    const estilos = estado === 'FINALIZADO' 
      ? 'bg-emerald-100 text-emerald-700 border-emerald-200'
      : 'bg-orange-100 text-orange-700 border-orange-200';
    
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1 ${estilos}`}>
        {estado === 'FINALIZADO' ? <CheckCircle size={12} /> : <Clock size={12} />}
        {estado}
      </span>
    );
  };

    return (
        <button
            onClick={onClick}
            className={`w-full text-left p-6 rounded-lg border-2 transition-all duration-200 ${isSelected
                ? "border-[#00c950] bg-green-50 shadow-md"
                : "border-gray-200 bg-white hover:border-[#00c950] hover:shadow-md"
                }`}
        >
            <div className="flex items-center justify-between">
                <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
                        <div className="bg-[#00c950] text-white px-3 py-1 rounded-full text-sm font-semibold">{citasMedica?.numero}</div>
                        {/* <span className="text-gray-600 text-sm">📅 {citasMedica?.fecha.toString()}</span> */}
                        <span className="text-gray-600 text-sm">
                            📅 {formattedDate}
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-gray-800">S/{citasMedica?.costo}</span>
                        <span className="text-gray-500 text-sm">costo de cita</span>
                    </div>
                </div>
                <ChevronRight className={`w-6 h-6 transition-transform ${isSelected ? "text-[#00c950]" : "text-gray-400"}`} />
            </div>
            <ModalCustom isOpen={isSelected} onClose={onClick}>
                <div className="bg-white rounded-2xl shadow-2xl w-full max-w-max overflow-hidden flex flex-col max-h-[90vh]">

                    {/* --- HEADER --- */}
                    <div className="bg-slate-50 border-b border-gray-100 p-6 flex justify-between items-start">
                        <div>
                            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                📄 Detalle de Atención
                            </h2>
                            <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                                <Hash size={14} /> ID Atención: <span className="font-mono text-gray-700 font-medium">{atencionMedica?.idAtencionMedica}</span>
                            </p>
                        </div>
                        {getEstadoBadge(atencionMedica?.estado)}
                    </div>

                    {/* --- BODY (Scrollable) --- */}
                    <div className="p-6 overflow-y-auto space-y-6">

                        {/* 1. Información General (Grid de 2 columnas) */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-blue-50/50 p-3 rounded-xl border border-blue-100">
                                <div className="flex items-center gap-2 mb-1">
                                    <Calendar size={16} className="text-blue-500" />
                                    <span className="text-xs font-bold text-blue-700 uppercase">Fecha</span>
                                </div>
                                <p className="text-sm text-gray-700 font-medium capitalize leading-tight">
                                    {formatearFecha(atencionMedica?.fechaAtencion)}
                                </p>
                            </div>

                            <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 flex flex-col justify-center">
                                <div className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                                    <Hash size={12} /> IDs Relacionados
                                </div>
                                <div className="text-xs text-gray-600 font-mono">
                                    <span title="ID Cita">Cita: #{atencionMedica?.idCita}</span> • <span title="ID Historia">Hist: #{atencionMedica?.idHistoriaMedica}</span>
                                </div>
                            </div>
                        </div>

                        {/* 2. Diagnóstico (Bloque destacado) */}
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <div className="p-1.5 bg-indigo-100 text-indigo-600 rounded-lg">
                                    <Stethoscope size={18} />
                                </div>
                                <h3 className="font-bold text-gray-800">Diagnóstico Médico</h3>
                            </div>
                            <div className="bg-white border-l-4 border-indigo-500 pl-4 py-2 text-gray-700 text-sm leading-relaxed">
                                {atencionMedica?.diagnostico || "Sin diagnóstico registrado."}
                            </div>
                        </div>

                        {/* 3. Tratamiento (Bloque destacado) */}
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <div className="p-1.5 bg-emerald-100 text-emerald-600 rounded-lg">
                                    <Pill size={18} />
                                </div>
                                <h3 className="font-bold text-gray-800">Tratamiento Indicado</h3>
                            </div>
                            <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100 text-gray-800 text-sm leading-relaxed shadow-sm">
                                {atencionMedica?.tratamiento || "Sin tratamiento registrado."}
                            </div>
                        </div>

                        {/* 4. Sección vacía (Recetas/Análisis) - UX: Feedback visual si es null */}
                        {(atencionMedica?.receta === null && atencionMedica?.analisisClinico === null) && (
                            <div className="text-center py-2">
                                <p className="text-xs text-gray-400 italic">No se adjuntaron recetas digitales ni análisis clínicos.</p>
                            </div>
                        )}

                    </div>

                    {/* --- FOOTER (Actions) --- */}
                    <div className="p-4 border-t border-gray-100 bg-gray-50 flex gap-3">
                        
                        <button className="flex-1 px-4 py-2.5 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors shadow-md flex items-center justify-center gap-2">
                            <FileText size={18} />
                            Descargar Reporte
                        </button>
                    </div>

                </div>
            </ModalCustom>
        </button>
    )
}
