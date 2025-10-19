import { sidebarItems } from "../../../data/itemsDataNavbar";
import { Link, useLocation } from "react-router-dom";
import type { Role } from "../../../types/roles.types";

export const ItemNavBar = ({ tipo }: { tipo: Role }) => {
    const { pathname } = useLocation();
    const FindSiderItems = sidebarItems.find((item) => item.Categoria === tipo);
    const linkClass = (path: string) =>
        ` ${pathname === path ? "bg-white/20 " : "bg-transparent hover:bg-white/20"
        }`;
    return (

        <nav className="space-y-5 flex flex-col items-center text-white px-4">
            {
                FindSiderItems ? (
                    FindSiderItems.itemsLabel.map((item, index) => (
                        <Link to={item.path} className={`flex items-center gap-3 w-full px-4 py-2 rounded-lg  transition-colors text-left ${linkClass(item.path)}`}
                            key={index}
                        >
                            <item.icon className="size-5 " />
                            {item.label}
                        </Link>

                    ))
                ) : "no hay "
            }

        </nav>
    )
}