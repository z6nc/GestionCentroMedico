import React from 'react';
import type { AtencionMedicaSalida } from '../../../hooks/useAtencionMedica';
// Iconos (Simulados para no depender de librerías)
const AlertIcon = () => <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>;
const StethoscopeIcon = () => <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>; // Usando corazón como proxy visual
const PillIcon = () => <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>;

export  function DetalleAtencionMedica({ data } : { data: AtencionMedicaSalida }) {
    // Si no pasas data por props, usa la variable 'data' con el JSON que diste
   
    // Formatters
    const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString('es-PE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    const formatCurrency = (amount) => new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(amount);

    // Calcular edad simple
    const calcularEdad = (fechaNac) => {
        const hoy = new Date();
        const nacimiento = new Date(fechaNac);
        let edad = hoy.getFullYear() - nacimiento.getFullYear();
        const m = hoy.getMonth() - nacimiento.getMonth();
        if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) edad--;
        return edad;
    };

    return (
        <div className="bg-gray-50 min-h-screen p-6 font-sans text-slate-800">

            {/* --- HEADER SUPERIOR --- */}
            <div className="max-w-6xl mx-auto mb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">Atención #{data.idAtencionMedica}</span>
                        <span className={`text-xs font-bold px-2 py-1 rounded uppercase border ${data.estado === 'FINALIZADO' ? 'border-green-500 text-green-600 bg-green-50' : 'text-orange-600 border-orange-500'}`}>
                            {data.estado}
                        </span>
                    </div>
                    <h1 className="text-3xl font-bold text-slate-900">Resumen de Atención Médica</h1>
                    <p className="text-slate-500 text-sm mt-1 flex items-center gap-2">
                        📅 {formatDate(data.fechaAtencion)}
                    </p>
                </div>
                <div className="text-right">
                    <button className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium py-2 px-4 rounded-lg shadow-sm text-sm transition flex items-center gap-2">
                        🖨️ Imprimir Informe
                    </button>
                </div>
            </div>

            {/* --- GRID PRINCIPAL --- */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">

                {/* COLUMNA IZQUIERDA: Contexto del Paciente (3 spans) */}
                <div className="lg:col-span-3 space-y-6">
                    {/* Tarjeta Paciente */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="h-20 bg-gradient-to-r from-blue-500 to-cyan-400"></div>
                        <div className="px-5 pb-5 relative">
                            <div className="mt-10">
                                <h2 className="text-lg font-bold text-gray-900">{data.paciente.nombre} {data.paciente.apellido}</h2>
                                <p className="text-xs text-gray-500">DNI: {data.paciente.dni}</p>

                                <div className="mt-4 space-y-2 text-sm">
                                    <div className="flex justify-between border-b border-gray-100 pb-1">
                                        <span className="text-gray-500">Edad</span>
                                        <span className="font-medium">{calcularEdad(data.paciente.fechaNacimiento)} años</span>
                                    </div>
                                    <div className="flex justify-between border-b border-gray-100 pb-1">
                                        <span className="text-gray-500">Sangre</span>
                                        <span className="font-bold text-rose-500">{data.historiaMedica.tipoSangre}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Teléfono</span>
                                        <span className="font-medium text-gray-700">{data.paciente.telefono}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Alertas Médicas (Crucial UX: Colores de Alerta) */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Alertas Clínicas</h3>

                        <div className="space-y-3">
                            {/* Alergias */}
                            <div className={`p-3 rounded-lg border-l-4 ${data.historiaMedica.alergias ? 'bg-red-50 border-red-500' : 'bg-gray-50 border-gray-300'}`}>
                                <div className="flex items-center gap-2 mb-1">
                                    <AlertIcon />
                                    <span className="font-bold text-sm text-gray-800">Alergias</span>
                                </div>
                                <p className="text-sm text-gray-700">{data.historiaMedica.alergias || "Sin alergias registradas"}</p>
                            </div>

                            {/* Enfermedades Crónicas */}
                            <div className={`p-3 rounded-lg border-l-4 ${data.historiaMedica.enfermedadesCronicas ? 'bg-orange-50 border-orange-500' : 'bg-gray-50 border-gray-300'}`}>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-orange-500 font-bold">⚠️</span>
                                    <span className="font-bold text-sm text-gray-800">Crónicas</span>
                                </div>
                                <p className="text-sm text-gray-700">{data.historiaMedica.enfermedadesCronicas || "Sin registros"}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* COLUMNA CENTRAL: Resultado Clínico (6 spans - El núcleo) */}
                <div className="lg:col-span-6 space-y-6">

                    {/* Motivo de la Cita (Contexto breve) */}
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                        <span className="text-xs font-semibold text-gray-500 uppercase">Motivo de Consulta</span>
                        <p className="text-gray-800 font-medium mt-1">"{data.cita.motivo}"</p>
                    </div>

                    {/* Bloque: Diagnóstico */}
                    <div className="bg-white rounded-xl shadow-md border-t-4 border-blue-500 overflow-hidden">
                        <div className="bg-blue-50/50 p-4 border-b border-blue-100 flex items-center gap-2">
                            <StethoscopeIcon />
                            <h3 className="text-lg font-bold text-blue-900">Diagnóstico Médico</h3>
                        </div>
                        <div className="p-6">
                            <p className="text-lg text-gray-800 leading-relaxed font-medium">
                                {data.diagnostico}
                            </p>
                        </div>
                    </div>

                    {/* Bloque: Tratamiento */}
                    <div className="bg-white rounded-xl shadow-md border-t-4 border-emerald-500 overflow-hidden">
                        <div className="bg-emerald-50/50 p-4 border-b border-emerald-100 flex items-center gap-2">
                            <PillIcon />
                            <h3 className="text-lg font-bold text-emerald-900">Tratamiento e Indicaciones</h3>
                        </div>
                        <div className="p-6">
                            <div className="prose prose-emerald text-gray-700">
                                <p className="whitespace-pre-line text-base leading-relaxed">
                                    {data.tratamiento}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Antecedentes Familiares (Datos extra) */}
                    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                        <h4 className="text-sm font-bold text-gray-700 mb-2">🧬 Antecedentes Familiares</h4>
                        <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg italic">
                            {data.historiaMedica.antecedentesFamiliares || "No registrados"}
                        </p>
                    </div>
                </div>

                {/* COLUMNA DERECHA: Info Administrativa y Doctor (3 spans) */}
                <div className="lg:col-span-3 space-y-6">

                    {/* Card Médico */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Profesional a Cargo</h3>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold">
                                Dr
                            </div>
                            <div>
                                <p className="font-bold text-sm text-gray-900">Dr. {data.medico.nombre} {data.medico.apellido}</p>
                                <p className="text-xs text-blue-600 font-medium">{data.medico.especialidad}</p>
                            </div>
                        </div>
                        <div className="text-xs space-y-2 text-gray-500 border-t pt-3">
                            <p>CMP/DNI: {data.medico.dni}</p>
                            <p>Tel: {data.medico.telefono}</p>
                        </div>
                    </div>

                    {/* Detalles Financieros y Cita */}
                    <div className="bg-slate-800 text-slate-300 rounded-xl shadow-lg p-5">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Detalles de la Sesión</h3>

                        <div className="flex justify-between items-center mb-3">
                            <span className="text-sm">Modalidad</span>
                            <span className="text-white font-medium bg-slate-700 px-2 py-0.5 rounded text-xs">{data.cita.tipoCita}</span>
                        </div>
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-sm">ID Cita</span>
                            <span className="font-mono text-white">#{data.cita.numero}</span>
                        </div>

                        <div className="mt-6 pt-4 border-t border-slate-700 flex justify-between items-center">
                            <span className="text-sm font-medium">Costo Total</span>
                            <span className="text-2xl font-bold text-white">{formatCurrency(data.cita.costo)}</span>
                        </div>
                    </div>

                    {/* Listas vacías (Recetas / Análisis) - UX: Empty State */}
                    <div className="space-y-2">
                        {data.receta.length === 0 && (
                            <div className="p-3 border border-dashed border-gray-300 rounded-lg text-center">
                                <p className="text-xs text-gray-400">Sin recetas digitales adjuntas</p>
                            </div>
                        )}
                        {data.analisisClinico.length === 0 && (
                            <div className="p-3 border border-dashed border-gray-300 rounded-lg text-center">
                                <p className="text-xs text-gray-400">Sin análisis clínicos solicitados</p>
                            </div>
                        )}
                    </div>

                </div>

            </div>
        </div>
    );
}