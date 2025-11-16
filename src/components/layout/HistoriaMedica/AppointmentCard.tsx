
// import type { PropsListaAtencioMedica } from "../../../data/historiaMedica.data"
import { ChevronRight ,Calendar, FileText, Stethoscope  ,Pill} from "lucide-react"
import { ModalCustom } from "../../common/Modal/modalCustom"
import type { CitaDTO ,AtencionMedicaDTO } from "../../../hooks/useHistoriaMedica";

interface AppointmentCardProps {
    citasMedica: CitaDTO | null;
    atencionMedica: AtencionMedicaDTO | null;
    isSelected: boolean
    onClick: () => void
}

export function AppointmentCard({ citasMedica, atencionMedica, isSelected, onClick }: AppointmentCardProps) {
 
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
                        <span className="text-gray-600 text-sm">📅 {citasMedica?.fecha.toString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-gray-800">S/{citasMedica?.costo}</span>
                        <span className="text-gray-500 text-sm">costo de cita</span>
                    </div>
                </div>
                <ChevronRight className={`w-6 h-6 transition-transform ${isSelected ? "text-[#00c950]" : "text-gray-400"}`} />
            </div>
            <ModalCustom isOpen={isSelected} onClose={onClick}>
                <div className="bg-white rounded-lg border-2 border-[#00c950] p-6 shadow-lg">
                    <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                        <div className="w-8 h-8 bg-[#00c950] rounded-full flex items-center justify-center">
                            <span className="text-white text-sm">ℹ</span>
                        </div>
                        Detalles de Atención
                    </h2>

                    <div className="space-y-5">
                        {/* Fecha de atención */}
                        <div className="pb-4 border-b border-gray-200">
                            <div className="flex items-start gap-3">
                                <Calendar className="w-5 h-5 text-[#00c950] mt-1 flex-shrink-0" />
                                <div>
                                    <p className="text-sm font-semibold text-gray-600">Fecha de Atención</p>
                                    <p className="text-gray-800 font-medium">{atencionMedica?.FechaAtencionMedica}</p>
                                </div>
                            </div>
                        </div>

                        {/* Descripción */}
                        <div className="pb-4 border-b border-gray-200">
                            <div className="flex items-start gap-3">
                                <FileText className="w-5 h-5 text-[#00c950] mt-1 flex-shrink-0" />
                                <div>
                                    <p className="text-sm font-semibold text-gray-600">Descripción</p>
                                    <p className="text-gray-800">{atencionMedica?.descripcion}</p>
                                </div>
                            </div>
                        </div>

                        {/* Diagnóstico */}
                        <div className="pb-4 border-b border-gray-200">
                            <div className="flex items-start gap-3">
                                <Stethoscope className="w-5 h-5 text-[#00c950] mt-1 flex-shrink-0" />
                                <div>
                                    <p className="text-sm font-semibold text-gray-600">Diagnóstico</p>
                                    <p className="text-gray-800">{atencionMedica?.diagnostico}</p>
                                </div>
                            </div>
                        </div>

                        {/* Tratamiento */}
                        <div>
                            <div className="flex items-start gap-3">
                                <Pill className="w-5 h-5 text-[#00c950] mt-1 flex-shrink-0" />
                                <div>
                                    <p className="text-sm font-semibold text-gray-600">Tratamiento</p>
                                    <p className="text-gray-800">{atencionMedica?.tratamiento}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Botón de acción */}
                    <button className="w-full mt-6 bg-[#00c950] text-white py-2 rounded-lg font-semibold hover:bg-[#00b340] transition-colors">
                        Descargar Reporte
                    </button>
                </div>
            </ModalCustom>
        </button>
    )
}
