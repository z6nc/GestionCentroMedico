import { TituloCustom } from "../../components/common/titulos/tituloCustom"
import { VistaCRUD } from "../../components/common/Tablas/vistaCrud"
import { PersonaData } from "../../data/pacientes.data"
import { AgregarPacientes } from "../../components/layout/Pacientes/AgregarPacientes"
export function VistaPacientes() {
    return (
        <section className="">
            <TituloCustom titulo="Pacientes" />
            <div className="max-w-max mx-auto my-9 flex flex-col gap-y-9 items-start">
                <AgregarPacientes titulo="Paciente" />
                <VistaCRUD
                    data={PersonaData}
                />

            </div>

        </section>
    )
}
