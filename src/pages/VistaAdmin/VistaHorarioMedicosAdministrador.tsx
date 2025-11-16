import { TituloCustom } from "../../components/common/titulos/tituloCustom"
import { DisponibilidadMedico } from "../../components/layout/VistaHorarioMedicosAdmin/DisponibilidadMedico"
export function VistaHorarioMedicosAdministrador() {
  return (
    <main>
        <TituloCustom titulo="Horario de Medicos - Administrador" />
        <DisponibilidadMedico />
    </main>
  )
}