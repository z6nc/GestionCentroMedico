import { useState, useRef } from 'react';
import { Plus, Pill, FileText, ClipboardList, ChevronDown, Send } from 'lucide-react';
import { useAgregarMedicamento, useFinalizarReceta, useMedicamentos } from '../../../hooks/useRecetaMedica';
import { CarritoRecetaMedica } from './carritoRecetaMedica';
import { mutate } from 'swr';
import { useNavigate } from 'react-router-dom';
export const DetalleRecetaMedica = ({ IDRECETA }: { IDRECETA: number }) => {
     const navigate = useNavigate();
    const { medicamentos } = useMedicamentos();
    const { agregarMedicamento } = useAgregarMedicamento();
    const { finalizarReceta, recetaFinalizada } = useFinalizarReceta(IDRECETA);
    console.log("Medicamentos cargados:", medicamentos);


    console.log("ID Atencion Medica en DetalleRecetaMedica:", IDRECETA);
    // Estado del Formulario actual
    const [currentMed, setCurrentMed] = useState({ idReceta: 0, idMedicamento: 0, indicaciones: '', cantidad: 0 });

    // Referencia para devolver el foco al input principal después de agregar
    const nameInputRef = useRef(null);


    // Enviar todo (Finalizar receta)


    const handleAgregar = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevenir recarga de la página

        try {
            await agregarMedicamento({
                idReceta: IDRECETA,
                idMedicamento: currentMed.idMedicamento,
                cantidad: currentMed.cantidad,
                indicaciones: currentMed.indicaciones
            });

            console.log("Medicamento agregado correctamente");

            // Limpiar el formulario después de agregar
            setCurrentMed({
                idReceta: 0,
                idMedicamento: 0,
                indicaciones: '',
                cantidad: 0
            });

            // Devolver el foco al select de medicamentos
             mutate(`http://localhost:8196/gestionreceta/ver/${IDRECETA}`);
            nameInputRef.current?.focus();

        } catch (err) {
            console.error("Error al agregar:", err);
        }
    };


    const handleFinalizar = async () => {
        try {
            await finalizarReceta();
            console.log("Receta finalizada:", recetaFinalizada);
            navigate('/dashboard/RecetaAtencion/'+IDRECETA);
        } catch (err) {
            console.error("Error al finalizar:", err);
        }
    };


    return (
        <div className="max-w-lg mx-auto bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden font-sans">

            {/* HEADER */}
            <div className="bg-slate-800 p-4 flex items-center justify-between text-white">
                <div className="flex items-center gap-2">
                    <ClipboardList size={20} className="text-blue-400" />
                    <h2 className="font-semibold tracking-wide">Nueva Receta Médica</h2>
                </div>

            </div>

            {/* ZONA 1: EL FORMULARIO (Agregar items) */}
            <div className="bg-slate-50 p-5 border-b border-slate-200">
                <form onSubmit={handleAgregar} className="flex flex-col gap-3">

                    {/* Input Nombre */}
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1">
                            Seleccionar Medicamento
                        </label>
                        <div className="relative">
                            {/* Icono izquierdo (Píldora) */}
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                                <Pill size={18} />
                            </div>

                            <select
                                ref={nameInputRef}
                                name="idMedicamento"
                                value={currentMed.idMedicamento}
                                onChange={(e) => setCurrentMed({
                                    ...currentMed,
                                    idMedicamento: Number(e.target.value) // Convertir a número
                                })}
                                className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-slate-300 bg-white 
                                focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none 
                                transition-all text-slate-800 appearance-none cursor-pointer
                                invalid:text-slate-400"
                                required
                            >
                                {/* Opción por defecto */}
                                <option value={0} disabled hidden>
                                    Seleccione una opción...
                                </option>

                                {/* Mapeo del array de medicamentos */}
                                {medicamentos.map((med) => (
                                    <option
                                        key={med.idMedicamento}
                                        value={med.idMedicamento}
                                        className="text-slate-800 py-2"
                                    >
                                        {med.nombre}
                                    </option>
                                ))}
                            </select>

                            {/* Icono derecho personalizado (Flecha) */}
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
                                <ChevronDown size={16} />
                            </div>
                        </div>
                    </div>
                    {/* Input Instrucciones */}
                    <div className="flex gap-2">
                        <div className="flex-1 relative">
                            <FileText className="absolute left-3 top-3 text-slate-400" size={18} />
                            <input
                                type="text"
                                name="indicaciones"
                                value={currentMed.indicaciones}
                                onChange={(e) => setCurrentMed({ ...currentMed, indicaciones: e.target.value })}
                                placeholder="Ej. Tomar 1 cada 8 horas por 5 días"
                                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-slate-800 placeholder:text-slate-400"
                                autoComplete="off"
                            />
                        </div>
                        <div className="flex-1 relative">
                            <FileText className="absolute left-3 top-3 text-slate-400" size={18} />
                            <input
                                type="text"
                                name="cantidad"
                                value={currentMed.cantidad}
                                onChange={(e) => setCurrentMed({ ...currentMed, cantidad: Number(e.target.value) })}
                                placeholder="Ej. Cantidad: 20"
                                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-slate-800 placeholder:text-slate-400"
                                autoComplete="off"
                            />
                        </div>


                        {/* Botón de Acción Local (Agregar) */}
                        <button
                            type="submit"
                            className="bg-slate-800 hover:bg-slate-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white p-2.5 rounded-lg transition-colors flex items-center justify-center min-w-[50px]"
                            title="Agregar a la lista"
                        >
                            <Plus size={24} />
                        </button>
                    </div>
                </form>
            </div>

            {/* ZONA 2: EL CARRITO (Lista de revisión) */}
            <CarritoRecetaMedica IDRECETA={IDRECETA} />

            {/* FOOTER: Acción Final */}
            <div className="p-4 bg-slate-50 border-t border-slate-200">
                <button
                    onClick={handleFinalizar}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2"
                >
                    <span>Generar Receta</span>
                    <Send size={18} />
                </button>
            </div>
        </div>
    );
};
