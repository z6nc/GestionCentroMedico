import { Routes, Route } from "react-router-dom";
import { ProteccionRouter } from "../auth/ProteccionRouter";
import VistaLogin from "./vistaLogin";
import Dashboard from "./dashboard";
import { sidebarItems } from "../data/itemsDataNavbar";
import { VistaPrincipal } from "../components/layout/Dasboard/vistaPrincipal";
import "react-big-calendar/lib/css/react-big-calendar.css";

function App() {

  return (
    <Routes>
      <Route path="/" element={<VistaLogin />} />

      <Route
        path="/dashboard"
        element={
          <ProteccionRouter>
            <Dashboard />
          </ProteccionRouter>
        }
      >
        <Route index element={<VistaPrincipal />} />
        {/* Subrutas del dashboard */}
        {sidebarItems.map(routes => (
          routes.itemsLabel.map(route => (
            <Route
              key={route.path}
              path={route.path}
              element={
                <ProteccionRouter allowedRoles={route.allowedRoles}>
                  {route.element}
                </ProteccionRouter>
              }
            />
          ))
        ))}

      </Route>
    </Routes>

  )
}

export default App
