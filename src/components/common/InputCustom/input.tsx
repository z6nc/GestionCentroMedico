import type { InputHTMLAttributes } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
export interface PROPSINPUT extends InputHTMLAttributes<HTMLInputElement> {
    id: string,
    target?: "_self" | "_blank",
    register?: UseFormRegisterReturn,
    error?: string,
    estilo?: string,
    type: "text" | "email" | "password" | "number" |"date"
    placeholder?: string
    children?: React.ReactNode
}


export const Input = ({ id, register, error, estilo, type, placeholder, children }: PROPSINPUT) => {
    return (
        <div className={`${estilo} w-96 flex flex-col  gap-y-2 text-black`}>
            <label htmlFor={id} className="inline-flex items-center justify-center border border-gray-300 rounded-sm px-2">
                {children}
                <span className="text-gray-300 pl-2">|</span>
                <input className="px-2 py-3 h-full border-none w-full  outline-none"  id={id} type={type} placeholder={placeholder} {...register} />
            </label>
            {error && <span className="text-red-500 text-sm">{error}</span>}
        </div>
    )
}