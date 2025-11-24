import { TituloCustom } from "../../components/common/titulos/tituloCustom"
import { useCitas } from "../../hooks/useCitas"
import { useMedicosPorEspecialidad } from "../../hooks/useMedicos";
import { usePacientes } from "../../hooks/usePaciente";
import { useHorarioMedico } from "../../hooks/useHorarioMedico";
import { useState } from "react";
import { Link } from "react-router-dom";
export function VistaListaCitas() {
    const { pacientes } = usePacientes();
    const { medicos } = useMedicosPorEspecialidad();
    const { horarios } = useHorarioMedico();
    const { ListaCitas, isLoadingCitas, error, CancelarCita } = useCitas();
    const [cancelando, setCancelando] = useState<number | null>(null);

    const handleCancelar = async (numero: number) => {
        if (!confirm('¿Estás seguro de cancelar esta cita?')) return;

        setCancelando(numero);
        try {
            await CancelarCita(numero);
            alert('Cita cancelada exitosamente');
        } catch (err) {
            alert('Error al cancelar la cita');
            console.error(err);
        } finally {
            setCancelando(null);
        }
    };
    return (
       <main>
    <TituloCustom titulo="Lista de todas las Citas" />
    
    {/* Contenedor Principal: Usa un padding más generoso y fondo blanco */}
    <section className="m-9 bg-white p-6 rounded-xl shadow-lg"> 
        {/* Manejo de estados de carga y error (sin cambios aquí, pero importante) */}
        {
            isLoadingCitas ? <p className="text-center py-4 text-gray-600">Cargando citas...</p> : 
            error ? <p className="text-center py-4 text-red-500">❌ Error al cargar las citas</p> : null
        }
        
        <h2 className="text-2xl font-bold text-gray-800 border-b pb-3 mb-4">Lista de Citas Pendientes</h2>
        
        {/* Contenedor de las Cards: usa una cuadrícula responsiva */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {ListaCitas?.map((cita) => (
                // La Tarjeta Individual (Card)
                <div 
                    key={cita.numero} 
                    className={`
                        flex flex-col rounded-xl overflow-hidden 
                        shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gray-50 
                        border-l-8 
                        ${cita.estado === "CANCELADA" ? "border-red-500" : cita.estado === "RESERVADA" ? "border-green-500" : "border-orange-500"}
                    `}
                >
                    <div className="p-5 flex flex-col gap-4">
                        
                        {/* 1. Encabezado de la Cita: Número, Fecha y Estado (barra lateral ya lo cubre) */}
                        <div className="flex justify-between items-start pb-2 border-b border-gray-200">
                            <div className="flex flex-col">
                                <span className="text-xs font-medium text-gray-500 uppercase">Cita N°</span>
                                <div className="text-3xl font-extrabold text-blue-800">{cita?.numero}</div>
                            </div>

                            <div className="flex flex-col items-end">
                                <div className="text-sm text-gray-600 flex items-center gap-1">
                                    <span role="img" aria-label="Calendario">📅</span> 
                                    {new Date(horarios?.find(horario => horario.numero == cita.horarioId)?.fecha).toLocaleDateString('es-ES', {
                                        timeZone: 'UTC', day: '2-digit', month: 'long', year: 'numeric'
                                    })}
                                </div>
                                <div className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                                    <span role="img" aria-label="Reloj">⏰</span> 
                                    {horarios?.find(horario => horario.numero == cita.horarioId)?.horaInicio} - {horarios?.find(horario => horario.numero == cita.horarioId)?.horaFin}
                                </div>
                            </div>
                        </div>

                        {/* 2. Detalles del Paciente y Médico */}
                        <ul className="text-sm space-y-2">
                            <li className="flex justify-between items-center border-b border-dashed pb-1">
                                <span className="font-semibold text-gray-700">👤 Paciente:</span>
                                <span className="text-gray-600 text-right">
                                    {pacientes?.find(paciente => paciente.numero == cita.pacienteId)?.nombre} {pacientes?.find(paciente => paciente.numero == cita.pacienteId)?.apellido}
                                </span>
                            </li>
                            <li className="flex justify-between items-center border-b border-dashed pb-1">
                                <span className="font-semibold text-gray-700">🆔 DNI:</span>
                                <span className="text-gray-600">{pacientes?.find(paciente => paciente.numero == cita.pacienteId)?.dni}</span>
                            </li>
                            <li className="flex justify-between items-center border-b border-dashed pb-1">
                                <span className="font-semibold text-gray-700">👨‍⚕️ Médico:</span>
                                <span className="text-gray-600 text-right">{medicos?.find(medico => medico.numero == cita.idDoctor)?.nombre}</span>
                            </li>
                            <li className="flex justify-between items-center">
                                <span className="font-semibold text-gray-700">🩺 Especialidad:</span>
                                <span className="text-gray-600 text-right">{medicos?.find(medico => medico.numero == cita.idDoctor)?.especialidad}</span>
                            </li>
                        </ul>

                        {/* 3. Indicador de Tipo y Costo */}
                        <div className="pt-3 border-t border-gray-200 flex justify-between items-end">
                            <div className="flex flex-col">
                                <span className="text-xs font-medium text-gray-500 uppercase">Tipo de Cita</span>
                                <span className="text-base font-semibold text-gray-700">{cita.tipoCita}</span>
                            </div>
                            <div className="flex flex-col items-end">
                                <span className="text-xs font-medium text-gray-500 uppercase">Costo</span>
                                <span className="text-3xl font-bold text-gray-800">S/{cita?.costo}</span>
                            </div>
                        </div>

                    </div>
                    
                    {/* 4. Pie de Página y Acciones (Separado y Alineado Abajo) */}
                    <div className="p-5 bg-white border-t border-gray-100 flex justify-between items-center">
                        
                        {/* Indicador de Estado (Movido a Pie de Página y con un diseño de 'tag') */}
                        <span className={`text-xs text-white font-bold py-1 px-3 rounded-full 
                            ${cita.estado === "CANCELADA" ? "bg-red-500" : cita.estado === "RESERVADA" ? "bg-green-500" : "bg-orange-500"}`
                        }>
                            {cita.estado}
                        </span>

                        {/* Acciones: Utiliza los botones mejorados de la respuesta anterior */}
                        <div className="inline-flex gap-3">
                            {/* Botón de Cancelar Cita (Acción Negativa/Peligro) */}
                            <button
                                className="bg-red-600 hover:bg-red-700 cursor-pointer rounded-lg text-white p-2 text-sm font-semibold shadow-md transition duration-150 ease-in-out
                                        disabled:opacity-50 disabled:cursor-not-allowed"
                                onClick={() => handleCancelar(cita.numero)}
                                disabled={cancelando === cita.numero || cita.estado === "CANCELADA"}
                            >
                                {cancelando === cita.numero ? 'Cancelando...' : 'Cancelar'} {/* Se acorta el texto por espacio */}
                            </button>

                            {/* Enlace para Atender Cita (Acción Primaria/Positiva) */}
                            <Link
                                className="bg-blue-500 hover:bg-blue-600 rounded-lg text-white p-2 text-sm font-semibold shadow-md transition duration-150 ease-in-out
                                        flex items-center justify-center"
                                to={`/dashboard/AtencionMedica/${cita.numero}`}
                            >
                                Atender
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </section>
</main>
    )
}