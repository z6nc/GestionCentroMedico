import React, { useState, useRef } from 'react';
import { 
  Plus, 
  Save, 
  Microscope, // Icono distintivo para Lab
  FileText, 
  FlaskConical, // Icono para el select
  ChevronDown,
} from 'lucide-react';
import { CarritoAnalisisMedico } from './carritoAnalisisMedico';
import { useAgregarTipoAnalisis,useFinalizarAnalisis,useTipoAnalisis } from '../../../hooks/useAnalisisMedica';
import { useNavigate } from 'react-router-dom';
import { mutate } from 'swr';

export const DetalleAnalisisClinico = ({ IDANALISIS }: { IDANALISIS: number }) => {
  const [currentExam, setCurrentExam] = useState({ idAnalisis: 0, idTipo: 0  ,indicaciones:''});
  const selectRef = useRef(null);
  console.log("ID Atencion Medica en DetalleAnalisisClinico:", IDANALISIS);
  
  const navigate = useNavigate();
    const { tiposAnalisis } = useTipoAnalisis();
    const { agregarTipoAnalisis } = useAgregarTipoAnalisis();
    const { finalizarAnalisis, analisisFinalizado } = useFinalizarAnalisis(IDANALISIS);


     const handleAgregar = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevenir recarga de la página

        try {
            await agregarTipoAnalisis({
                idAnalisis: IDANALISIS,
                idTipo: currentExam.idTipo,
                indicaciones: currentExam.indicaciones
            });

            console.log("Medicamento agregado correctamente");

            // Limpiar el formulario después de agregar
            setCurrentExam({
                idAnalisis: 0,
                idTipo: 0,
                indicaciones: ''
            });

            // Devolver el foco al select de medicamentos
             mutate(`http://localhost:8198/gestionanalisis/ver/${IDANALISIS}`);
            selectRef.current?.focus();

        } catch (err) {
            console.error("Error al agregar:", err);
        }
    };

 const handleFinalizar = async () => {
        try {
            await finalizarAnalisis();
            console.log("Análisis finalizado:", analisisFinalizado);
            navigate('/dashboard/AnalisisAtencion/'+IDANALISIS);
        } catch (err) {
            console.error("Error al finalizar:", err);
        }
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
        <form onSubmit={handleAgregar} className="flex flex-col gap-3">
          
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
                value={currentExam.idTipo}
                onChange={(e) => setCurrentExam({
                                    ...currentExam,
                                    idTipo: Number(e.target.value) // Convertir a número
                                })}
                className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-slate-300 bg-white 
                           focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none 
                           transition-all text-slate-800 appearance-none cursor-pointer
                           invalid:text-slate-400"
                required
              >
                <option value="" disabled hidden>Seleccione análisis...</option>
                {tiposAnalisis.map((item) => (
                  <option key={item.idTipo} value={item.idTipo} className="text-slate-800 py-1">
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
                name="indicaciones"
                value={currentExam.indicaciones}
                onChange={(e) => setCurrentExam({
                                    ...currentExam,
                                    indicaciones: e.target.value
                                })}
                placeholder="Ind. (Ej. Ayuno 8hrs / Descarte)"
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all text-slate-800 placeholder:text-slate-400"
                autoComplete="off"
              />
            </div>
            
            {/* Botón Agregar */}
            <button
              type="submit"
              className="bg-slate-800 hover:bg-slate-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white p-2.5 rounded-lg transition-colors flex items-center justify-center min-w-[50px] shadow-sm"
              title="Agregar Análisis"
            >
              <Plus size={24} />
            </button>
          </div>
        </form>
      </div>

      {/* LISTA / CARRITO */}
    
       <CarritoAnalisisMedico IDANALISIS={IDANALISIS} />
      {/* FOOTER */}
      <div className="p-4 bg-slate-50 border-t border-slate-200">
        <button
          onClick={handleFinalizar}
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
