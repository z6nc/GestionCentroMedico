import { Navigate } from "react-router-dom";
import { useAtom } from 'jotai';
import { UserAtom } from "../store/user.atom";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

export const ProteccionRouter = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const [user] = useAtom(UserAtom);

  if (!user) {
    return <Navigate to="/" replace />;
  }
  // Si la ruta tiene restricción de roles
  if (allowedRoles && !allowedRoles.includes(user.tipo)) {
    return <Navigate to="/dashboard" replace />; // O puedes enviar a "no autorizado"
  }

  return <>{children}</>;
};
