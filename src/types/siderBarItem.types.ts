import type { Role } from "./roles.types";
export interface SidebarItem {
    Categoria: Role;
    itemsLabel: {
        path: string
        allowedRoles?: Role[];
        element: React.ReactNode;
    }[]
}