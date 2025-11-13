import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input, InputSelect, InputTextarea } from "../../common/InputCustom";
import { ItemFormsIcon } from '../../../data/itemFormsIcon';
import type { HistoriaMedicaProps } from '../../../schema/historiaMedica.schema';
import { HistoriaMedicaSchema } from '../../../schema/historiaMedica.schema';

interface FormModalHistoriaMedicaProps {
  onSubmit: (data: HistoriaMedicaProps) => void;
  initialData?: Partial<HistoriaMedicaProps>; // datos iniciales (para editar)
  mode: 'agregar' | 'editar'; // modo del formulario
  pacienteId: number; // ID del paciente al que pertenece la historia
}

const optionsTipoSangre = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export function FormModalHistoriaMedica({
  onSubmit,
  initialData,
  mode = 'agregar',
  pacienteId,
}: FormModalHistoriaMedicaProps) {

  const { register, handleSubmit, formState: { errors }, reset } = useForm<HistoriaMedicaProps>({
    resolver: zodResolver(HistoriaMedicaSchema),
    defaultValues: initialData, // valores iniciales si existen
  });

  // ✅ Corrección: usar la función que añade pacienteId
  const handleFormSubmit = (data: HistoriaMedicaProps) => {
    const historiaCompleta = {
      ...data,
      pacienteId,
    };
    onSubmit(historiaCompleta);
  };

  // ✅ Reset cuando cambian los datos iniciales (modo editar)
  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)} // ✅ aquí estaba el error
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

     

      <button
        type="submit"
        className={`${mode === 'editar' ? 'bg-green-600' : 'bg-blue-600'} 
          text-white py-2 rounded-lg mt-3 transition hover:opacity-90 cursor-pointer`}
      >
        {mode === 'editar' ? 'Actualizar historia médica' : 'Guardar historia médica'}
      </button>
    </form>
  );
}
