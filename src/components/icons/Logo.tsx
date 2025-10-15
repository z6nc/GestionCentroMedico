import { Stethoscope } from "lucide-react"
interface LogoProps {
    bgClass?: string;
    iconClass?: string;
}

export const Logo = ({ bgClass, iconClass }: LogoProps) => {
    return (
        <div className={`p-2  rounded-lg ${bgClass}`}>
            <Stethoscope className={`  ${iconClass}`} />
        </div>
    )
}