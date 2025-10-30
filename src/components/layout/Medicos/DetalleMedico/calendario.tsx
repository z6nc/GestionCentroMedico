import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import type { CarritoHorario } from "../../../../hooks/useCarritoMedico";

interface CalendarioProps {
  horarios: CarritoHorario[];
}

const localizer = momentLocalizer(moment);

export function CalendarioHorarios({ horarios }: CalendarioProps) {
  const eventos = horarios.map((h) => ({
    title: `Médico ID: ${h.medicoId} - Consultorio: ${h.consultorio}`,
    start: new Date(`${h.fecha}T${h.horaInicio}`),
    end: new Date(`${h.fecha}T${h.horaFin}`),
  }));

  return (
    <div style={{ height: 600 }}>
      <Calendar
        localizer={localizer}
        events={eventos}
        startAccessor="start"
        endAccessor="end"
        defaultView="week"
        views={["week", "day"]}
        step={15}
        timeslots={4}
        style={{ height: "100%" }}
      />
    </div>
  );
}
