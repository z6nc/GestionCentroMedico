import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input ,InputSelect } from "../InputCustom/index";
import type { Paciente } from "../../../schema/paciente.schema";
import { pacienteSchema } from "../../../schema/paciente.schema";

export function FormModal({ onSubmit }: { onSubmit: (data: Paciente) => void }) {
    const { register, handleSubmit, formState: { errors }, } = useForm<Paciente>({ resolver: zodResolver(pacienteSchema), });
    return (
        <form onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-3 text-gray-50"
        >
            <Input id='DniPaciente' register={register('DniPaciente')} error={errors.DniPaciente?.message} type='text' placeholder='Dni Paciente' >
            </Input>
            <Input id='nombrePaciente' register={register('Nombre')} error={errors.Nombre?.message} type='text' placeholder='Nombre' >
            </Input>
            <Input id='ApellidoPaciente' register={register('Apellido')} error={errors.Apellido?.message} type='text' placeholder='Apellido' >
            </Input>
            <Input id='fechanacimientoPaciente' register={register('FechaNacimiento')} error={errors.FechaNacimiento?.message} type='datetime-local' placeholder='Fecha de Nacimiento' >
            </Input>
            {/* genero Opcion  */}
            <InputSelect id='generoPaciente' register={register('Genero')} error={errors.Genero?.message} options={['Masculino', 'Femenino']} placeholder='Genero' >
            </InputSelect>
            <Input id='telefonoPaciente' register={register('Telefono')} error={errors.Telefono?.message} type='text' placeholder='Telefono' >
            </Input>
            <Input id='direccionPaciente' register={register('Direccion')} error={errors.Direccion?.message} type='text' placeholder='Direccion' >
            </Input>
            <Input id='emailPaciente' register={register('Email')} error={errors.Email?.message} type='email' placeholder='Email' >
            </Input>

            <button
                type="submit"
                className="bg-blue-600 text-white py-2 rounded-lg mt-3"
            >
                Guardar
            </button>
        </form>
    );
}
