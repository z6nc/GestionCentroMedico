import { sidebarItems } from "../../../data/itemsDataNavbar";

export const ItemNavBar = ({ tipo }: {tipo: 'medico' | 'enfermero' | 'administrativo' | 'cajero';}) => {
    const FindSiderItems = sidebarItems.find((item) => item.Categoria === tipo);
    return (
        <nav className="space-y-2 flex flex-col items-center">
            {
                        FindSiderItems ? (
                            FindSiderItems.itemsLabel.map((item , index) => (
                                    <button className="flex items-center gap-3 w-full px-4 py-2 rounded-lg bg-sky-300/5 border border-gray-200"
                                        key={index}
                                    >
                                        <item.icon className="h-4 w-4" />
                                        {item.label}
                                    </button>

                            ))
                        ) : "no hay "
                    }

        </nav>
    )
}