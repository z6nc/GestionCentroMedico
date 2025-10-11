import { Navigate } from "react-router-dom";
import { useAtom } from 'jotai';
import { UserAtom } from "../store/user.atom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}
export const ProteccionRouter = ({ children }: ProtectedRouteProps) => {
  const [user] = useAtom(UserAtom);

  if ( !user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
