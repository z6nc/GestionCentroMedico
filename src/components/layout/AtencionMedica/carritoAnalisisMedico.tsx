import { Trash2 ,Activity} from "lucide-react";
import { useVerAnalisis } from "../../../hooks/useAnalisisMedica";
export const CarritoAnalisisMedico = ({ IDANALISIS }:{ IDANALISIS: number }) => {
      const { analisis, isLoading, isError, error } = useVerAnalisis(IDANALISIS);
        if (isLoading) return <div>Cargando receta...</div>;
        if (isError) return <div>Error: {error?.message}</div>;
    return(
  <div className="bg-white min-h-[150px]">
        {analisis?.detalles.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center py-10 text-slate-400">
            <Activity size={40} className="mb-2 opacity-20" />
            <span className="text-sm italic">Sin exámenes solicitados</span>
          </div>
        ) : (
          <div>
            <div className="px-4 py-2 bg-teal-50 text-teal-800 text-xs font-bold uppercase tracking-wider border-b border-teal-100 flex justify-between items-center">
              <span>Exámenes ({analisis?.detalles.length})</span>
            </div>
            <ul className="divide-y divide-slate-100">
              {analisis?.detalles.map((item, index) => (
                <li key={item.idDetalle} className="p-4 flex justify-between items-center group hover:bg-slate-50 transition-colors animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="flex items-start gap-3 overflow-hidden">
                    {/* Badge numérico en Teal */}
                    <span className="flex-shrink-0 bg-teal-100 text-teal-700 text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center mt-0.5 border border-teal-200">
                      {index + 1}
                    </span>
                    <div className="min-w-0">
                      <p className="text-slate-800 font-semibold text-sm truncate">{item.nombreTipo}</p>
                      {item.indicaciones ? (
                        <p className="text-slate-500 text-xs truncate flex items-center gap-1">
                           <span className="font-medium">Nota:</span> {item.indicaciones}
                        </p>
                      ) : (
                         <p className="text-slate-400 text-xs italic">Sin observaciones</p>
                      )}
                    </div>
                  </div>
                  
                  <button
                    onClick={() =>{}}
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
    )
    }