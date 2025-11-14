import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input, InputSelect, InputTextarea } from "../../common/InputCustom";
import { ItemFormsIcon } from '../../../data/itemFormsIcon';
import type { HistoriaMedicaProps } from '../../../schema/historiaMedica.schema';
import { HistoriaMedicaSchema } from '../../../schema/historiaMedica.schema';

interface FormModalHistoriaMedicaProps {
  onSubmitt: (data: Omit<HistoriaMedicaProps, "mensaje">) => void;
  initialData?: Partial<HistoriaMedicaProps>; // datos iniciales (para editar)
  mode: 'agregar' | 'editar'; // modo del formulario
  pacienteId: number; // ID del paciente al que pertenece la historia
  loading: boolean; // estado de carga para deshabilitar el botón
  error?: string | null; // mensaje de error para mostrar en el formulario
}

const optionsTipoSangre = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export function FormModalHistoriaMedica({
  onSubmitt,
  initialData,
  mode = 'agregar',
  loading,
}: FormModalHistoriaMedicaProps) {

  const CargaLogin = loading ? "pointer-events-none opacity-50" : "pointer-events-auto opacity-100";


  const { register, handleSubmit, formState: { errors }, reset } = useForm<Partial<HistoriaMedicaProps>>({
    resolver: zodResolver(HistoriaMedicaSchema.partial()), // 💥 acepta datos incompletos
    defaultValues: initialData,
  });



  // ✅ Reset cuando cambian los datos iniciales (modo editar)
  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);


  return (
    <form
      onSubmit={handleSubmit(onSubmitt)} // ✅ aquí estaba el error
      className="flex flex-col gap-3 text-gray-50 overflow-y-auto max-h-[500px]"
    >
      <InputSelect
        id="tipoSangrePaciente"
        register={register("tipoSangre")}
        error={errors.tipoSangre?.message}
        options={optionsTipoSangre}
        placeholder="Selecciona el tipo de sangre"
      >
        {ItemFormsIcon.altura}
      </InputSelect>

      <Input
        id="alergiasPaciente"
        register={register("alergias")}
        error={errors.alergias?.message}
        type="text"
        placeholder="Alergias del Paciente"
      >
        {ItemFormsIcon.dni}
      </Input>

      <InputTextarea
        id="antecedentesFamiliaresPaciente"
        register={register("antecedentesFamiliares")}
        error={errors.antecedentesFamiliares?.message}
        placeholder="Antecedentes Familiares del Paciente"
      >
        {ItemFormsIcon.usuario}
      </InputTextarea>

      <Input
        id="enfermedadesCronicasPaciente"
        register={register("enfermedadesCronicas")}
        error={errors.enfermedadesCronicas?.message}
        type="text"
        placeholder="Enfermedades Crónicas del Paciente"
      >
        {ItemFormsIcon.usuario}
      </Input>
      <Input
        id="fechaCreacionPaciente"
        register={register("fechaCreacion")}
        error={errors.fechaCreacion?.message}
        type="date"
        placeholder="Fecha de Creación"
      >
        {ItemFormsIcon.calendario}
      </Input>


      <button
        type="submit"
        className={`${mode === 'editar' ? 'bg-green-600' : 'bg-blue-600'} 
          text-white py-2 rounded-lg mt-3 transition hover:opacity-90 cursor-pointer ${CargaLogin}`}
      >
        {mode === 'editar' ? 'Actualizar historia médica' : 'Guardar historia médica'}
      </button>
    </form>
  );
}
