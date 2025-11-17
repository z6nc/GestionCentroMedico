import { useParams } from "react-router-dom";
import { TituloCustom } from "../../components/common/titulos/tituloCustom";
import { useState } from "react";
import { useDisponiblidadHorarioMedicoEspecialidad } from "../../hooks/useMedicos";
import { usePacientes } from "../../hooks/usePaciente";
import { Fragment } from 'react';
import { Calendar, FileText, User } from "lucide-react";
import type { MedicoConHorarios } from "../../hooks/useMedicos";
import type { HorarioMedico } from "../../hooks/useHorarioMedico";
import { useConfirmarCita } from "../../hooks/useCitas";
import { BoletaCita } from "../../components/layout/Cita/boletaCita";

const especialidades = ['Cardiologia', 'Dermatologia', 'Psiquiatria', 'Medicina General', 'Pediatria'];
type PropsTipoCita = 'EMERGENCIA' | 'CONTROL' | 'TELECONSULTA' | 'CONSULTA' | 'PRESENCIAL';

const tipoCitaOpcion = [
    {
        tipocita: 'EMERGENCIA',
        description: 'Atención inmediata para casos urgentes',
        precio: 200,
    },
    {
        tipocita: 'CONTROL',
        description: 'Seguimiento de condiciones médicas existentes',
        precio: 80
    },
    {
        tipocita: 'TELECONSULTA',
        description: 'Consulta médica a distancia vía videollamada',
        precio: 70
    },
    {
        tipocita: 'CONSULTA',
        description: 'Consulta médica general',
        precio: 100
    },
    {
        tipocita: 'PRESENCIAL',
        description: 'Consulta médica en persona',
        precio: 120
    },
]




export function VistaCitas() {
    const { pacienteId } = useParams();
    const [step, setStep] = useState(1);
    const { pacientes } = usePacientes();

    const [selectedEspecialidad, setSelectedEspecialidad] = useState('');
    const { disponibilidades, error, isLoading } = useDisponiblidadHorarioMedicoEspecialidad(selectedEspecialidad);

    // id doctor
    const [selectedDoctor, setSelectedDoctor] = useState<MedicoConHorarios | null>(null);

    // id tipo cita 
    const [tipocita, setTipocita] = useState<PropsTipoCita | ''>('');
    const [selectedHorarioId, setSelectedHorarioId] = useState<HorarioMedico | null>(null);
    const [motivo, setMotivo] = useState('');
    const EncontrarPaciente = pacientes?.find(paciente => paciente.numero === Number(pacienteId));




    const handleSpecialtySelect = (especialidad: string) => {
        setSelectedEspecialidad(especialidad);
        setStep(2);
    };

    const handleDoctorSelect = (medicoNumero: MedicoConHorarios | null) => {
        setSelectedDoctor(medicoNumero);
        setStep(3);
    };

    const handleScheduleSelect = (horario: HorarioMedico) => {
        setSelectedHorarioId(horario);
    };

    const handleAppointmentTypeSelect = (type: PropsTipoCita) => {
        setTipocita(type);
    };

    const { confirmarCita, citaConfirmada, isLoadingCita, errorCita } = useConfirmarCita();

     const handleConfirm = async () => {
    try {
        console.log('Enviando datos:', {
            idPaciente: pacienteId ? Number(pacienteId) : 0,
            idDoctor: selectedDoctor?.numero || 0,
            horarioId: selectedHorarioId?.numero || 0,
            motivo: motivo,
            tipoCita: tipocita
        });

        await confirmarCita({
            idPaciente: pacienteId ? Number(pacienteId) : 0,
            idDoctor: selectedDoctor?.numero || 0,
            horarioId: selectedHorarioId?.numero || 0,
            motivo: motivo,
            tipoCita: tipocita
        });
        
        setStep(4);
    } catch (err) {
        console.error('Error completo:', err);
        // Mantener en step 3 para que el usuario vea el error
    }
};

    return (
        <main className="">
            <TituloCustom titulo="Citas" />
            <section className="m-9 bg-white p-9">
                <div>
                    <h2>Cita para  <span>{EncontrarPaciente?.nombre} {EncontrarPaciente?.apellido}</span></h2>
                    <h3>Dni : {EncontrarPaciente?.dni}</h3>

                </div>

                {/* Progress Bar */}
                <div className="flex items-center justify-center mb-8">
                    {[1, 2, 3, 4].map((s) => (
                        <Fragment key={s}>
                            <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${step >= s
                                    ? 'bg-indigo-600 text-white'
                                    : 'bg-gray-200 text-gray-500'
                                    }`}
                            >
                                {s}
                            </div>
                            {s < 4 && (
                                <div
                                    className={`w-16 h-1 ${step > s ? 'bg-indigo-600' : 'bg-gray-200'
                                        }`}
                                />
                            )}
                        </Fragment>
                    ))}
                </div>

                {/* Step 1: Especialidad */}
                {step === 1 && (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                            Selecciona la Especialidad
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {especialidades.map((especialidad) => (
                                <button
                                    key={especialidad}
                                    onClick={() => handleSpecialtySelect(especialidad)}
                                    className="p-6 border-2 border-gray-200 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition-all text-left"
                                >
                                    <div className="flex items-center space-x-3">
                                        <User className="text-indigo-600" size={24} />
                                        <span className="text-lg font-medium text-gray-700">
                                            {especialidad}
                                        </span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Step 2: Seleccionar Médico */}
                {step === 2 && (
                    <div className="space-y-4">
                        <button
                            onClick={() => {
                                setStep(1);
                                setSelectedEspecialidad('');
                            }}
                            className="text-indigo-600 hover:text-indigo-800 mb-4"
                        >
                            ← Volver
                        </button>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                            Médicos Disponibles - {selectedEspecialidad}
                        </h2>

                        {isLoading && (
                            <div className="text-center py-8">
                                <p className="text-gray-600">Cargando médicos disponibles...</p>
                            </div>
                        )}

                        {error && (
                            <div className="text-center py-8">
                                <p className="text-red-600">Error al cargar los médicos</p>
                            </div>
                        )}

                        {!isLoading && disponibilidades && disponibilidades.length === 0 && (
                            <div className="text-center py-8">
                                <p className="text-gray-600">No hay médicos disponibles para esta especialidad</p>
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {disponibilidades?.map((medico) => (
                                <div
                                    key={medico.numero}
                                    className="p-6 border-2 border-gray-200 rounded-lg hover:border-indigo-500 transition-all"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-xl font-semibold text-gray-800">
                                                Dr. {medico.nombre} {medico.apellido}
                                            </h3>
                                            <p className="text-gray-600">{medico.especialidad}</p>

                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <p className="text-sm text-gray-600 mb-2">
                                            Horarios disponibles: ({medico.horarios.length})
                                        </p>
                                        {medico.horarios.length > 0 ? (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                {medico.horarios.map((horario) => (
                                                    <div
                                                        key={horario.numero}
                                                        className="px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg text-sm"
                                                    >
                                                        <p className="font-semibold text-blue-700">
                                                            {new Date(horario.fecha).toLocaleDateString('es-ES', {
                                                                weekday: 'short',
                                                                day: '2-digit',
                                                                month: 'short'
                                                            })}
                                                        </p>
                                                        <p className="text-blue-600">
                                                            {horario.horaInicio} - {horario.horaFin}
                                                        </p>
                                                        <p className="text-xs text-gray-600">
                                                            Consultorio: {horario.consultorio}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-sm text-gray-500 italic">
                                                Sin horarios disponibles
                                            </p>
                                        )}
                                    </div>

                                    <button
                                        onClick={() => handleDoctorSelect(medico)}
                                        disabled={medico.horarios.length === 0}
                                        className={`w-full py-2 rounded-lg transition-colors ${medico.horarios.length > 0
                                            ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                            }`}
                                    >
                                        {medico.horarios.length > 0 ? 'Seleccionar Médico' : 'Sin horarios disponibles'}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}


                {/* Step 3: Tipo de Cita, Fecha, Hora y Motivo */}
                {step === 3 && selectedDoctor && (
                    <div className="space-y-6">
                        <button
                            onClick={() => setStep(2)}
                            className="text-indigo-600 hover:text-indigo-800 mb-4"
                        >
                            ← Volver
                        </button>
                        <h2 className="text-2xl font-semibold text-gray-800">
                            Detalles de la Cita
                        </h2>
                        <div className="bg-indigo-50 p-4 rounded-lg">
                            <p className="font-semibold text-gray-800">
                                {selectedDoctor.nombre} {selectedDoctor.apellido}
                            </p>
                            <p className="text-gray-600">{selectedDoctor.especialidad}</p>
                        </div>

                        <div>
                            <label className="flex items-center space-x-2 text-gray-700 font-medium mb-3">
                                <FileText size={20} />
                                <span>Tipo de Cita</span>
                            </label>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {tipoCitaOpcion.map((tipo) => (
                                    <button
                                        key={tipo.tipocita}
                                        onClick={() => handleAppointmentTypeSelect(tipo.tipocita as PropsTipoCita)}
                                        className={`p-4 rounded-lg border-2 transition-all ${tipocita === tipo.tipocita
                                            ? 'border-indigo-600 bg-indigo-50'
                                            : 'border-gray-200 hover:border-indigo-300'
                                            }`}
                                    >
                                        <div className="text-center">
                                            <div className="font-semibold text-gray-800 mb-1">
                                                {tipo.tipocita}
                                            </div>
                                            <div className="text-sm text-gray-600 mb-2">
                                                {tipo.description}
                                            </div>
                                            <div className="flex items-center justify-center text-green-600 font-bold">
                                                <span>S/ {tipo.precio}</span>
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                        {/* Fecha y Hora */}
                        {tipocita && (
                            <div>
                                <label className="flex items-center space-x-2 text-gray-700 font-medium mb-3">
                                    <Calendar size={20} />
                                    <span>Fecha y Hora</span>
                                </label>
                                <div className="flex flex-wrap gap-4">
                                    {selectedDoctor.horarios.map((horario) => (
                                        <div key={horario.numero} className="border-2 border-gray-200 rounded-lg p-4">
                                            <div className="font-semibold text-gray-800 mb-3">
                                                {new Date(horario.fecha).toLocaleDateString('es-ES', {
                                                    weekday: 'long',
                                                    day: 'numeric',
                                                    month: 'long'
                                                })}
                                            </div>
                                            <div className="flex flex-col items-center gap-y-2">
                                                <button
                                                    onClick={() => handleScheduleSelect(horario)}
                                                    className={`p-2 rounded-lg border-2 transition-all ${selectedHorarioId?.numero === horario.numero
                                                        ? 'border-indigo-600 bg-indigo-50'
                                                        : 'border-gray-200 hover:border-indigo-300'
                                                        }`}
                                                >
                                                    <div className="text-center text-sm font-medium text-gray-800">
                                                        {horario.horaInicio} - {horario.horaFin}
                                                    </div>

                                                </button>
                                                <div className="text-center text-xs text-gray-600">
                                                    Consultorio: {horario.consultorio}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Motivo */}
                        {selectedHorarioId && (
                            <div>
                                <label className="flex items-center space-x-2 text-gray-700 font-medium mb-3">
                                    <FileText size={20} />
                                    <span>Motivo de la consulta</span>
                                </label>
                                <textarea
                                    value={motivo}
                                    onChange={(e) => setMotivo(e.target.value)}
                                    placeholder="Describe brevemente el motivo de tu consulta..."
                                    className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:outline-none"
                                    rows={4}
                                />
                                {selectedHorarioId && motivo && (
                                    <button
                                        onClick={handleConfirm}
                                        className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors text-lg font-semibold"
                                    >
                                        Confirmar Cita
                                    </button>
                                )}

                            </div>
                        )}

                    </div>
                )}



                {step === 4 && (
                    isLoadingCita ? (
                        <div className="text-center py-8">
                            <p className="text-gray-600">Confirmando tu cita...</p>
                        </div>
                    ) : errorCita ? (
                        <div className="text-center py-8">
                            <p className="text-red-600">Error al confirmar la cita. Por favor, intenta nuevamente.</p>
                        </div>
                    ) :

                        <BoletaCita Databoletacita={citaConfirmada} />
                )}

            </section>



        </main >
    )
}
