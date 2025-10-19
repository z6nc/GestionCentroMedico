import { TituloCustom } from "../../components/common/titulos/tituloCustom"
import { ListaPacientes } from "../../components/layout/Pacientes/ListaPacientes"
export  function VistaPacientes() {
    return (
         <section className="">
            <TituloCustom />
            <ListaPacientes />
         </section>
    )
}
