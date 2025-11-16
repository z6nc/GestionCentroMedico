import { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import type { View } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
// import type { CarritoHorario } from "../../../../hooks/useCarritoMedico";
import type { HorarioMedico } from "../../../../hooks/useHorarioMedico";

interface CalendarioProps {
  horarios: HorarioMedico[];
}

const localizer = momentLocalizer(moment);

export function CalendarioHorarios({ horarios }: CalendarioProps) {
  // estado que controla la fecha actualmente visible en el calendario
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  // convertir tus horarios a eventos válidos (Date start/end)
  const eventos = horarios
    .map((h) => {
      // asegúrate que fecha e horas están en formato correcto "YYYY-MM-DD" y "HH:mm:ss" (o "HH:mm")
      const start = new Date(`${h.fecha}T${h.horaInicio}`);
      const end = new Date(`${h.fecha}T${h.horaFin}`);
      if (isNaN(start.getTime()) || isNaN(end.getTime())) return null;
      return {
        title: `Médico ${h.medicoId} • ${h.consultorio}`,
        start,
        end,
        resource: h,
      };
    })
    .filter(Boolean) as { title: string; start: Date; end: Date; resource: HorarioMedico }[];

  // manejar navegación: actualizar el estado con la nueva fecha seleccionada por el calendario
  const handleNavigate = (newDate: Date, view: View) => {
    setCurrentDate(newDate);
  };

  // opcional: cuando cambies vista (semana/día) también puedes manejarlo
  const handleView = (view: View) => {
    // por ahora no hacemos nada, pero puedes guardarlo si quieres
  };

  return (
    <div style={{ height: 700 }}>
      <Calendar
        localizer={localizer}
        events={eventos}
        startAccessor="start"
        endAccessor="end"
        defaultView="week"
        views={["week", "day", "month"]}
        step={15}
        timeslots={4}
        date={currentDate}         // componente controlado: debe actualizarse en onNavigate
        onNavigate={handleNavigate} // actualiza currentDate y permite navegar libremente
        onView={handleView}
        style={{ height: "100%" }}
      />
    </div>
  );
}
