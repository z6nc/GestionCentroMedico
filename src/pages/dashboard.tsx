import { useAtom } from "jotai";
import { UserAtom } from "../store/user.atom";
export default function Dashboard() {
    const [user] = useAtom(UserAtom);
    return (
        <div>
            <h1>Dashboard - Bienvenido {user?.nombre}</h1>
            <p>Tu correo electrónico es: {user?.tipo}</p>
        </div>
    )
}