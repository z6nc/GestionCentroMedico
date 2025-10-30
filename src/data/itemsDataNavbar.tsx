import { Users, Calendar, Stethoscope, Pill, CalendarSearch } from "lucide-react"
import { VistaCitas, VistaPacientes, VistaHistoriaMedica, VistaMedico, VistaMedicamentos, VistaAnalisis ,VistaDetalleMedico, VistaProgramacionMedica} from "../pages/VistaAdmin/index"
import { VerBoletas } from "../pages/VistaCajero/index";
import { VistaAtencionMedica } from "../pages/VistaMedico";
import type { SidebarItem } from "../types/siderBarItem.types";


export const sidebarItems: SidebarItem[] = [
    {
        Categoria: "administrativo",
        itemsLabel: [
            { icon: Stethoscope, label: "Lista Medicos", path: "/dashboard/lista-medicos", element: <VistaMedico />, allowedRoles: ["administrativo"] },
            { icon: Pill, label: "Detalle Medico", path: "/dashboard/detalle-medico/:id", element: <VistaDetalleMedico />, allowedRoles: ["administrativo"] },
            { icon: Calendar, label: "Programacion Medico", path: "/dashboard/programacion-medica/:medicoId", element: <VistaProgramacionMedica />, allowedRoles: ["administrativo"] },
            { icon: Pill, label: "Medicamentos", path: "/dashboard/lista-medicamentos", element: <VistaMedicamentos />, allowedRoles: ["administrativo", "cajero"] },
            { icon: Pill, label: "Analisis", path: "/dashboard/analisis", element: <VistaAnalisis />, allowedRoles: ["administrativo"] },

        ]
    },
    {
        Categoria: "enfermero",
        itemsLabel: [
            { icon: Users, label: "Pacientes", path: "/dashboard/pacientes", element: <VistaPacientes />, allowedRoles: ["administrativo" , "enfermero"] },
            { icon: Calendar, label: "Citas", path: "/dashboard/citas", element: <VistaCitas />, allowedRoles: ["administrativo" , "enfermero"] },
            { icon: Calendar, label: "Historia Medica", path: "/dashboard/historia-medica/:dni", element: <VistaHistoriaMedica />, allowedRoles: ["administrativo" , "enfermero"] },
        ]
    },

    {
        Categoria: "cajero",
        itemsLabel: [
            { icon: CalendarSearch, label: "Boleta", path: "/dashboard/boleta", element: <VerBoletas />, allowedRoles: ["cajero", "medico"] },
            { icon: Pill, label: "Listar Medicamentos", path: "/dashboard/lista-medicamentos", allowedRoles: ["cajero", "administrativo"], element: <VistaMedicamentos /> },
            // 
        ]
    },
    {
        Categoria: "medico",
        itemsLabel: [
            { icon: CalendarSearch, label: "Boleta de Pago", path: "/dashboard/boleta", element: <VerBoletas />, allowedRoles: ["medico", "cajero"] },
            { icon: Pill, label: "Atencion Medica", path: "/dashboard/atencion-medica", element: <VistaAtencionMedica />, allowedRoles: ["medico"] },
            // { icon: Users, label: "Pacientes", path: "/dashboard/pacientes", element: <VistaRecetaMedica />, allowedRoles: ["medico"] }, // crear RecetaMedica

        ]
    }

]