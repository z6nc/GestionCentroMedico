import { sidebarItems } from "../../../data/itemsDataNavbar";

export const ItemNavBar = ({ tipo }: { tipo: 'medico' | 'enfermero' | 'administrativo' | 'cajero'; }) => {
    const FindSiderItems = sidebarItems.find((item) => item.Categoria === tipo);
    return (
        <nav className="space-y-5 flex flex-col items-center text-white">
            {
                FindSiderItems ? (
                    FindSiderItems.itemsLabel.map((item, index) => (
                        <button className="flex items-center gap-3 w-full px-4 py-2 rounded-lg hover:bg-white/20 transition-colors text-left"
                            key={index}
                        >
                            <item.icon className="size-5 " />
                            {item.label}
                        </button>

                    ))
                ) : "no hay "
            }

        </nav>
    )
}