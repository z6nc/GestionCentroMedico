import Login from "../components/layout/Login/login";
import { useLogin } from "../hooks/useLogin";
export default function VistaLogin() {
    const { onSubmit } = useLogin();
    return (
        <>
            <Login onSubmit={onSubmit} />
            
        </>
    )
}