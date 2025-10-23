import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input, InputTextarea } from "../../common/InputCustom/index";
import { ItemFormsIcon } from '../../../data/itemFormsIcon';
import { analisisSchema, type AnalisisProps } from '../../../schema/analisis.schema';

interface FormModalAnalisisProps {
    onSubmit: (data: AnalisisProps) => void;
    initialData?: Partial<AnalisisProps>; // datos iniciales (para editar)
    mode?: 'agregar' | 'editar'; // modo del formulario
}

export function FormModalAnalisis({
    onSubmit,
    initialData,
    mode = 'agregar',
}: FormModalAnalisisProps) {
    const { register, handleSubmit, formState: { errors }, reset, } = useForm<AnalisisProps>({
        resolver: zodResolver(analisisSchema), defaultValues: initialData, // valores iniciales si existen
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
                id="idAnalisis"
                register={register("idAnalisis")}
                error={errors.idAnalisis?.message}
                type="text"
                placeholder="ID del Análisis"
            >
                {ItemFormsIcon.dni}
            </Input>

            <Input
                id="nombreAnalisis"
                register={register("nombreAnalisis")}
                error={errors.nombreAnalisis?.message}
                type="text"
                placeholder="Nombre del Análisis"
            >
                {ItemFormsIcon.analisis}
            </Input>

            <InputTextarea
                id="descripcion"
                register={register("descripcion")}
                error={errors.descripcion?.message}
                placeholder="Descripción del Análisis"
            />

            <Input
                id="precioAnalisis"
                register={register("precio")}
                error={errors.precio?.message}
                type="number"
                placeholder="Precio del Análisis"
            >
                {ItemFormsIcon.precio}
            </Input>


            <Input
                id="duracionDias"
                register={register("duracionDias")}
                error={errors.duracionDias?.message}
                type="number"
                placeholder="Días de duración"
            >
                {ItemFormsIcon.calendario}
            </Input>



            <button
                type="submit"
                className={`${mode === 'editar' ? 'bg-green-600' : 'bg-blue-600'
                    } text-white py-2 rounded-lg mt-3 transition hover:opacity-90`}
            >
                {mode === 'editar' ? 'Actualizar Análisis' : 'Guardar Análisis'}
            </button>
        </form>
    );
}
