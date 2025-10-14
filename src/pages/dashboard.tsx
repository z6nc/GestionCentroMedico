import { useAtom } from "jotai";
import { UserAtom } from "../store/user.atom";
import { Sidebar } from "../components/layout/Navbar/navbar";
export default function Dashboard() {
    const [user ] = useAtom(UserAtom);
    return (
        <main className="flex bg-[#f8f8f8] ">
             {user && <Sidebar user={user} />}
            <div className=" py-4 px-6 ">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold ">Panel de Administración</h1>
                    <p className="text-gray-400 mt-1 text-lg font-medium">Hospital San Rafael - Dashboard</p>
                </div>
                {/* <ListaItemsCategoria categoria={DatosEmpleado.RolEmpleado} /> */}

            </div>
        </main>
    )
}