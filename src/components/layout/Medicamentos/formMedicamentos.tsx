import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from "../../common/InputCustom/index";
import { MedicamentosSchema } from '../../../schema/medicamentos.schema';
import { ItemFormsIcon } from '../../../data/itemFormsIcon';
import type { Medicamento } from '../../../schema/medicamentos.schema';

interface FormModalMedicamentoProps {
    onSubmit: (data: Medicamento) => void;
    initialData?: Partial<Medicamento>; // datos iniciales (para editar)
    mode?: 'agregar' | 'editar'; // modo del formulario
}

export function FormModalMedicamento({
    onSubmit,
    initialData,
    mode = 'agregar',
}: FormModalMedicamentoProps) {
    const {register, handleSubmit,formState: { errors }, reset, } = useForm<Medicamento>({ resolver: zodResolver(MedicamentosSchema),defaultValues: initialData, // valores iniciales si existen
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
                register={register("IDMedicamento")}
                error={errors.IDMedicamento?.message}
                type="text"
                placeholder="ID del Medicamento"
            >
                {ItemFormsIcon.dni}
            </Input>

            <Input
                id="nombreMedicamento"
                register={register("NombreMedicamento")}
                error={errors.NombreMedicamento?.message}
                type="text"
                placeholder="Nombre del Medicamento"
            >
                {ItemFormsIcon.medicamento}
            </Input>

            <Input
                id="stockMedicamento"
                register={register("stockMedicamento")}
                error={errors.stockMedicamento?.message}
                type="number"
                placeholder="Stock del Medicamento"
            >
                {ItemFormsIcon.stock}
            </Input>

            <Input
                id="PrecioMedicamento"
                register={register("PrecioMedicamento")}
                error={errors.PrecioMedicamento?.message}
                type="number"
                placeholder="Precio del Medicamento"
            >
                {ItemFormsIcon.precio}
            </Input>
            <Input
                id="FechaMedicamento"
                register={register("FechaMedicamento")}
                error={errors.FechaMedicamento?.message}
                type="date"
                placeholder="Fecha del Medicamento"
            >
                {ItemFormsIcon.calendario}
            </Input>

                    

            <button
                type="submit"
                className={`${mode === 'editar' ? 'bg-green-600' : 'bg-blue-600'
                    } text-white py-2 rounded-lg mt-3 transition hover:opacity-90`}
            >
                {mode === 'editar' ? 'Actualizar Paciente' : 'Guardar Paciente'}
            </button>
        </form>
    );
}
