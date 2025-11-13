import { useParams } from "react-router-dom";
import { AtencionMedicaData } from "../../data/historiaMedica.data";
import { TituloCustom } from "../../components/common/titulos/tituloCustom";
import { HistoriaMedicaPaciente } from "../../components/layout/HistoriaMedica/historiaMedica";
import { usePacientes } from "../../hooks/usePaciente";
export function VistaHistoriaMedica() {
    const { dni } = useParams();
    const { pacientes } = usePacientes();

    const pacientesDatos = pacientes?.find(p => p.numero === Number(dni));
    const AtencionMedicaPaciente = AtencionMedicaData.filter(h => h.pacienteId === Number(dni));
   
     if (!pacientesDatos) {
        // poner un estructura correspondiente
        return <div>Paciente no encontrado</div>;
    }

    return (
        <main>
            <TituloCustom titulo={`Lista de citas medicas `} />
            {/* Datos generales del paciente */}
            <HistoriaMedicaPaciente
                pacienteProps={pacientesDatos}
                ListaAtencionProps={AtencionMedicaPaciente}
            />
        </main>
    )
}