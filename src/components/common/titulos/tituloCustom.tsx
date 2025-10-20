export const TituloCustom = ({titulo}: {titulo: string}) => {
    return (
        <div className=" border-b border-gray-100 bg-white py-7 px-5 shadow-sm">
            <h1 className="text-2xl font-bold text-gray-700">{`Gestion de ${titulo}`}</h1>
        </div>
    )
}