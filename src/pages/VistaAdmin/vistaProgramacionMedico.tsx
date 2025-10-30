import { useParams } from "react-router-dom";
import { FormHorario } from "../../components/layout/Medicos/DetalleMedico/formHorario";
import { useMedicosPorEspecialidad } from "../../hooks/useMedicos";
import { useCarritoHorario } from "../../hooks/useCarritoMedico";
import { CalendarioHorarios } from "../../components/layout/Medicos/DetalleMedico/calendario";
import type { CarritoHorario } from "../../hooks/useCarritoMedico";
export function VistaProgramacionMedica() {
    const { horarios, agregarHorario, quitarHorario } = useCarritoHorario();
    const { medicos } = useMedicosPorEspecialidad();
    const { medicoId } = useParams();



    // En tu componente padre:
    const handleAddHorario = (horario: Omit<CarritoHorario, "medicoId" | "id" | "numero">) => {
        agregarHorario({ ...horario, medicoId: Number(medicoId) }); // agrega el ID del médico automáticamente
    };
    const medico = medicos?.find((m) => m.numero === Number(medicoId));
    const HorarioDemedico = horarios.filter((h) => h.medicoId === Number(medicoId));

    return (
        <section className="p-6">
            <h1 className="text-2xl font-bold mb-4">
                Programación médica para:{" "}
                {medico ? (
                    <span className="text-blue-600">
                        {medico.nombre} {medico.apellido}
                    </span>
                ) : (
                    "Cargando..."
                )}
            </h1>

            <div className="flex gap-x-5 ">
                <FormHorario medicoId={Number(medicoId)} onAdd={handleAddHorario} />

                {/* Mostrar horarios agregados */}
                <div className="mt-6 flex-1">
                    <h2 className="font-semibold mb-2">Horarios agregadosss:</h2>
                    <ul className="space-y-2">
                        {HorarioDemedico.map((h) => (
                            <li key={h.id} className="border p-2 rounded bg-gray-50 flex justify-between items-center">
                                {medico?.nombre} {h.fecha} | {h.horaInicio} - {h.horaFin} | {h.consultorio}
                                <button
                                    onClick={() => quitarHorario(h.id!)}
                                    className="ml-2 bg-red-500 text-white px-2 py-1 rounded"
                                >
                                    Quitar
                                </button>
                            </li>
                        ))}
                    </ul>
                    {/* <button
                        onClick={handleAddHorario}
                        className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-lg"
                    >
                        Guardar Programaciónsss
                    </button> */}
                </div>


     
            </div>
            {/* <CalendarAdvanced horarios={HorarioDemedico} date="2025-10-20" /> */}
            <CalendarioHorarios horarios={HorarioDemedico} />



        </section>
    );
}
