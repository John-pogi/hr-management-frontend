import { useState, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { EventInput, DateSelectArg } from "@fullcalendar/core";
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
  const [modal, setModal] = useState(false);

  const handleCloseModal = () => {
    setModal(false);
  }

  const normalizeEndDate = (date: any): string => {
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
    setEventEndDate(normalizeEndDate(selectInfo.endStr));
    setModal(true);
  };

  const handleAddOrUpdateEvent = () => {
    try {
      if (selectedEvent) throw console.error("stop update");
      if (!eventTitle) throw console.error("Please select a request type.");
      if (eventTitle === "Promo Leave" && !eventPromoCode) throw console.error("Please provide your promo code.");
      const newEvent: CalendarEvent = {
        id: Date.now().toString(),
        title: eventTitle,
        start: eventStartDate,
        end: eventEndDate,
        allDay: true,
        extendedProps: { calendar: "warning" },
      };
      setEvents((prevEvents) => [...prevEvents, newEvent]);
      handleCloseModal();
      resetModalFields();
    } catch(err) {
      console.log(err)
    } finally {
      console.log(eventTitle)
      console.log(eventStartDate)
      console.log(eventEndDate)
      console.log(eventPromoCode)
    }
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
      defaultValue: eventTitle,
      onChange: (e) => setEventTitle(e.target.value),
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
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setEventPromoCode(e.target.value),
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
  
  const normalizeRenderDate = (date: any): string => {
    if (!date) return "";
    
    const tempDate = new Date(date);
    tempDate.setDate(tempDate.getDate() + 1);
    
    const year = String(tempDate.getFullYear());
    const month = String(tempDate.getMonth() + 1).padStart(2, '0');
    const day = String(tempDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <div
      className={`event-fc-color flex flex-row justify-start items-center fc-event-main ${colorClass} p-1 rounded`}
    >
      <div className="w-5">
        <div className="fc-daygrid-event-dot"></div>
      </div>
      <div>
        {eventInfo.event.end ? (
          <div className="fc-event-time text-gray-400">
            {normalizeRenderDate(eventInfo.event.start?.toISOString().split("T")[0])} - {normalizeRenderDate(eventInfo.event.end?.toISOString().split("T")[0])}
          </div>
        ) : (
          <div className="fc-event-time text-gray-400">
            {normalizeRenderDate(eventInfo.event.start?.toISOString().split("T")[0])}
          </div>
        )}
        <div className="fc-event-title">{eventInfo.event.title}</div>
      </div>
    </div>
  );
};

export default LeaveRequest;
