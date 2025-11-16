import { useParams } from "react-router-dom";
import { TituloCustom } from "../../components/common/titulos/tituloCustom";
import { useState } from "react";
import { useMedicosPorEspecialidad } from "../../hooks/useMedicos";
import { usePacientes } from "../../hooks/usePaciente";
import { Fragment } from 'react';
import { User } from "lucide-react";

type PropsTipoCita = 'EMERGENCIA' | 'CONTROL' | 'TELECONSULTA' | 'CONSULTA' | 'PRESENCIAL';
const especialidades = ['Cardiologia', 'Dermatologia', 'Psiquiatria', 'Medicina General', 'Pediatria'];  

export function VistaCitas() {
    const { pacienteId } = useParams();
    const { medicos } = useMedicosPorEspecialidad();
    const { pacientes } = usePacientes();
    const EncontrarPaciente = pacientes?.find(paciente => paciente.numero === Number(pacienteId));

    const [step, setStep] = useState(1);

    const [selectedEspecialidad, setSelectedEspecialidad] = useState('');
    const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);

    const [selectedHorarioId, setSelectedHorarioId] = useState<number>(0);

    const [tipocita, setTipocita] = useState<PropsTipoCita | ''>('');

    const [motivo, setMotivo] = useState('');
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
                                    onClick={() => setSelectedEspecialidad(especialidad)}
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


            </section>



        </main>
    )
}
