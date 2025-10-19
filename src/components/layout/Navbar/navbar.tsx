import type { PropsUser } from "../../../types/user.types";
import { ItemNavBar } from "./itemNav.bar";
import { LogOut, User2Icon, } from "lucide-react"
import { Logo } from "../../icons/Logo";
type Props = {
    user: PropsUser;
};

export function Sidebar({ user }: Props) {

    return (
        <section className="w-64   min-h-screen bg-green-500 flex flex-col justify-between  ">
            <div className="flex flex-col gap-y-9  lg:mb-9">
                {/* Logo del sistema */}
                <div className="  overflow-hidden w-full inline-flex items-center gap-4 border-b border-gray-50/30 p-6">
                    <Logo iconClass="size-6 text-green-400" bgClass="bg-white" />
                    <div>
                        <h1 className="text-xl font-bold text-white">RenovaSalud</h1>
                    </div>
                </div>
                
                <div className="flex flex-col justify-center items-center gap-3  text-center ">
                    <div className=" bg-white rounded-full overflow-hidden">
                        <User2Icon className="size-16" />
                    </div>
                    <div className="text-white">
                        <p className="text-sm font-medium uppercase">{user.nombre}</p>
                        <p className="text-xs">{user.tipo}</p>
                    </div>
                </div>
                <ItemNavBar tipo={user.tipo} />
            </div>
            <button className="flex items-center gap-3 mb-9  bg-white/20 mx-4 p-2 rounded-lg text-white">
                <div className="w-8 h-8 rounded-full flex items-center justify-center">
                    <LogOut />
                </div>
                <span className="">Cerrar sesión</span>
            </button>

        </section>
    )
}