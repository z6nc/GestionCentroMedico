import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../../common/InputCustom/input';
import { IconEmail, IconPassword } from '../../icons/FormIcon';
import { Link } from 'react-router-dom';
import { loginSchema } from '../../../schema/login.schema';
import type { LoginForm } from '../../../schema/login.schema';
import '../../../css/Login.css';

export default function Login({ onSubmit }: { onSubmit: (data: LoginForm) => void }) {
    const { register, handleSubmit, formState: { errors }, } = useForm<LoginForm>({ resolver: zodResolver(loginSchema), });

    return (
        <section id='ContainerLogin' className="min-h-screen  flex  items-start " >

            <div className=" mx-auto flex flex-col justify-center items-center gap-y-4 shadow my-20 py-10 px-20 text-center rounded-lg bg-white">
                <img className='w-60 mb-6' src="https://api.centromedicoosi.com/img/osi/logologin.png" alt="" />
                <h1 className="text-blue-700 font-black ">BIENVENIDO</h1>
                <h2 className='text-gray-500 font-semibold'>Inicia Sesión</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-9">
                    <Input id='email' register={register('email')} error={errors.email?.message} type='email' placeholder='Email' >
                        <IconEmail />
                    </Input>
                    <Input id='password' register={register('password')} error={errors.password?.message} type='password' placeholder='Contraseña' >
                        <IconPassword />
                    </Input>
                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                    >
                        Inicia Sesión
                    </button>
                </form>

                <p className="mt-4 text-sm text-center">
                    <Link to="/register" className="text-blue-600">Contacta con soporte</Link>
                </p>
            </div>
        </section>
    );
}
