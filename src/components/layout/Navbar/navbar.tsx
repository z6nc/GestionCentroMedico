import type { PropsUser } from "../../../types/user.types";
import { ItemNavBar } from "./itemNav.bar";
type Props = {
    user: PropsUser;
};

export function Sidebar({ user }: Props) {

    return (
        <section className="w-64 bg-card border-r border-border h-screen bg-white">
            <div className="p-6">
                <div className="flex items-center gap-2 mb-8">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                        OS
                    </div>
                    <div>
                        <h2 className="font-semibold ">Hospital</h2>
                        <p className="text-xs ">San Rafael</p>
                    </div>
                </div>

                <ItemNavBar tipo={user.tipo} />
            </div>

            <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-muted rounded-lg p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                            <span className="text-xs font-semibold text-primary-foreground">DR</span>
                        </div>
                        <div>
                            <p className="text-sm font-medium">{user.tipo}</p>
                            <p className="text-xs text-muted-foreground">{user.nombre}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}