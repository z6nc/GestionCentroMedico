import { useParams } from "react-router-dom";
import { HistoriaMedicaData } from "../../data/historiaMedica.data";
import { PersonaData } from "../../data/pacientes.data";
import { TituloCustom } from "../../components/common/titulos/tituloCustom";
import { HistoriaMedicaPaciente } from "../../components/layout/HistoriaMedica/historiaMedica";
export function VistaHistoriaMedica() {
    const { dni } = useParams<{ dni: string }>();
    const paciente = PersonaData.find(p => p.DniPaciente === dni);
    const historiasPaciente = HistoriaMedicaData.filter(h => h.pacienteId === dni);

    if (!paciente) return <p>Paciente no encontrado</p>;
    return (
        <main>
            <TituloCustom titulo={`Lista de citas medicas `} />
            {/* Datos generales del paciente */}
            <HistoriaMedicaPaciente pacienteProps={paciente} historiaProps={historiasPaciente} />

        </main>

    )
}