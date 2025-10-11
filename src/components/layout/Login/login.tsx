import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../../common/input';
import { Link } from 'react-router-dom';
import { loginSchema } from '../../../schema/login.schema';
import type { LoginForm } from '../../../schema/login.schema';


export default function Login({ onSubmit }: { onSubmit: (data: LoginForm) => void }) {
    const { register, handleSubmit, formState: { errors }, } = useForm<LoginForm>({ resolver: zodResolver(loginSchema), });

    return (
        <section className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="w-full max-w-md p-8 bg-white rounded shadow">
                <h1 className="text-2xl font-semibold mb-4">Iniciar sesión</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <Input id='email' Textlabel='Email' register={register('email')} error={errors.email?.message} type='email' placeholder='Ingrese tu dni' />
                    <Input id='password' Textlabel='Contraseña' register={register('password')} error={errors.password?.message} type='password' placeholder='Ingrese su contraseña' />

                    <div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                        // disabled={isMutating}
                        >
                            {/* {isMutating ? 'Ingresando...' : 'Ingresar'} */}
                            registra

                        </button>
                    </div>
                </form>

                <p className="mt-4 text-sm text-center">
                    <Link to="/register" className="text-blue-600">Contacta con soporte</Link>
                </p>
            </div>
        </section>
    );
}
