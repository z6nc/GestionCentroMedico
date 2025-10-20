import type { UseFormRegisterReturn } from "react-hook-form";

interface InputTextareaProps {
    id: string;
    register?: UseFormRegisterReturn;
    error?: string;
    estilo?: string;
    placeholder?: string;
    rows?: number;
    children?: React.ReactNode;
}

export const InputTextarea = ({
    id,
    register,
    error,
    estilo,
    placeholder,
    rows = 4,
    children,
}: InputTextareaProps) => {
    return (
        <div className={`${estilo} w-96 flex flex-col gap-y-2 text-black`}>
            <label
                htmlFor={id}
                className="inline-flex flex-col border border-gray-300 rounded-sm px-2"
            >
                {children}
                <textarea
                    id={id}
                    {...register}
                    placeholder={placeholder}
                    rows={rows}
                    className="px-2 py-3 border-none w-full outline-none resize-none"
                />
            </label>
            {error && <span className="text-red-500 text-sm">{error}</span>}
        </div>
    );
};
