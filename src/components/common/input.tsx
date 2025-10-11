import type { InputHTMLAttributes } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
export  interface PROPSINPUT extends InputHTMLAttributes<HTMLInputElement>{
    id:string,
    Textlabel : string,
    target?: "_self" | "_blank" ,
    register?: UseFormRegisterReturn,
    error?: string,
    estilo ? :string,
    type: "text" | "email" | "password" | "number" 
}


export const Input = ({ id, Textlabel, register, error, estilo, type }: PROPSINPUT) => {
    return (
        <div className={`${estilo} flex flex-col  gap-y-2 text-black`}>
            <label htmlFor={id}>{Textlabel}</label>
            <input className="p-2 h-full border border-gray-500 rounded-lg"   name={id} id={id} type={type} {...register} />
            {error && <span className="text-red-500 text-sm">{error}</span>}
        </div>
    )
}