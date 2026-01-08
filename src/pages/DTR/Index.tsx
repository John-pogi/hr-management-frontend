import ComponentFilter from "../../components/common/ComponentFilter";
import PageMeta from "../../components/common/PageMeta";
import CustomTable from "../../components/CustomTable";
import type { ChangeEvent } from "react";
import { apiGet, apiFetch } from "../../api/ApiHelper";
import endpoints from "../../enpoint";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { parse, format, minutesToHours, parseISO} from 'date-fns';
import { EOD, Company, PageQuery, TableHeader } from "../../types/Interface"

export default function Employees() {
  const [pageQuery, setPageQuery] = useState<PageQuery>({
    per_page: "10",
    page: "1",
    company_id: null,
    company: null,
    search: "",
    status: null,
    from: null,
    to: null,
    department: null,
  });

  interface EODResponse {
    data: EOD[];
  }
  
  const { data: response } = useQuery<EODResponse>({
    queryKey: ["eod", pageQuery],
    queryFn: () => {console.log(pageQuery.search); return apiGet(endpoints.eod, pageQuery)},
    initialData: { data: [] },
  });

  interface companyResponse {
    data: Company[];
  }

  const { data: companies } = useQuery<companyResponse>({
    queryKey: ["companiesAPI"],
    queryFn: ()=> apiFetch(endpoints.companies),
    initialData: { data: [] },
  });

  const filterFields = [
    {
      kind: "select" as const,
      name: "status",
      label: "Status",
      placeholder: "Select status",
      options: [
        { value: "", label: "All Status" },
        { value: "absent", label: "Absent" },
        { value: "partial", label: "Partial" },
        { value: "present", label: "Present" },
      ],
      defaultValue: pageQuery.status || undefined,
      onChange: (e: ChangeEvent<HTMLSelectElement>) => setPageQuery((prev) => ({...prev, status: e.target.value})),
    },
    {
      kind: "select" as const,
      name: "companies",
      label: "Companies",
      placeholder: "Select companies",
      options: [
        { value: "", label: "All Companies" },
        ...(Array.isArray(companies) ? companies.map((company: Company) => ({ 
          label: company.name, 
          value: String(company.id),
        })) : [])
      ],
      defaultValue: pageQuery.company_id || undefined,
      onChange: (e: ChangeEvent<HTMLSelectElement>) => setPageQuery((prev) => ({...prev, company_id: e.target.value})),
    },
    {
      kind: 'basic' as const,
      type: "date" as const,
      name: "from",
      label: "From",
      defaultValue: pageQuery.from || undefined,
      onChange: (e: ChangeEvent<HTMLInputElement>) => setPageQuery((prev) => ({...prev, from: e.target.value})),
    },
    {
      kind: 'basic' as const,
      type: "date" as const,
      name: "to",
      label: "To",
      defaultValue: pageQuery.to || undefined,
      min: pageQuery.from || undefined,
      onChange: (e: ChangeEvent<HTMLInputElement>) => setPageQuery((prev) => ({...prev, to: e.target.value})),
    },
  ];

  const addFields = [
    {
      kind: 'dropzone' as const,
      name: "file",
      label: "File",
    },
  ];

  const header: TableHeader<EOD>[] = [
    {
      text: '#',
      key: 'index',
      actionFormatter: (_, index) => index + 1,
    },
    {
      text: "Employee",
      key: "employee_name",
      valueFormatter: (_value, _index, row: EOD) => {
        const employee = row?.employee;
        if (!employee) return "--";
        return (
          <div className="flex flex-col">
            <span className="font-semibold">{employee?.name || '--'}</span>
            <span className="text-sm text-gray-500">{employee?.company_name || '--'}</span>
          </div>
        )
      },
    },
    {
      text: "Employee Number",
      key: "employee_number",
      valueFormatter: (_value, _index, row: EOD) => {
        const employee = row?.employee;
        if (!employee) return "--";
        return employee?.employee_number || '--';
      },
    },
    {
      text: 'Date',
      key: 'date',
    },
    {
      text: 'Time In',
      key: 'time_in',
      valueFormatter: (_value, _index, row: EOD) => {
        const time = row?.time_in;
        if (!time) return "--";
        return format(parse(time, 'HH:mm:ss', new Date()), 'hh:mm a') || '--';
      },
    },
    {
      text: 'Time Out',
      key: 'time_out',
      valueFormatter: (_value, _index, row: EOD) => {
        const time = row?.time_out;
        if (!time) return "--";
        return format(parse(time, 'HH:mm:ss', new Date()), 'hh:mm a') || '--';
      },
    },
    {
      text: 'Work Duration',
      key: 'total_minutes',
      valueFormatter: (_value, _index, row: EOD) => {
        const time = row?.total_minutes;
        if (!time) return "--";
        const hours = minutesToHours(time);
        const minutesLeft = time - (hours * 60);
        return `${String(hours).padStart(2, '0')}:${String(minutesLeft).padStart(2, '0')}`;
      },
    },
    {
      text: 'Late Minutes',
      key: 'late_minutes',
      valueFormatter: (_value, _index, row: EOD) => {
        const time = row?.late_minutes;
        if (!time) return "--";
        return time;
      },
    },
    {
      text: 'Overtime Minutes',
      key: 'overtime_minutes',
      valueFormatter: (_value, _index, row: EOD) => {
        const time = row?.overtime_minutes;
        if (!time) return "--";
        return time;
      },
    },
    {
      text: 'Shift',
      key: 'shift',
      valueFormatter: (_value, _index, row: EOD) => {
        if (!row?.shift_start || !row?.shift_end) return '--';
        try {
          const shift_start = parseISO(row.shift_start);
          const shift_end = parseISO(row.shift_end);
          return `${format(shift_start, 'hh:mm a')} - ${format(shift_end, 'hh:mm a')}`;
        } catch {
          return '--';
        }
      },
    },
    {
      text: 'Note',
      key: 'note',
      valueFormatter: (_value, _index, row: EOD) => {
        const note = row?.note;
        if (!note) return "--";
        return note;
      },
    },
  ];

  const handleAddSubmit = () => {
    console.log('test add submit');
  }

  const handleFilterSubmit = () => {
    console.log(pageQuery.company_id);
    console.log(pageQuery.status);
    console.log(pageQuery.from);
    console.log(pageQuery.to);
  }

  return (
    <>
      <PageMeta
        title="Manage Employees"
        description="This page handle employee CRUD functionalities."
      />
      <div className="space-y-6">
        <ComponentFilter 
          pageQuery={pageQuery} 
          setPageQuery={setPageQuery} 
          filterFields={filterFields} 
          addFields={addFields}
          handleAddSubmit={handleAddSubmit}
          handleFilterSubmit={handleFilterSubmit}
        >
          <CustomTable<EOD>
            header={header} 
            data={response.data || []} 
          />
        </ComponentFilter>
      </div>
    </>
  );
}