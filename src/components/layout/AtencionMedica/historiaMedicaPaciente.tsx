import React from 'react';
import type { HistoriaMedicaProps } from '../../../schema/historiaMedica.schema';

// Iconos SVG inline para no depender de librerías externas
const BloodIcon = () => <svg className="w-8 h-8 text-rose-500" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C12 2 5 9.8 5 14.2C5 18.5 8.1 22 12 22C15.9 22 19 18.5 19 14.2C19 9.8 12 2 12 2ZM12 19C10.3 19 9 17.7 9 16C9 14.3 10.3 13 12 13C13.7 13 15 14.3 15 16C15 17.7 13.7 19 12 19Z"/></svg>;
const AlertIcon = () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>;
const CheckIcon = () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>;
const HistoryIcon = () => <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>;

export  function HistoriaPaciente({historiaMedica}: {historiaMedica?: HistoriaMedicaProps}) {
    
   

    // Helper para formatear fecha
    // const formatDate = (dateString : string) => {
    //     if (!dateString) return 'Fecha no registrada';
    //     return new Date(dateString).toLocaleDateString('es-PE', { year: 'numeric', month: 'long', day: 'numeric' });
    // };

    return (
        <div className="flex justify-center items-start min-h-screen bg-gray-50 p-6">
            
            <div className="bg-white w-full max-w-4xl shadow-xl rounded-2xl overflow-hidden border border-gray-100">
                
                {/* --- HEADER: Identificación --- */}
                <header className="bg-slate-900 text-white p-6 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Historia Clínica Digital</h1>
                        <p className="text-slate-400 text-sm mt-1">ID Expediente: <span className="font-mono text-white bg-slate-700 px-2 py-0.5 rounded">{historiaMedica?.idHistoriaMedica || 'N/A'}</span></p>
                    </div>
                    <div className="text-right hidden sm:block">
                        <p className="text-xs text-slate-400 uppercase tracking-wide">Fecha de Creación</p>
                        {/* <p className="text-sm font-medium">{formatDate(historiaMedica?.fechaCreacion)}</p> */}
                    </div>
                </header>

                <div className="p-8">
                    
                    {/* --- SECCIÓN 1: DATOS CRÍTICOS (HERO) --- */}
                    {/* Usamos Grid para destacar el Tipo de Sangre separadamente de las Alertas */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        
                        {/* CARD TIPO DE SANGRE (Diseño visual impactante) */}
                        <div className="bg-gradient-to-br from-rose-50 to-white border border-rose-100 rounded-xl p-5 flex flex-col items-center justify-center shadow-sm text-center relative overflow-hidden group">
                            <div className="absolute -right-4 -top-4 bg-rose-100 w-20 h-20 rounded-full opacity-50 group-hover:scale-110 transition-transform"></div>
                            <BloodIcon />
                            <span className="text-xs font-bold text-rose-400 uppercase mt-2 tracking-wider">Tipo de Sangre</span>
                            <span className="text-4xl font-black text-slate-800 mt-1">{historiaMedica?.tipoSangre}</span>
                        </div>

                        {/* CARD ALERGIAS (Lógica condicional de color) */}
                        <div className={`rounded-xl p-5 border flex flex-col shadow-sm justify-start
                            ${historiaMedica?.alergias 
                                ? 'bg-red-50 border-red-200' // Peligro si hay alergias
                                : 'bg-green-50 border-green-200' // Seguro si no hay
                            }`}>
                            <div className="flex items-center gap-2 mb-2">
                                <div className={`p-1.5 rounded-full ${historiaMedica?.alergias ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                                    {historiaMedica?.alergias ? <AlertIcon /> : <CheckIcon />}
                                </div>
                                <h3 className={`font-bold ${historiaMedica?.alergias ? 'text-red-800' : 'text-green-800'}`}>Alergias</h3>
                            </div>
                            <p className={`text-lg font-medium leading-tight ${historiaMedica?.alergias ? 'text-red-900' : 'text-green-800'}`}>
                                {historiaMedica?.alergias || "Ninguna conocida"}
                            </p>
                            {historiaMedica?.alergias && <span className="text-xs text-red-500 mt-2 font-semibold uppercase">⚠️ Atención Requerida</span>}
                        </div>

                        {/* CARD ENFERMEDADES CRÓNICAS */}
                        <div className={`rounded-xl p-5 border flex flex-col shadow-sm justify-start
                            ${historiaMedica?.enfermedadesCronicas 
                                ? 'bg-orange-50 border-orange-200' 
                                : 'bg-gray-50 border-gray-200'
                            }`}>
                            <div className="flex items-center gap-2 mb-2">
                                <div className={`p-1.5 rounded-full ${historiaMedica?.enfermedadesCronicas ? 'bg-orange-100 text-orange-600' : 'bg-gray-200 text-gray-500'}`}>
                                    <HistoryIcon />
                                </div>
                                <h3 className={`font-bold ${historiaMedica?.enfermedadesCronicas ? 'text-orange-800' : 'text-gray-700'}`}>Enfermedades Crónicas</h3>
                            </div>
                            <p className={`text-lg font-medium leading-tight ${historiaMedica?.enfermedadesCronicas ? 'text-orange-900' : 'text-gray-600'}`}>
                                {historiaMedica?.enfermedadesCronicas || "Sin registro previo"}
                            </p>
                        </div>
                    </div>

                    <hr className="border-gray-100 my-8" />

                    {/* --- SECCIÓN 2: DETALLES E HISTORIAL (Layout limpio de lectura) --- */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                        
                        {/* Columna Izquierda: Antecedentes */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                                <span className="w-1 h-6 bg-blue-500 rounded-full"></span>
                                Antecedentes Familiares
                            </h3>
                            <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 text-slate-700 leading-relaxed">
                                {historiaMedica?.antecedentesFamiliares ? (
                                    <p>{historiaMedica.antecedentesFamiliares}</p>
                                ) : (
                                    <p className="text-slate-400 italic">No se han registrado antecedentes familiares.</p>
                                )}
                            </div>
                        </div>

                        {/* Columna Derecha: Observaciones/Mensaje */}
                        {/* <div className="space-y-4">
                            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                                <span className="w-1 h-6 bg-purple-500 rounded-full"></span>
                                Notas y Observaciones
                            </h3>
                            <div className="bg-purple-50 p-4 rounded-lg border border-purple-100 text-slate-700 leading-relaxed">
                                {historiaMedica?.mensaje ? (
                                    <p>{historiaMedica.mensaje}</p>
                                ) : (
                                    <p className="text-slate-400 italic">Sin notas adicionales.</p>
                                )}
                            </div>
                        </div> */}
                    </div>
                </div>

                {/* --- FOOTER: ID Paciente y acciones de solo lectura --- */}
                <div className="bg-gray-50 px-8 py-4 border-t border-gray-200 flex justify-between items-center">
                    <div className="text-xs text-gray-500">
                        Paciente ID interno: <span className="font-mono font-bold">{historiaMedica?.pacienteId}</span>
                    </div>
                    
                    {/* Botón estético "Imprimir" o "Exportar" (común en vistas de solo lectura) */}
                    <button className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
                        Imprimir Ficha
                    </button>
                </div>

            </div>
        </div>
    );
}