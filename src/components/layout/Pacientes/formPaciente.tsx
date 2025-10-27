import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input, InputSelect } from "../../common/InputCustom/index";
import type { Paciente } from "../../../schema/paciente.schema";
import { pacienteSchema } from "../../../schema/paciente.schema";
import { ItemFormsIcon } from '../../../data/itemFormsIcon';

interface FormModalPacienteProps {
    onSubmit: (data: Paciente) => void;
    initialData?: Partial<Paciente>; // datos iniciales (para editar)
    mode: 'agregar' | 'editar'; // modo del formulario
}

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
            className="flex flex-col gap-3 text-gray-50"
        >
            <Input
                id="DniPaciente"
                register={register("DniPaciente")}
                error={errors.DniPaciente?.message}
                type="text"
                placeholder="DNI del Paciente"
            >
                {ItemFormsIcon.dni}
            </Input>

            <Input
                id="nombrePaciente"
                register={register("Nombre")}
                error={errors.Nombre?.message}
                type="text"
                placeholder="Nombre"
            >
                {ItemFormsIcon.usuario}
            </Input>

            <Input
                id="ApellidoPaciente"
                register={register("Apellido")}
                error={errors.Apellido?.message}
                type="text"
                placeholder="Apellido"
            >
                {ItemFormsIcon.usuario}
            </Input>

            <Input
                id="fechanacimientoPaciente"
                register={register("FechaNacimiento")}
                error={errors.FechaNacimiento?.message}
                type="date"
                placeholder="Fecha de Nacimiento"
            >
                {ItemFormsIcon.calendario}
            </Input>
            <Input
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
            </InputSelect>

            <Input
                id="telefonoPaciente"
                register={register("Telefono")}
                error={errors.Telefono?.message}
                type="text"
                placeholder="Celular"
            >
                {ItemFormsIcon.telefono}
            </Input>

            <Input
                id="direccionPaciente"
                register={register("Direccion")}
                error={errors.Direccion?.message}
                type="text"
                placeholder="Dirección del hogar"
            >
                {ItemFormsIcon.direccionHogar}
            </Input>

            <Input
                id="emailPaciente"
                register={register("Email")}
                error={errors.Email?.message}
                type="email"
                placeholder="Correo electrónico"
            >
                {ItemFormsIcon.email}
            </Input>
            <Input
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
