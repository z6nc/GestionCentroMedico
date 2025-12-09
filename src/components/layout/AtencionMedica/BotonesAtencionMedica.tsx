import { ModalCustom } from "../../common/Modal/modalCustom";
import { DetalleRecetaMedica } from "./DetalleRecetaMedica";
import { DetalleAnalisisClinico } from "./DetalleAnalisisClinico";
import { useState } from "react";
export const BotonesAtencionMedica = ({ IdAtencionMedica }: { IdAtencionMedica: number }) => {
    const [modalRecetaAbierto, setModalRecetaAbierto] = useState(false);
    const [modalAnalisisAbierto, setModalAnalisisAbierto] = useState(false);
    return (
        <div className="pt-6 border-t border-gray-100 flex items-center justify-start gap-4">

            {/* Botón: Solicitar Análisis */}
            <button
                type="button" // Cambiado a 'button' si abre un modal
                onClick={() => setModalAnalisisAbierto(true)}
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
                onClick={() => setModalRecetaAbierto(true)}
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
            <ModalCustom isOpen={modalRecetaAbierto} onClose={() => setModalRecetaAbierto(false)} title="Detalle de Receta Médica">
                    <DetalleRecetaMedica  IDAtencionMedica={IdAtencionMedica}/>
            </ModalCustom>
            <ModalCustom isOpen={modalAnalisisAbierto} onClose={() => setModalAnalisisAbierto(false)} title="Solicitud de Análisis Clínicos">
                    <DetalleAnalisisClinico  IDAtencionMedica={IdAtencionMedica}/>
            </ModalCustom>

        </div>
    )
}