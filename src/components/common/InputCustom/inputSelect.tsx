import type { UseFormRegisterReturn } from "react-hook-form";

interface InputSelectProps {
    id: string;
    register?: UseFormRegisterReturn;
    error?: string;
    estilo?: string;
    placeholder?: string;
    options: string[];
    children?: React.ReactNode;
}

export const InputSelect = ({
    id,
    register,
    error,
    estilo,
    placeholder,
    options,
    children,
}: InputSelectProps) => {
    return (
        <div className={`${estilo} w-96 flex flex-col gap-y-2 text-black`}>
            <label
                htmlFor={id}
                className="inline-flex items-center justify-center border border-gray-300 rounded-sm px-2"
            >
                {children}
                <span className="text-gray-300 pl-2">|</span>
                <select
                    id={id}
                    {...register}
                    className="px-2 py-3 h-full border-none w-full outline-none"
                >
                    <option value="">{placeholder || "Seleccione..."}</option>
                    {options.map((opt) => (
                        <option key={opt} value={opt}>
                            {opt}
                        </option>
                    ))}
                </select>
            </label>
            {error && <span className="text-red-500 text-sm">{error}</span>}
        </div>
    );
};
