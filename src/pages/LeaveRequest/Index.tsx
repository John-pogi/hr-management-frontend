import { useState, useRef, useMemo } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { EventInput, DateSelectArg } from "@fullcalendar/core";
import PageMeta from "../../components/common/PageMeta";
import Modal from "../../components/Modal";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiFetch, apiPost } from "../../api/ApiHelper";
import endpoints from "../../endpoint.ts";
import { Leave } from "../../type/interface"

interface CalendarEvent extends EventInput {
  extendedProps: {
    calendar: string;
  };
}

const LeaveRequest: React.FC = () => {

  const employeeID = 1;

  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null
  );

  const [eventTitle, setEventTitle] = useState("");
  const [eventStartDate, setEventStartDate] = useState("");
  const [eventEndDate, setEventEndDate] = useState("");
  const [eventPromoCode, setEventPromoCode] = useState("");
  const calendarRef = useRef<FullCalendar>(null);
  const [modal, setModal] = useState(false);
  
  const { data: leaveTypes } = useQuery({
    queryKey: ["leaveTypesAPI"],
    queryFn: () => apiFetch(endpoints.leaveTypes),
    initialData: [],
  });
  
  const { data: employeeLeaves, refetch: refetchEmployeeLeaves } = useQuery({
    queryKey: ["employeeLeavesAPI"],
    queryFn: () => apiFetch(endpoints.employeeLeaves(employeeID)),
    initialData: [],
  });
  
  const handleCloseModal = () => {
    setModal(false);
  }

  const renderDate = (date: Date | string | number): string => {
    if (!date) return "";
    
    const tempDate = new Date(date);
    tempDate.setDate(tempDate.getDate() - 1);
    
    const year = String(tempDate.getFullYear());
    const month = String(tempDate.getMonth() + 1).padStart(2, '0');
    const day = String(tempDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const processDate = (date: Date | string | number): string => {
    if (!date) return "";
    
    const tempDate = new Date(date);
    tempDate.setDate(tempDate.getDate() + 1);
    
    const year = String(tempDate.getFullYear());
    const month = String(tempDate.getMonth() + 1).padStart(2, '0');
    const day = String(tempDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const eventLeaves = useMemo(()=>{
    
    return employeeLeaves.map((leave: Leave) => ({
      ...leave,
      title: leave?.leave_type?.name,
      start: leave.start_date,
      end: leave.end_date,
      calendar: leave.status
    }));

  },[employeeLeaves]);

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    resetModalFields();
    setEventStartDate(selectInfo.startStr);
    setEventEndDate(renderDate(selectInfo.endStr));
    setModal(true);
  };

  interface LeaveParams {
    employee_id: number;
    start_date: string | Date;
    end_date: string | Date;
    leave_type_id: number;
  }

  const leaveMutation = useMutation<any, Error, LeaveParams>({
    mutationFn: (leave: LeaveParams) => apiPost(endpoints.leaveRequest, leave),
    onSuccess: refetchEmployeeLeaves
  });

  interface SubmitData {
    requestType: number;
    promoCode?: string;
    startDate: string | Date;
    endDate: string | Date;
  }

  const handleAddOrUpdateEvent = async (data: Record<string, unknown>) => {
    const e = data as unknown as SubmitData;
    if (selectedEvent) {
      console.error("Cannot create new leave while editing existing event");
      return;
    }
    
    if (!e.requestType) {
      console.error("Please select a request type.");
      return;
    }

    if (e.requestType === 0 && !e.promoCode) {
      console.error("Please provide your promo code.");
      return;
    }

    leaveMutation.mutate(
      {
        employee_id: employeeID,
        start_date: e.startDate,
        end_date: processDate(e.endDate),
        leave_type_id: e.requestType,
      },
      {
        onSuccess: () => {
          handleCloseModal();
          resetModalFields();
        },
        onError: (error) => {
          console.error("Leave request failed:", error);
        }
      }
    );
  };

  const resetModalFields = () => {
    setEventTitle("");
    setEventStartDate("");
    setEventEndDate("");
    setEventPromoCode("");
    setSelectedEvent(null);
  };

  const fields = useMemo(()=>{

    const leaveTypeFilter =  {
      type: 'select',
      name: "requestType",
      label: "Request Type",
      placeholder: "Select an option",
      options:  leaveTypes.map((leaveType: Leave) => ({value: leaveType.id, label: leaveType.leave_type?.name})),
      defaultValue: eventTitle,
    };

    return [
      leaveTypeFilter,
      {
        type: "date",
        name: "startDate",
        label: "Start Date",
        defaultValue: eventStartDate,
      },
      {
        type: "date",
        name: "endDate",
        label: "End Date",
        defaultValue: eventEndDate,
        min: eventStartDate,
      },
      ...(eventTitle && eventTitle === "Promo Leave" ? [{
        type: "text" as const,
        name: "promoCode",
        label: "Promo Code",
        placeholder: "Enter your promo code",
        defaultValue: eventPromoCode,
      }] : []),
     ];
  }, [leaveTypes, eventStartDate, eventEndDate]);

  return (
    <>
      <PageMeta
        title="Leave Request"
        description="This page handle leave request functionalities."
      />
      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="custom-calendar">
          <FullCalendar
          
          timeZone="UTC"
            ref={calendarRef}
            allDayClassNames='custom-scrollbar'
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: "addEventButton",
              center: "title",
            }}
            events={eventLeaves}
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
  
  let colorType = 'warning';

  switch(eventInfo.event.extendedProps.calendar){
    case 'approved':
      colorType = 'success';
      break;  
    case 'rejected':
      colorType = 'danger';
      break;  
  }

  const colorClass = `fc-bg-${colorType}`;
  
  const normalizeRenderDate = (date: Date | string | number): string => {
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
      className={`event-fc-color flex flex-row justify-start items-center fc-event-main ${colorClass} p-1 rounded mb-1`}
    >
      <div className="w-5">
        <div className="fc-daygrid-event-dot"></div>
      </div>
      <div>
        {eventInfo.event.end ? (
          <div className="fc-event-time text-gray-400  whitespace-normal text-wrap break-all">
            {normalizeRenderDate(eventInfo.event.start?.toISOString().split("T")[0])} - {normalizeRenderDate(eventInfo.event.end?.toISOString().split("T")[0])}
          </div>
        ) : (
          <div className="fc-event-time text-gray-400  whitespace-normal text-wrap break-all">
            {normalizeRenderDate(eventInfo.event.start?.toISOString().split("T")[0])}
          </div>
        )}
        <div className="fc-event-title whitespace-normal text-wrap break-all">{eventInfo.event.title}</div>
      </div>
    </div>
  );
};

export default LeaveRequest;
