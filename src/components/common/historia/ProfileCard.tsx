
interface ProfileCardProps<T extends object> {
    title: string;
    Nombre: string;
    Apellido : string;
    data: T;
    imageUrl?: string;
}

export function ProfileCard<T extends object>({
    title,
    Nombre,
    Apellido,
    data,
    imageUrl,
}: ProfileCardProps<T>) {
    return (
        <div className="lg:w-80 2xl:w-96 bg-white p-5 flex flex-col gap-4 rounded-lg shadow-md">
            <h1 className="text-center text-gray-400 font-semibold text-xl uppercase">
                {title}
            </h1>

            <div className="text-center border-b border-gray-100  pb-6 ">
                <img
                    src={
                        imageUrl ||
                        "https://www.pngall.com/wp-content/uploads/5/Profile-Avatar-PNG.png"
                    }
                    alt={`Avatar`}
                    className="w-32 h-32 mx-auto my-4 rounded-full"
                />
                <h2 className="text-2xl font-bold">{Nombre} {Apellido}</h2>
            </div>

            {/* 🔁 Mostrar cada par clave/valor dinámicamente */}
            {Object.entries(data).map(([key, value]) => (
                <p className="text-sm" key={key}>
                    <span className="font-semibold text-gray-900">{formatearClave(key)}:</span>{" "}
                    {value !== null && value !== undefined && value !== ""
                        ? value
                        : "No registrado"}
                </p>
            ))}
        </div>
    );
}

/** 🔠 Función para poner las claves más legibles */
function formatearClave(key: string) {
    return key
        .replace(/([A-Z])/g, " $1") // separa mayúsculas
        .replace(/^./, (str) => str.toUpperCase()); // primera letra mayúscula
}



