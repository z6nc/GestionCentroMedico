import { Users, Calendar, Home, Stethoscope, Pill , CalendarSearch } from "lucide-react"

interface SidebarItem {
    Categoria: "administrativo" | "cajero" | "medico";
    itemsLabel: {
        icon: React.ComponentType<{ className?: string }>
        label: string
        active?: boolean

    }[]
}

export const sidebarItems: SidebarItem[] = [
    {
        Categoria: "administrativo",
        itemsLabel: [
            { icon: Home, label: "Inicio", active: true },
            { icon: Users, label: "Pacientes" },
            { icon: Calendar, label: "Citas" },
            { icon: Calendar, label: "Historia Medica" },
            { icon: Stethoscope, label: "Doctores" },
            { icon: Pill, label: "Farmacia" },
            { icon: Pill, label: "Analisis" },

        ]
    },
     {
        Categoria: "cajero",
        itemsLabel: [
            { icon: Home, label: "Inicio", active: true },
            { icon: CalendarSearch, label: "Boleta" },
            { icon: Pill, label: "Listar Medicamentos" },
        ]
    },
       {
        Categoria: "medico",
        itemsLabel: [
            { icon: Home, label: "Inicio", active: true },
            { icon: CalendarSearch, label: "Pagos" },
            { icon: Pill, label: "Atencion Medica" },

        ]
    }

]