import type { PropsUser } from "../../../types/user.types";
import { ItemNavBar } from "./itemNav.bar";
import { User2Icon, Stethoscope } from "lucide-react"
type Props = {
    user: PropsUser;
};

export function Sidebar({ user }: Props) {

    return (
        <section className="w-64 bg-card  h-screen bg-green-500 flex flex-col justify-between p-6 ">
            <div className="flex flex-col gap-y-9 ">
                {/* Logo del sistema */}
                <div className="  overflow-hidden w-full inline-flex items-center gap-4">
                    <div className="p-2 bg-white rounded-lg">
                        <Stethoscope className="size-6 text-green-400  " />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-white">RenovaSalud</h1>
                    </div>
                </div>

                <ItemNavBar tipo={user.tipo} />
            </div>

            <div className="flex items-center gap-3 mb-9  bg-white/10  p-2 rounded-lg">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <User2Icon />
                </div>
                <div className="text-white">
                    <p className="text-sm font-medium uppercase">{user.tipo}</p>
                    <p className="text-xs ">{user.nombre}</p>
                </div>
            </div>
        </section>
    )
}