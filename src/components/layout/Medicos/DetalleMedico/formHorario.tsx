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
      className="border p-4 rounded-md space-y-4 bg-gray-50 w-full max-w-lg"
    >
      <h2 className="text-lg font-semibold text-gray-700">
        Agregar nuevo horario
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Fecha
          </label>
          <input
            type="date"
            {...register("fecha")}
            className="border p-2 rounded w-full"
          />
          {errors.fecha && (
            <p className="text-red-500 text-sm mt-1">{errors.fecha.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Consultorio
          </label>
          <input
            type="text"
            {...register("consultorio")}
            placeholder="Ej. C1"
            className="border p-2 rounded w-full"
          />
          {errors.consultorio && (
            <p className="text-red-500 text-sm mt-1">
              {errors.consultorio.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Hora inicio
          </label>
          <input
            type="time"
            {...register("horaInicio")}
            className="border p-2 rounded w-full"
          />
          {errors.horaInicio && (
            <p className="text-red-500 text-sm mt-1">
              {errors.horaInicio.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Hora fin
          </label>
          <input
            type="time"
            {...register("horaFin")}
            className="border p-2 rounded w-full"
          />
          {errors.horaFin && (
            <p className="text-red-500 text-sm mt-1">
              {errors.horaFin.message}
            </p>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
      >
        Agregar horario
      </button>
    </form>
  );
}
