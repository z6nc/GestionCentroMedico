import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// ✅ Esquema de validación con Zod
const horarioSchema = z.object({
  fecha: z.string().min(1, "La fecha es obligatoria"),
  horaInicio: z.string().min(1, "Hora de inicio requerida"),
  horaFin: z.string().min(1, "Hora de fin requerida"),
  consultorio: z.string().min(1, "Consultorio requerido"),
});

type HorarioFormValues = z.infer<typeof horarioSchema>;

interface FormHorarioProps {
  medicoId: number; // viene del padre automáticamente
  onAdd: (horario: HorarioFormValues & { medicoId: number }) => void;
}

export function FormHorario({ medicoId, onAdd }: FormHorarioProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<HorarioFormValues>({
    resolver: zodResolver(horarioSchema),
  });

  const onSubmit = (data: HorarioFormValues) => {
    onAdd({ ...data, medicoId });
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-6 rounded-xl shadow-md flex-1 space-y-6 border border-gray-100"
    >
      <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2 flex items-center gap-2">
        🗓️ Registrar Horario Médico
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-blue-50/30 px-5 py-7 rounded-xl border border-blue-100">
        {/* Fecha */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Fecha del horario
          </label>
          <input
            type="date"
            {...register("fecha")}
            className="border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-100 p-2 rounded-lg w-full outline-none transition-all duration-200"
          />
          {errors.fecha && (
            <p className="text-red-500 text-sm mt-1">{errors.fecha.message}</p>
          )}
        </div>

        {/* Consultorio */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Consultorio
          </label>
          <input
            type="text"
            {...register("consultorio")}
            placeholder="Ej. C1"
            className="border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-100 p-2 rounded-lg w-full outline-none transition-all duration-200"
          />
          {errors.consultorio && (
            <p className="text-red-500 text-sm mt-1">{errors.consultorio.message}</p>
          )}
        </div>

        {/* Hora inicio */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Hora inicio
          </label>
          <input
            type="time"
            {...register("horaInicio")}
            className="border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-100 p-2 rounded-lg w-full outline-none transition-all duration-200"
          />
          {errors.horaInicio && (
            <p className="text-red-500 text-sm mt-1">{errors.horaInicio.message}</p>
          )}
        </div>

        {/* Hora fin */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Hora fin
          </label>
          <input
            type="time"
            {...register("horaFin")}
            className="border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-100 p-2 rounded-lg w-full outline-none transition-all duration-200"
          />
          {errors.horaFin && (
            <p className="text-red-500 text-sm mt-1">{errors.horaFin.message}</p>
          )}
        </div>
      </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 text-sm rounded-md hover:bg-blue-600 transition-all duration-200 cursor-pointer my-4"
        >
           Agregar al Carrito
        </button>
    </form>

  );
}
