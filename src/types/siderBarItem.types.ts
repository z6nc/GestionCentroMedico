import type { Role } from "./roles.types";
export interface SidebarItem {
    Categoria: Role;
    itemsLabel: {
        icon: React.ComponentType<{ className?: string }>
        label: string
        path: string
        allowedRoles?: Role[];
        element: React.ReactNode;
    }[]
}