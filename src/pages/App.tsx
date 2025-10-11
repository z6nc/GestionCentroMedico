import { Routes, Route } from "react-router-dom";
import { ProteccionRouter } from "../auth/ProteccionRouter";
import VistaLogin from "./vistaLogin";
import Dashboard from "./dashboard";
function App() {

  return (
    <Routes>
      <Route path="/" element={<VistaLogin />} />
      <Route path="/dashboard" element={
        <ProteccionRouter>
          <Dashboard />
        </ProteccionRouter>
      }
      />
    </Routes>
  )
}

export default App
