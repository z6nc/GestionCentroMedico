
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { BuscarCitarPorId } from '../../hooks/useCitas';
import { usePacientePorID } from '../../hooks/usePaciente';
import { useBuscarHistoriaMedica } from '../../hooks/useHistoriaMedica';
import { AtencionMedicaPaciente } from '../../components/layout/AtencionMedica/atencionMedicaPaciente';
import { HistoriaPaciente } from '../../components/layout/AtencionMedica/historiaMedicaPaciente';
const ClipboardIcon = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>;
const FolderIcon = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z"></path></svg>;

export function VistaAtencionMedica() {
    const { id } = useParams(); // ID de la cita Medica desde la URL
    const { Cita, isLoadingCita, errorCita } = BuscarCitarPorId(Number(id) || 0);
    const { paciente, error: errorPaciente } = usePacientePorID(Cita ? String(Cita.pacienteId) : '');
    const { historiaMedica, errorHistoria, isLoadingHistoria } = useBuscarHistoriaMedica(Cita ? Cita.pacienteId : 0);
    const [isView, setIsView] = useState("historia");

    // 1. Datos Ficticios (Simulando lo que vendría de props o contexto)


    const BotonVistas = [
        { id: 'atencion', label: 'Nueva Atención', icon: <ClipboardIcon /> },
        { id: 'historia', label: 'Historia Clínica', icon: <FolderIcon /> },
    ];
    return (
        <main className="max-w-5xl mx-auto flex flex-col gap-y-6">
            <div className="flex justify-center">
                <div className="inline-flex bg-gray-100 p-1.5 rounded-xl shadow-inner border border-gray-200">
                    {BotonVistas.map((boton) => (
                        <button
                            key={boton.id}
                            onClick={() => setIsView(boton.id)}
                            className={`
                                flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ease-in-out
                                ${isView === boton.id
                                    ? 'bg-white text-blue-600 shadow-sm scale-100' // Estado Activo: "Elevado" y blanco
                                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50' // Estado Inactivo: Sutil
                                }
                            `}
                        >
                            {boton.icon}
                            {boton.label}
                        </button>
                    ))}
                </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm min-h-[400px] relative overflow-hidden">

                {isView === 'atencion' ? (
                    <div>
                        {isLoadingCita || isLoadingHistoria ? (
                            <div>Cargando datos de la cita y paciente...</div>
                        ) : errorCita || errorPaciente || errorHistoria ? (
                            <div>Error al cargar los datos.</div>
                        ) : Cita && paciente ? (
                            <AtencionMedicaPaciente Cita={Cita} historiaMedica={historiaMedica} paciente={paciente} />
                        ) : (
                            <div>No se encontró la cita o el paciente.</div>
                        )}
                    </div>
                ) : (
                    <div>
                        <HistoriaPaciente historiaMedica={historiaMedica} />
                    </div>
                )
                }
            </div>


        </main>
    )
}