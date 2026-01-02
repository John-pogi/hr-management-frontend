import { useState, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { EventInput, DateSelectArg, EventClickArg } from "@fullcalendar/core";
import PageMeta from "../../components/common/PageMeta";
import Modal, { InputProps } from "../../components/modal";
interface CalendarEvent extends EventInput {
  extendedProps: {
    calendar: string;
  };
}

const LeaveRequest: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null
  );
  const [eventTitle, setEventTitle] = useState("");
  const [eventStartDate, setEventStartDate] = useState("");
  const [eventEndDate, setEventEndDate] = useState("");
  const [eventPromoCode, setEventPromoCode] = useState("");
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const calendarRef = useRef<FullCalendar>(null);
  const [modal, setModal] = useState(true);

  const handleCloseModal = () => {
    setModal(false);
  }

  const normalizeDate = (date: any): string => {
    if (!date) return "";
    
    const tempDate = new Date(date);
    tempDate.setDate(tempDate.getDate() - 1);
    
    const year = String(tempDate.getFullYear());
    const month = String(tempDate.getMonth() + 1).padStart(2, '0');
    const day = String(tempDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    resetModalFields();
    setEventStartDate(selectInfo.startStr);
    setEventEndDate(normalizeDate(selectInfo.endStr) || selectInfo.startStr);
    setModal(true);
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    const event = clickInfo.event;
    setSelectedEvent(event as unknown as CalendarEvent);
    setEventTitle(event.title);
    setEventStartDate(event.start?.toISOString().split("T")[0] || "");
    setEventEndDate(normalizeDate(event.end));
    setModal(true);
  };

  const handleAddOrUpdateEvent = () => {
    if (selectedEvent) {
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === selectedEvent.id
            ? {
                ...event,
                title: eventTitle,
                start: eventStartDate,
                end: eventEndDate,
                extendedProps: { calendar: "warning" },
              }
            : event
        )
      );
    } else {
      const newEvent: CalendarEvent = {
        id: Date.now().toString(),
        title: eventTitle,
        start: eventStartDate,
        end: eventEndDate,
        allDay: true,
        extendedProps: { calendar: "warning" },
      };
      setEvents((prevEvents) => [...prevEvents, newEvent]);
    }
    handleCloseModal();
    resetModalFields();
  };

  const resetModalFields = () => {
    setEventTitle("");
    setEventStartDate("");
    setEventEndDate("");
    setEventPromoCode("");
    setSelectedEvent(null);
  };

  const fields: InputProps[] = [
    {
      kind: 'select',
      name: "select",
      label: "Request Type",
      placeholder: "Select an option",
      options: [
        { value: "Vacation Leave", label: "Vacation Leave" },
        { value: "Vacation Leave Half-Day", label: "Vacation Leave Half-Day" },
        { value: "Sick Leave", label: "Sick Leave" },
        { value: "Sick Leave Half-Day", label: "Sick Leave Half-Day" },
        { value: "Unpaid Leave", label: "Unpaid Leave" },
        { value: "Unpaid Leave Half-Day", label: "Unpaid Leave Half-Day" },
        { value: "Emergency Leave", label: "Emergency Leave" },
        { value: "Maternity Leave", label: "Maternity Leave" },
        { value: "Paternity Leave", label: "Paternity Leave" },
        { value: "Undertime", label: "Undertime" },
        { value: "Promo Leave", label: "Promo Leave" },
      ],
      onChange: (e) => setEventTitle(e.target.value)
    },
    {
      kind: 'basic',
      type: "date",
      name: "start-date",
      label: "Start Date",
      defaultValue: eventStartDate,
    },
    {
      kind: 'basic',
      type: "date",
      name: "end-date",
      label: "End Date",
      defaultValue: eventEndDate,
      min: eventStartDate,
    },
    ...(eventTitle && eventTitle === "Promo Leave" ? [{
      kind: 'basic' as const,
      type: "text" as const,
      name: "promo-code",
      label: "Promo Code",
      placeholder: "Enter your promo code",
      defaultValue: eventPromoCode,
    }] : []),
  ];

  return (
    <>
      <PageMeta
        title="Leave Request"
        description="This page handle leave request functionalities."
      />
      <div className="rounded-2xl border  border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="custom-calendar">
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: "addEventButton",
              center: "title",
            }}
            events={events}
            selectable={true}
            select={handleDateSelect}
            eventClick={handleEventClick}
            eventContent={renderEventContent}
            customButtons={{
              addEventButton: {
                text: "Request Leave +",
                click: () => setModal(true),
              },
            }}
          />
        </div>
        {modal && <Modal style="pop-up" close={handleCloseModal} submit={handleAddOrUpdateEvent} title="Leave Request Form" desc="Plan your next leave: schedule a leave to stay on track" fields={fields} />}
      </div>
    </>
  );
};

const renderEventContent = (eventInfo: any) => {
  const colorClass = `fc-bg-${eventInfo.event.extendedProps.calendar.toLowerCase()}`;
  return (
    <div
      className={`event-fc-color flex flex-row justify-start items-center fc-event-main ${colorClass} p-1 rounded`}
    >
      <div className="w-5">
        <div className="fc-daygrid-event-dot"></div>
      </div>
      <div>
        <div className="fc-event-time text-gray-400">{eventInfo.event.start?.toISOString().split("T")[0]} - {eventInfo.event.end?.toISOString().split("T")[0]}</div>
        <div className="fc-event-title">{eventInfo.event.title}</div>
      </div>
    </div>
  );
};

export default LeaveRequest;
