import type { PropsCitaConfirmada } from "../../../hooks/useCitas";
import { CheckCircle } from "lucide-react";
import { usePacientes } from "../../../hooks/usePaciente";
import { useMedicosPorEspecialidad } from "../../../hooks/useMedicos";
import { useHorarioMedico } from "../../../hooks/useHorarioMedico";

export const BoletaCita = ({ Databoletacita }: { Databoletacita: PropsCitaConfirmada | null }) => {
    const { pacientes } = usePacientes();
    const { medicos } = useMedicosPorEspecialidad('');
    const { horarios } = useHorarioMedico();
    const filtradoPaciente = pacientes?.find(p => p.numero === Databoletacita?.pacienteId);
    const filtradoMedico = medicos?.find(m => m.numero == Databoletacita?.idDoctor);
    const filtradoHorario = horarios?.find(h => h.numero === Databoletacita?.horarioId);
    return (

        <div className="text-center space-y-6">
            <div className="flex justify-center">
                <CheckCircle className="text-green-500" size={80} />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">
                ¡Cita Confirmada!
            </h2>
            <div className="bg-gray-50 p-6 rounded-lg text-left max-w-md mx-auto">
                <h3 className="font-semibold text-gray-800 mb-4 text-center">
                    Detalles de tu cita:
                </h3>
                <div className="space-y-3 text-sm">
                    <div className="flex justify-between border-b pb-2">
                        <span className="text-gray-600">N* Boleta:</span>
                        <span className="font-semibold">{Databoletacita?.numero}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                        <span className="text-gray-600">DNI:</span>
                        <span className="font-semibold">{filtradoPaciente?.dni}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                        <span className="text-gray-600">Médico:</span>
                        <span className="font-semibold">{filtradoMedico?.nombre}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                        <span className="text-gray-600">Especialidad:</span>
                        <span className="font-semibold">{filtradoMedico?.especialidad}</span>
                    </div>
                    
                    <div className="flex justify-between border-b pb-2">
                        <span className="text-gray-600">Tipo de Cita:</span>
                        <span className="font-semibold text-indigo-600">
                            {Databoletacita?.tipoCita}
                        </span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                        <span className="text-gray-600">Fecha:</span>
                        <span className="font-semibold">
                            {new Date(Databoletacita?.fecha || '').toLocaleDateString('es-ES', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                            })}
                        </span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                        <span className="text-gray-600">Hora Inicio:</span>
                        <span className="font-semibold">{filtradoHorario?.horaInicio}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                        <span className="text-gray-600">Horario Final:</span>
                        <span className="font-semibold">{filtradoHorario?.horaFin}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                        <span className="text-gray-600">Motivo:</span>
                        <span className="font-semibold text-right ml-4">{Databoletacita?.motivo}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                        <span className="text-gray-600">Estado:</span>
                        <span className="font-semibold text-yellow-600">
                            {Databoletacita?.estado}
                        </span>
                    </div>
                    <div className="flex justify-between pt-3 border-t-2">
                        <span className="text-gray-800 font-semibold">Costo Total:</span>
                        <span className="font-bold text-green-600 text-xl">
                            S/ {Databoletacita?.costo}
                        </span>
                    </div>
                </div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg max-w-md mx-auto">
                <p className="text-sm text-gray-600">
                    Por favor, llega 10 minutos antes de tu cita.
                </p>
            </div>
            <button
                onClick={()=>{}}
                className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
            >
                Agendar Nueva Cita
            </button>
        </div>



    )
}