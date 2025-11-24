import type { CitaDTO } from "../../../hooks/useHistoriaMedica";
import type { Paciente } from "../../../schema/paciente.schema";
import type { HistoriaMedicaProps } from "../../../schema/historiaMedica.schema";
import { CalendarIcon, FileTextIcon, UserIcon } from "lucide-react";
import type { AtencionMedicaEntrada } from "../../../hooks/useAtencionMedica";
import { useGuardarAtencionMedica } from "../../../hooks/useAtencionMedica";
import { toast } from "react-toastify";
import { useState } from "react";
import { ModalCustom } from "../../common/Modal/modalCustom";
import { DetalleAtencionMedica } from "./detalleAtencionMedica";
interface AtencionMedicaProps {
    Cita: CitaDTO | (Omit<CitaDTO, 'dniPaciente'> & { dniPaciente: string | null });
    historiaMedica: HistoriaMedicaProps;
    paciente: Paciente;
}

export const AtencionMedicaPaciente = ({ Cita, historiaMedica, paciente }: AtencionMedicaProps) => {
    // 2. LLAMADA AL HOOK (Destructuring)
    const { guardarAtencion, cargando, errorGuardado, atencionGuardada } = useGuardarAtencionMedica();
    const [modalAbierto, setModalAbierto] = useState(false);

    // 3. Estado del Formulario Local
    const [formulario, setFormulario] = useState({
        fechaAtencion: new Date().toISOString().slice(0, 16), // Truco para input datetime-local
        diagnostico: "",
        tratamiento: "",
        estado: "EN PROCESO"
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormulario({
            ...formulario,
            [e.target.name]: e.target.value
        });
    };

    // 4. FUNCIÓN DE ENVÍO ASÍNCRONA
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validaciones básicas antes de enviar
        if (!formulario.diagnostico || !formulario.tratamiento) {
            alert("Por favor complete el diagnóstico y tratamiento");
            return;
        }

        // Construcción del Payload (Adaptando tus datos a la Interfaz del Hook)
        const payload: AtencionMedicaEntrada = {
            idCita: Cita?.numero || 0,
            idHistoriaMedica: historiaMedica?.idHistoriaMedica || 0,
            idPaciente: paciente?.numero || 0,
            idMedico: Number(Cita?.idDoctor) || 0,

            // Usamos la fecha actual exacta del envío, o la del formulario convertida a ISO
            fechaAtencion: new Date().toISOString(),

            diagnostico: formulario.diagnostico,
            tratamiento: formulario.tratamiento,
            estado: "FINALIZADO"
        };

        try {
            // Ejecutamos la mutación del hook
            await guardarAtencion(payload);
            toast.success("Atención médica guardada exitosamente.");
            // (Opcional) Limpiar formulario o lógica adicional
            setFormulario({ ...formulario, diagnostico: "", tratamiento: "" });
            
        } catch (error) {
            console.error("Error capturado en el componente:", error);
            // No necesitas hacer mucho aquí, 'errorGuardado' del hook ya tiene el error para mostrarlo
            toast.error("Error al guardar la atención médica.");
        }
    };
    
    console.log("Atención médica guardada:", atencionGuardada);
    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4 flex justify-center items-start">
            <div className="max-w-4xl w-full bg-white rounded-xl shadow-xl overflow-hidden">

                {/* --- HEADER: Contexto del Paciente (Solo Lectura) --- */}
                <div className="bg-slate-800 p-6 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <UserIcon />
                            Registro de Atención Médica
                        </h2>
                        <p className="text-slate-400 text-sm mt-1">
                            Historia Clínica: <span className="font-mono text-white">{historiaMedica?.idHistoriaMedica}</span>
                        </p>
                    </div>

                    {/* Tarjeta de Resumen Paciente */}
                    <div className="bg-slate-700/50 p-3 rounded-lg border border-slate-600 flex items-center gap-4">
                        <div className="h-10 w-10 bg-blue-500 rounded-full flex items-center justify-center font-bold text-lg">
                            {paciente?.nombre.charAt(0)}
                        </div>
                        <div>
                            <p className="font-semibold">{paciente?.nombre}</p>
                            <p className="text-xs text-slate-300">Edad: {paciente?.dni}  | Cita: {Cita?.numero}</p>
                        </div>
                    </div>
                </div>

                {/* --- BODY: Formulario --- */}
                <form onSubmit={handleSubmit} className="p-8 space-y-8">

                    {/* Sección 1: Datos Generales */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Fecha Atención */}
                        <div className="col-span-1">
                            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                <CalendarIcon /> Fecha y Hora de Atención
                            </label>
                            <input
                                type="datetime-local"
                                name="fechaAtencion"
                                value={formulario.fechaAtencion}
                                onChange={handleChange}
                                className="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 transition p-2.5 bg-gray-50"
                            />
                        </div>

                        {/* Estado de la Atención */}
                        <div className="col-span-1">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Estado Actual</label>
                            <select
                                name="estado"
                                value={formulario.estado}
                                onChange={handleChange}
                                className={`w-full rounded-lg shadow-sm border-gray-300 p-2.5 font-medium transition cursor-pointer focus:ring focus:ring-opacity-50
                                            ${formulario.estado === 'FINALIZADO'
                                        ? 'bg-green-50 text-green-700 border-green-300 focus:border-green-500 focus:ring-green-200'
                                        : 'bg-yellow-50 text-yellow-700 border-yellow-300 focus:border-yellow-500 focus:ring-yellow-200'
                                    }`}
                            >
                                <option value="EN_PROCESO">⏳ En Proceso</option>
                                <option value="FINALIZADO">✅ Finalizado</option>
                            </select>
                        </div>
                    </div>

                    <hr className="border-gray-100" />

                    {/* Sección 2: Datos Clínicos (El núcleo de la UX) */}
                    <div className="space-y-6">



                        {/* Diagnóstico y Tratamiento */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Diagnóstico */}
                            <div className="flex flex-col h-full">
                                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                    <FileTextIcon /> Diagnóstico
                                </label>
                                <textarea
                                    name="diagnostico"
                                    placeholder="Ej. Faringitis Aguda..."
                                    value={formulario.diagnostico}
                                    onChange={handleChange}
                                    className="w-full flex-grow border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 transition p-3 bg-blue-50/30"
                                    rows={5}
                                ></textarea>
                            </div>

                            {/* Tratamiento (Destacado visualmente) */}
                            <div className="flex flex-col h-full">
                                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                    💊 Tratamiento e Indicaciones
                                </label>
                                <textarea
                                    name="tratamiento"
                                    placeholder="Detallar medicamentos, dosis y cuidados..."
                                    value={formulario.tratamiento}
                                    onChange={handleChange}
                                    className="w-full flex-grow border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 transition p-3 bg-indigo-50/30"
                                    rows={5}
                                ></textarea>
                            </div>
                        </div>
                        <div className="pt-6 border-t border-gray-100 flex items-center justify-start gap-4">

                            {/* Botón: Solicitar Análisis */}
                            <button
                                type="button" // Cambiado a 'button' si abre un modal
                                className="
                group flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ease-in-out shadow-sm
                bg-purple-50 text-purple-700 border border-purple-200
                hover:bg-purple-100 hover:border-purple-300 hover:shadow-md
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500
                active:scale-95
            "
                            >

                                Solicitar Análisis
                            </button>

                            {/* Botón: Generar Receta */}
                            <button
                                type="button" // Ojo: 'submit' enviaría todo el formulario principal. Si esto abre algo, usa 'button'
                                className="
                group flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ease-in-out shadow-sm
                bg-teal-50 text-teal-700 border border-teal-200
                hover:bg-teal-100 hover:border-teal-300 hover:shadow-md
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500
                active:scale-95
            "
                            >

                                Generar Receta
                            </button>

                        </div>
                    </div>

                    {/* --- FOOTER: Acciones --- */}
                    <div className="pt-6 border-t border-gray-100  flex items-center justify-end gap-4">
                        <button
                            type="button"
                            className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-8 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition transform active:scale-95"
                        >
                            Guardar Atención Médica
                        </button>
                    </div>

                </form>
                {atencionGuardada && (
                    // 1. Contenedor: Maneja la línea divisoria y el espaciado general
                    <div className="p-6 mt-6 border-t border-gray-100 w-full flex justify-start animate-fade-in-up">

                        {/* 2. Botón: Diseño sólido y atractivo */}
                        <button
                            onClick={() => setModalAbierto(true)}
                            className="
                group flex items-center gap-2 px-6 py-3 
                bg-indigo-600 text-white text-sm font-semibold rounded-lg shadow-md 
                hover:bg-indigo-700 hover:shadow-lg hover:-translate-y-0.5
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                transition-all duration-200 ease-in-out
            "
                        >
                           

                            Ver Detalle de Atención
                        </button>
                    </div>
                )}
            </div>
            <ModalCustom isOpen={modalAbierto} onClose={() => setModalAbierto(false)} title="Modal de Análisis Clínicos">
                {atencionGuardada ? (
                    <DetalleAtencionMedica data={atencionGuardada} />
                ) : (
                    <p>No hay datos de atención médica guardados para mostrar.</p>
                )}
            </ModalCustom>
        </div>
    );
}