import { loginRequest } from "../service/auth";
import { useAtom } from 'jotai';
import { UserAtom } from "../store/user.atom";
import type { LoginForm } from "../schema/login.schema";
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
const navigate = useNavigate();
    const [, setUser] = useAtom(UserAtom);
    async function onSubmit(data: LoginForm) {
        try {
            const user = await loginRequest(data); // usa los datos locales
            setUser(user); // guarda en Jotai
            navigate('/dashboard'); // redirige al dashboard
        } catch (err) {
            alert(err instanceof Error ? err.message : 'Error desconocido');
        }
    }
    return { onSubmit };
}