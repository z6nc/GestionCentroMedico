import { Users, Calendar, Stethoscope, Pill, CalendarSearch } from "lucide-react"
import { VistaCitas, VistaPacientes, VistaHistoriaMedica, VistaMedico, VistaMedicamentos, VistaAnalisis, VistaDetalleMedico, VistaProgramacionMedica ,VistaHorarioMedicos } from "../pages/VistaAdmin/index"
import { VerBoletas } from "../pages/VistaCajero/index";
import { VistaAtencionMedica } from "../pages/VistaMedico";
import type { SidebarItem } from "../types/siderBarItem.types";


export const sidebarItems: SidebarItem[] = [
    {
        Categoria: "administrativo",
        itemsLabel: [
            { path: "/dashboard/lista-medicos", element: <VistaMedico />, allowedRoles: ["administrativo"] },
            { path: "/dashboard/detalle-medico/:id", element: <VistaDetalleMedico />, allowedRoles: ["administrativo"] },
            { path: "/dashboard/programacion-medica/:medicoId", element: <VistaProgramacionMedica />, allowedRoles: ["administrativo"] },
            { path: "/dashboard/lista-medicamentos", element: <VistaMedicamentos />, allowedRoles: ["administrativo", "cajero"] },
            { path: "/dashboard/analisis", element: <VistaAnalisis />, allowedRoles: ["administrativo"] },

        ]
    },
    {
        Categoria: "enfermero",
        itemsLabel: [
            { path: "/dashboard/pacientes", element: <VistaPacientes />, allowedRoles: ["administrativo", "enfermero"] },
            { path: "/dashboard/citas", element: <VistaCitas />, allowedRoles: ["administrativo", "enfermero"] },
            { path: "/dashboard/historia-medica/:dni", element: <VistaHistoriaMedica />, allowedRoles: ["administrativo", "enfermero"] },
            { path: "/dashboard/horario-medicos", element: <VistaHorarioMedicos />, allowedRoles: ["administrativo", "enfermero"] },

        ]
    },

    {
        Categoria: "cajero",
        itemsLabel: [
            { path: "/dashboard/boleta", element: <VerBoletas />, allowedRoles: ["cajero", "medico"] },
            { path: "/dashboard/lista-medicamentos", allowedRoles: ["cajero", "administrativo"], element: <VistaMedicamentos /> },
            // 
        ]
    },
    {
        Categoria: "medico",
        itemsLabel: [
            { path: "/dashboard/boleta", element: <VerBoletas />, allowedRoles: ["medico", "cajero"] },
            { path: "/dashboard/atencion-medica", element: <VistaAtencionMedica />, allowedRoles: ["medico"] },
            // { icon: Users, label: "Pacientes", path: "/dashboard/pacientes", element: <VistaRecetaMedica />, allowedRoles: ["medico"] }, // crear RecetaMedica

        ]
    }

]

export const ItemLabelNavbar = [
    {
        Categoria: "administrativo",
        items: [
            { icon: Stethoscope, label: "Lista Medicos", path: "/dashboard/lista-medicos" },
            { icon: Pill, label: "Medicamentos", path: "/dashboard/lista-medicamentos" },
            { icon: Pill, label: "Analisis", path: "/dashboard/analisis" },
        ]
    },
    {
        Categoria: "enfermero",
        items: [
            { icon: Users, label: "Pacientes", path: "/dashboard/pacientes" },
            { icon: Calendar, label: "Citas", path: "/dashboard/citas" },
            { icon: Calendar, label: "Horario Medicos", path: "/dashboard/horario-medicos" },

        ]
    },
    {
        Categoria: "cajero",
       items: [
            { icon: CalendarSearch, label: "Boleta", path: "/dashboard/boleta" },
            { icon: Pill, label: "Listar Medicamentos", path: "/dashboard/lista-medicamentos" },
            // 
        ]
    },
    {
        Categoria: "medico",
       items: [
            { icon: CalendarSearch, label: "Boleta de Pago", path: "/dashboard/boleta" },
            { icon: Pill, label: "Atencion Medica", path: "/dashboard/atencion-medica" },
            // { icon: Users, label: "Pacientes", path: "/dashboard/pacientes", element: <VistaRecetaMedica />, allowedRoles: ["medico"] }, // crear RecetaMedica

        ]
    }
]