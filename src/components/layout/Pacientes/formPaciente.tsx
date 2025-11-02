import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input ,InputSelect } from "../../common/InputCustom/index";
import type { Paciente } from "../../../schema/paciente.schema";
import { pacienteSchema } from "../../../schema/paciente.schema";
import { ItemFormsIcon } from '../../../data/itemFormsIcon';
interface FormModalPacienteProps {
    onSubmit: (data: Paciente) => void;
    initialData?: Partial<Paciente>; // datos iniciales (para editar)
    mode: 'agregar' | 'editar'; // modo del formulario
}

 const optionsValue = [
    { value: true, label: "Activo" },
    { value: false, label: "Inactivo" },
];
export function FormModalPaciente({
    onSubmit,
    initialData,
    mode = 'agregar',
}: FormModalPacienteProps) {
    const { register, handleSubmit, formState: { errors }, reset, } = useForm<Paciente>({
        resolver: zodResolver(pacienteSchema), defaultValues: initialData, // valores iniciales si existen
    });


    useEffect(() => {
        if (initialData) {
            reset(initialData);
        }
    }, [initialData, reset]);

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-3 text-gray-50 overflow-y-auto max-h-[500px]"
        >
            <Input
                id="dniPaciente"
                register={register("dni")}
                error={errors.dni?.message}
                type="text"
                placeholder="DNI del Paciente"
            >
                {ItemFormsIcon.dni}
            </Input>

            <Input
                id="nombrePaciente"
                register={register("nombre")}
                error={errors.nombre?.message}
                type="text"
                placeholder="Nombre"
            >
                {ItemFormsIcon.usuario}
            </Input>

            <Input
                id="apellidoPaciente"
                register={register("apellido")}
                error={errors.apellido?.message}
                type="text"
                placeholder="Apellido"
            >
                {ItemFormsIcon.usuario}
            </Input>

            <Input
                id="fechanacimientoPaciente"
                register={register("fechaNacimiento")}
                error={errors.fechaNacimiento?.message}
                type="date"
                placeholder="Fecha de Nacimiento"
            >
                {ItemFormsIcon.calendario}
            </Input>
            {/* <Input
                id="edadPaciente"
                register={register("Edad")}
                error={errors.Edad?.message}
                type="text"
                placeholder="Edad"
            >
                {ItemFormsIcon.usuario}
            </Input>

            <InputSelect
                id="generoPaciente"
                register={register("Genero")}
                error={errors.Genero?.message}
                options={["Masculino", "Femenino"]}
                placeholder="Selecciona el género"
            >
                {ItemFormsIcon.genero}
            </InputSelect> */}

            <Input
                id="telefonoPaciente"
                register={register("telefono")}
                error={errors.telefono?.message}
                type="text"
                placeholder="Celular"
            >
                {ItemFormsIcon.telefono}
            </Input>

            <Input
                id="direccionPaciente"
                register={register("direccion")}
                error={errors.direccion?.message}
                type="text"
                placeholder="Dirección del hogar"
            >
                {ItemFormsIcon.direccionHogar}
            </Input>

            <Input
                id="emailPaciente"
                register={register("email")}
                error={errors.email?.message}
                type="email"
                placeholder="Correo electrónico"
            >
                {ItemFormsIcon.email}
            </Input>
            {/* <Input
                id="tipodesangrePaciente"
                register={register("TipodeSangre")}
                error={errors.TipodeSangre?.message}
                type="text"
                placeholder="Tipo de Sangre"
            >
                {ItemFormsIcon.usuario}
            </Input>
            <Input
                id="pesoPaciente"
                register={register("PesoPaciente")}
                error={errors.PesoPaciente?.message}
                type="text"
                placeholder="Peso del Paciente"
            >
                {ItemFormsIcon.peso}
            </Input>
            <Input
                id="alturaPaciente"
                register={register("AlturaPaciente")}
                error={errors.AlturaPaciente?.message}
                type="text"
                placeholder="Altura del Paciente"
            >
                {ItemFormsIcon.altura}
            </Input> */}
            <InputSelect
                id="estado"
                register={register("estado")}
                error={errors.estado?.message}
                options={optionsValue.map(option => option.value.toString())} // enviará "true"/"false"
                placeholder="Selecciona el estado"
            >
                {ItemFormsIcon.altura}
            </InputSelect>
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
