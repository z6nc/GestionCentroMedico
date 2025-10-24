import { TituloCustom } from "../../components/common/titulos/tituloCustom"
import { MedicosData } from "../../data/medicos.data"
import { AgregarMedico } from "../../components/layout/Medicos/AgregarMedicos"
import { VistaCRUDMedicos } from "../../components/layout/Medicos/vistaCrudMedicos"
export function VistaMedico() {
    return (
        <section className="">
            <TituloCustom titulo="Lista de Medicos" />
            <div className=" xl:max-w-max m-9 flex flex-col gap-y-9 items-start ">
                <AgregarMedico titulo="Medicos" />
                <VistaCRUDMedicos
                    data={MedicosData}
                    titulo="Medicos"
                    onEdit={(actualizado) => {
                        console.log("Medico actualizado:", actualizado);
                    }}
                />
            </div>

        </section>
    )
}