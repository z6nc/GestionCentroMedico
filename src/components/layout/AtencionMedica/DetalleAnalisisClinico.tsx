import React, { useState, useRef } from 'react';
import { 
  Plus, 
  Trash2, 
  Save, 
  Microscope, // Icono distintivo para Lab
  FileText, 
  FlaskConical, // Icono para el select
  ChevronDown,
  Activity
} from 'lucide-react';

// Simulación de tu base de datos de análisis
const CATALOGO_ANALISIS = [
  { id: 'an_1', nombre: 'Hemograma Completo' },
  { id: 'an_2', nombre: 'Glucosa en Ayunas' },
  { id: 'an_3', nombre: 'Perfil Lipídico' },
  { id: 'an_4', nombre: 'Urocultivo' },
  { id: 'an_5', nombre: 'Creatinina' },
];

export const DetalleAnalisisClinico = ({ IDAtencionMedica }: { IDAtencionMedica: number }) => {
  const [items, setItems] = useState([]);
  const [currentExam, setCurrentExam] = useState({ type: '', notes: '' });
  const selectRef = useRef(null);
  console.log("ID Atencion Medica en DetalleAnalisisClinico:", IDAtencionMedica);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentExam({ ...currentExam, [name]: value });
  };

  const addItem = (e) => {
    e.preventDefault();
    if (!currentExam.type) return;

    const newItem = {
      id: Date.now(),
      ...currentExam
    };

    setItems([...items, newItem]);
    setCurrentExam({ type: '', notes: '' });
    selectRef.current?.focus(); // Regresar foco al select para flujo rápido
  };

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleSave = () => {
    console.log("Solicitud de Laboratorio:", items);
    // Aquí tu lógica para guardar
  };

  return (
    <div className="max-w-lg mx-auto bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden font-sans">
      
      {/* HEADER: Diferenciado con color Teal para Laboratorio */}
      <div className="bg-teal-700 p-4 flex items-center justify-between text-white">
        <div className="flex items-center gap-2">
          <Microscope size={22} className="text-teal-300" />
          <h2 className="font-semibold tracking-wide">Solicitud de Laboratorio</h2>
        </div>
        <div className="text-xs bg-teal-800 border border-teal-600 px-2 py-1 rounded text-teal-100">
          Lab. Clínico
        </div>
      </div>

      {/* FORMULARIO */}
      <div className="bg-slate-50 p-5 border-b border-slate-200">
        <form onSubmit={addItem} className="flex flex-col gap-3">
          
          {/* SELECT: Tipo de Análisis */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1">
              Tipo de Análisis
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                <FlaskConical size={18} />
              </div>
              
              <select
                ref={selectRef}
                name="type"
                value={currentExam.type}
                onChange={handleChange}
                className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-slate-300 bg-white 
                           focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none 
                           transition-all text-slate-800 appearance-none cursor-pointer
                           invalid:text-slate-400"
                required
              >
                <option value="" disabled hidden>Seleccione análisis...</option>
                {CATALOGO_ANALISIS.map((item) => (
                  <option key={item.id} value={item.nombre} className="text-slate-800 py-1">
                    {item.nombre}
                  </option>
                ))}
              </select>
              
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
                <ChevronDown size={16} />
              </div>
            </div>
          </div>

          {/* INPUT: Información Adicional (Notas Clínicas) */}
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <FileText className="absolute left-3 top-3 text-slate-400" size={18} />
              <input
                type="text"
                name="notes"
                value={currentExam.notes}
                onChange={handleChange}
                placeholder="Ind. (Ej. Ayuno 8hrs / Descarte)"
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all text-slate-800 placeholder:text-slate-400"
                autoComplete="off"
              />
            </div>
            
            {/* Botón Agregar */}
            <button
              type="submit"
              disabled={!currentExam.type}
              className="bg-slate-800 hover:bg-slate-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white p-2.5 rounded-lg transition-colors flex items-center justify-center min-w-[50px] shadow-sm"
              title="Agregar Análisis"
            >
              <Plus size={24} />
            </button>
          </div>
        </form>
      </div>

      {/* LISTA / CARRITO */}
      <div className="bg-white min-h-[150px]">
        {items.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center py-10 text-slate-400">
            <Activity size={40} className="mb-2 opacity-20" />
            <span className="text-sm italic">Sin exámenes solicitados</span>
          </div>
        ) : (
          <div>
            <div className="px-4 py-2 bg-teal-50 text-teal-800 text-xs font-bold uppercase tracking-wider border-b border-teal-100 flex justify-between items-center">
              <span>Exámenes ({items.length})</span>
            </div>
            <ul className="divide-y divide-slate-100">
              {items.map((item, index) => (
                <li key={item.id} className="p-4 flex justify-between items-center group hover:bg-slate-50 transition-colors animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="flex items-start gap-3 overflow-hidden">
                    {/* Badge numérico en Teal */}
                    <span className="flex-shrink-0 bg-teal-100 text-teal-700 text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center mt-0.5 border border-teal-200">
                      {index + 1}
                    </span>
                    <div className="min-w-0">
                      <p className="text-slate-800 font-semibold text-sm truncate">{item.type}</p>
                      {item.notes ? (
                        <p className="text-slate-500 text-xs truncate flex items-center gap-1">
                           <span className="font-medium">Nota:</span> {item.notes}
                        </p>
                      ) : (
                         <p className="text-slate-400 text-xs italic">Sin observaciones</p>
                      )}
                    </div>
                  </div>
                  
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-slate-300 hover:text-red-500 hover:bg-red-50 p-2 rounded-md transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* FOOTER */}
      <div className="p-4 bg-slate-50 border-t border-slate-200">
        <button
          onClick={handleSave}
          disabled={items.length === 0}
          // Nota el cambio de color a Teal-600 para el botón principal
          className="w-full bg-teal-600 hover:bg-teal-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2"
        >
          <Save size={18} />
          <span>Guardar Solicitud</span>
        </button>
      </div>
    </div>
  );
};
