import type { CarritoHorario } from "../../../../hooks/useCarritoMedico"
import { Trash2 } from "lucide-react";
interface CarritoHorariosProps {
    HorarioDemedico: CarritoHorario[];
    eliminarHorario: (id: number) => void;
}

export const CarritoHorarios = ({ HorarioDemedico, eliminarHorario }: CarritoHorariosProps) => {
    return (
        <div className="flex-1 bg-white p-6 rounded-xl shadow-md w-full border border-gray-100 overflow-y-auto max-h-[450px]">
            <h2 className="text-lg font-semibold text-gray-800 mb-3 border-b border-gray-200 pb-2 flex items-center gap-2">
                🕒 Carrito de Horarios
            </h2>

            {HorarioDemedico.length > 0 ? (
                <ul className="space-y-3 max-h-64 overflow-y-auto pr-2">
                    {HorarioDemedico.map((h) => (
                        <li
                            key={h.id}
                            className="flex justify-between items-center bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 hover:bg-blue-50 transition-all duration-200"
                        >
                            <div className="flex flex-col">
                                <span className="text-gray-800 font-medium">
                                    📅 {h.fecha}
                                </span>
                                <span className="text-sm text-gray-500">
                                    ⏰ {h.horaInicio} - {h.horaFin} • {h.consultorio ?? "Sin consultorio"}
                                </span>
                            </div>

                            <button
                                onClick={() => eliminarHorario(h.id!)}
                                className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-md shadow-sm transition-all duration-200 hover:scale-105"
                                title="Eliminar horario"
                            >
                                <Trash2 size={18} />
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-500 italic text-sm mt-4 text-center">
                    No hay horarios agregados aún.
                </p>
            )}

            <button
                className="bg-blue-500 text-white px-4 py-2 text-sm rounded-md hover:bg-blue-600 transition-all duration-200 cursor-pointer my-4"
            >
              Guardar todos
            </button>
        </div>

    )
}