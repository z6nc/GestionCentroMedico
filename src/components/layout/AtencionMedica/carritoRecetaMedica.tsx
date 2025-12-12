import { Trash2 } from "lucide-react";
import { useVerReceta } from "../../../hooks/useRecetaMedica";
export const CarritoRecetaMedica = ({ IDRECETA }: { IDRECETA: number }) => {
    const { receta, isLoading, isError, error } = useVerReceta(IDRECETA);
    if (isLoading) return <div>Cargando receta...</div>;
    if (isError) return <div>Error: {error?.message}</div>;
    return (
        <div className="bg-white min-h-[150px]">
            {receta?.detalles.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center py-8 text-slate-400 border-b border-dashed border-slate-200">
                    <span className="text-sm italic">La receta está vacía</span>
                </div>
            ) : (
                <div>
                    <div className="px-4 py-2 bg-blue-50 text-blue-800 text-xs font-bold uppercase tracking-wider border-b border-blue-100 flex justify-between items-center">
                        <span>Medicamentos Agregados ({receta?.detalles.length})</span>
                    </div>
                    <ul className="divide-y divide-slate-100">
                        {receta?.detalles.map((item, index) => (
                            <li key={item.idDetalle} className="p-4 flex justify-between items-center group hover:bg-slate-50 transition-colors animate-in fade-in slide-in-from-top-2 duration-300">
                                <div className="flex items-start gap-3 overflow-hidden">
                                    <span className="flex-shrink-0 bg-slate-100 text-slate-500 text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center mt-0.5">
                                        {index + 1}
                                    </span>
                                    <div className="min-w-0">
                                        <p className="text-slate-800 font-semibold text-sm truncate">{item.nombreMedicamento}</p>
                                        <p className="text-slate-500 text-xs truncate">{item.indicaciones || "Sin instrucciones específicas"}</p>
                                        <p className="text-slate-400 text-xs italic">{item.cantidad || "Cantidad no especificada"}</p>
                                    </div>
                                </div>

                                <button
                                    onClick={() => { }}
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
    )
};