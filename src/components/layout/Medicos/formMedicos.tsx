import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input, InputSelect } from "../../common/InputCustom/index";
import { MedicosSchema } from '../../../schema/medicos.schema';
import { ItemFormsIcon } from '../../../data/itemFormsIcon';
import type { MedicoProps } from '../../../schema/medicos.schema';
import { EspecialidadData } from '../../../data/especialidad.data';
interface FormModalMedicosProps {
    onSubmit: (data: MedicoProps) => void;
    initialData?: Partial<MedicoProps>; // datos iniciales (para editar)
    mode?: 'agregar' | 'editar'; // modo del formulario
}

export function FormModalMedico({
    onSubmit,
    initialData,
    mode = 'agregar',
}: FormModalMedicosProps) {
    const {register, handleSubmit,formState: { errors }, reset, } = useForm<MedicoProps>({ resolver: zodResolver(MedicosSchema),defaultValues: initialData, // valores iniciales si existen
 });

    // ✅ Si cambian los datos iniciales (por ejemplo, al hacer clic en otro paciente)
    // el formulario se actualiza automáticamente.
    useEffect(() => {
        if (initialData) {
            reset(initialData);
        }
    }, [initialData, reset]);

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-3 text-gray-50"
        >
            <Input
                id="IDMedicamento"
                register={register("IDMedico")}
                error={errors.IDMedico?.message}
                type="text"
                placeholder="ID del Medicamento"
            >
                {ItemFormsIcon.dni}
            </Input>

            <Input
                id="NombreMedico"
                register={register("NombreMedico")}
                error={errors.NombreMedico?.message}
                type="text"
                placeholder="Nombre del Medico"
            >
                {ItemFormsIcon.usuario}
            </Input>

            <Input
                id="ApellidoMedico"
                register={register("ApellidoMedico")}
                error={errors.ApellidoMedico?.message}
                type="text"
                placeholder="Apellido del Médico"
            >
                {ItemFormsIcon.usuario}
            </Input>

          
             <InputSelect
                id="especialidad"
                register={register("Especialidad")}
                error={errors.Especialidad?.message}
                options={EspecialidadData}
                placeholder="Selecciona una especialidad"
            >
                {ItemFormsIcon.especialidad}
            </InputSelect>
            <Input
                id="telefono"
                register={register("telefono")}
                error={errors.telefono?.message}
                type="text"
                placeholder="Telefono del Médico"
            >
                {ItemFormsIcon.telefono}
            </Input>
              <Input
                id="email"
                register={register("email")}
                error={errors.email?.message}
                type="text"
                placeholder="Email del Médico"
            >
                {ItemFormsIcon.email}
            </Input>

                    

            <button
                type="submit"
                className={`${mode === 'editar' ? 'bg-green-600' : 'bg-blue-600'
                    } text-white py-2 rounded-lg mt-3 transition hover:opacity-90 cursor-pointer`}
            >
                {mode === 'editar' ? 'Actualizar Paciente' : 'Guardar Paciente'}
            </button>
        </form>
    );
}
