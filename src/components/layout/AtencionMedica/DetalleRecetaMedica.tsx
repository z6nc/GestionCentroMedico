import React, { useState, useRef } from 'react';
import { Plus, Trash2, Send, Pill, FileText, ClipboardList, ChevronDown } from 'lucide-react';

const CATALOGO_MEDICAMENTOS = [
    { id: 'med_1', nombre: 'Amoxicilina 500mg' },
    { id: 'med_2', nombre: 'Paracetamol 1g' },
    { id: 'med_3', nombre: 'Ibuprofeno 400mg' },
    { id: 'med_4', nombre: 'Loratadina 10mg' },
];
export const DetalleRecetaMedica = ({IDAtencionMedica}: { IDAtencionMedica: number }) => {
    // Estado del "Carrito"
    const [items, setItems] = useState([]);
    console.log("ID Atencion Medica en DetalleRecetaMedica:", IDAtencionMedica);
    // Estado del Formulario actual
    const [currentMed, setCurrentMed] = useState({ name: '', instructions: '' , cantidad: ''});

    // Referencia para devolver el foco al input principal después de agregar
    const nameInputRef = useRef(null);

    // Manejar cambios en los inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentMed({ ...currentMed, [name]: value });
    };

    // Agregar al carrito
    const addItem = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!currentMed.name.trim()) return; // Validación básica

        const newItem = {
            id: Date.now(), // ID único simple
            ...currentMed
        };

        setItems([...items, newItem]);
        setCurrentMed({ name: '', instructions: '', cantidad: '' }); // Limpiar form
        nameInputRef.current?.focus(); // UX: Regresar foco para seguir escribiendo rápido
    };

    // Eliminar del carrito
    const removeItem = (id: number) => {
        setItems(items.filter(item => item.id !== id));
    };

    // Enviar todo (Finalizar receta)
    const handleSubmit = () => {
        alert(`Enviando receta con ${items.length} medicamentos a farmacia/paciente.`);
        console.log("Payload:", items);
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
                <form onSubmit={addItem} className="flex flex-col gap-3">

                    {/* Input Nombre */}
                    <div>
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
                                    name="name"
                                    value={currentMed.name}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-slate-300 bg-white 
                 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none 
                 transition-all text-slate-800 appearance-none cursor-pointer
                 invalid:text-slate-400" // Truco para que el placeholder se vea gris
                                    required
                                >
                                    {/* Opción por defecto oculta y deshabilitada para actuar como placeholder */}
                                    <option value="" disabled hidden>
                                        Seleccione una opción...
                                    </option>

                                    {/* Mapeo del array de medicamentos */}
                                    {CATALOGO_MEDICAMENTOS.map((med) => (
                                        <option key={med.id} value={med.nombre} className="text-slate-800 py-2">
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
                    </div>
                    

                    {/* Input Instrucciones */}
                    <div className="flex gap-2">
                        <div className="flex-1 relative">
                            <FileText className="absolute left-3 top-3 text-slate-400" size={18} />
                            <input
                                type="text"
                                name="instructions"
                                value={currentMed.instructions}
                                onChange={handleChange}
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
                                onChange={handleChange}
                                placeholder="Ej. Cantidad: 20"
                                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-slate-800 placeholder:text-slate-400"
                                autoComplete="off"
                            />
                        </div>


                        {/* Botón de Acción Local (Agregar) */}
                        <button
                            type="submit"
                            disabled={!currentMed.name.trim()}
                            className="bg-slate-800 hover:bg-slate-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white p-2.5 rounded-lg transition-colors flex items-center justify-center min-w-[50px]"
                            title="Agregar a la lista"
                        >
                            <Plus size={24} />
                        </button>
                    </div>
                </form>
            </div>

            {/* ZONA 2: EL CARRITO (Lista de revisión) */}
            <div className="bg-white min-h-[150px]">
                {items.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center py-8 text-slate-400 border-b border-dashed border-slate-200">
                        <span className="text-sm italic">La receta está vacía</span>
                    </div>
                ) : (
                    <div>
                        <div className="px-4 py-2 bg-blue-50 text-blue-800 text-xs font-bold uppercase tracking-wider border-b border-blue-100 flex justify-between items-center">
                            <span>Medicamentos Agregados ({items.length})</span>
                        </div>
                        <ul className="divide-y divide-slate-100">
                            {items.map((item, index) => (
                                <li key={item.id} className="p-4 flex justify-between items-center group hover:bg-slate-50 transition-colors animate-in fade-in slide-in-from-top-2 duration-300">
                                    <div className="flex items-start gap-3 overflow-hidden">
                                        <span className="flex-shrink-0 bg-slate-100 text-slate-500 text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center mt-0.5">
                                            {index + 1}
                                        </span>
                                        <div className="min-w-0">
                                            <p className="text-slate-800 font-semibold text-sm truncate">{item.name}</p>
                                            <p className="text-slate-500 text-xs truncate">{item.instructions || "Sin instrucciones específicas"}</p>
                                            <p className="text-slate-400 text-xs italic">{item.cantidad || "Cantidad no especificada"}</p>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => removeItem(item.id)}
                                        className="text-slate-300 hover:text-red-500 p-2 transition-colors"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {/* FOOTER: Acción Final */}
            <div className="p-4 bg-slate-50 border-t border-slate-200">
                <button
                    onClick={handleSubmit}
                    disabled={items.length === 0}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2"
                >
                    <span>Generar Receta</span>
                    <Send size={18} />
                </button>
            </div>
        </div>
    );
};
