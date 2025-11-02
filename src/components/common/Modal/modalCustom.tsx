import { useEffect } from "react";
import ReactDOM from "react-dom";

interface ModalCustomProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
}

export const ModalCustom = ({ isOpen, onClose, title, children }: ModalCustomProps) => {
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handleKey);
        return () => document.removeEventListener("keydown", handleKey);
    }, [onClose]);

    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-2xl shadow-lg w-full  max-w-max p-6 relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-3 text-gray-400 hover:text-gray-600 text-xl cursor-pointer"
                >
                    ×
                </button>
                {title && <h2 className="text-lg font-semibold mb-4 uppercase">{title}</h2>}
                {children}
            </div>
        </div>,
        document.body
    );
};
