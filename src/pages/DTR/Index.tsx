import ComponentFilter, { PageQuery } from "../../components/common/ComponentFilter";
import PageMeta from "../../components/common/PageMeta";
import CustomTable, { TableHeader } from "../../components/CustomTable";
import type { ChangeEvent } from "react";
import { apiGet, apiFetch } from "../../api/ApiHelper";
import endpoints from "../../enpoint";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { parse, format, minutesToHours, parseISO} from 'date-fns';

interface EOD {
  id: number;
  employee_id: number;
  date: string;
  time_in: string | null;
  time_out: string | null;
  total_minutes: number;
  shift_start: string;
  shift_end: string;
  employee: {
    id: number;
    name: string;
    employee_number: string;
    company_name: string;
  };
}

interface ApiResponse {
  data: EOD[];
}

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
  
  const { data: response } = useQuery<ApiResponse>({
    queryKey: ["eod", pageQuery],
    queryFn: () => {console.log(pageQuery.search); return apiGet(endpoints.eod, pageQuery)},
    initialData: { data: [] },
  });

  const { data: companies } = useQuery({
    queryKey: ["companiesAPI"],
    queryFn: ()=> apiFetch(endpoints.companies),
    initialData: [],
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
      ...(Array.isArray(companies) ? companies.map((company: any) => ({ 
        label: company.name, 
        value: company.id.toString() 
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

  const header = [
    {
      text: '#',
      key: 'id',
      actionFormatter: (_row: any, index: number) => index + 1,
    },
    {
      text: 'Employee',
      key: 'employee_name',
      actionFormatter: (row: any) => (
        <div className="flex flex-col">
          <span className="font-semibold">{row.employee?.name || '--'}</span>
          <span className="text-sm text-gray-500">{row.employee?.company_name || '--'}</span>
        </div>
      ),
    },
    {
      text: 'Employee Number',
      key: 'employee_number',
      actionFormatter: (row: any) => row.employee?.employee_number || '--',
    },
    {
      text: 'Date',
      key: 'date',
    },
    {
      text: 'Time In',
      key: 'time_in',
      valueFormatter: (value: string) => {
        if (!value) return '--';
        const timeDate = parse(value, 'HH:mm:ss', new Date());
        return format(timeDate, 'hh:mm a');
      },
    },
    {
      text: 'Time Out',
      key: 'time_out',
      valueFormatter: (value: string) => {
        if (!value) return '--';
        const timeDate = parse(value, 'HH:mm:ss', new Date());
        return format(timeDate, 'hh:mm a');
      },
    },
    {
      text: 'Work Duration',
      key: 'total_minutes',
      valueFormatter: (value: number) => {
        if (!value) return '--';
        const hours = minutesToHours(value);
        const minutesLeft = value - (hours * 60);
        return `${String(hours).padStart(2, '0')}:${String(minutesLeft).padStart(2, '0')}`;
      },
    },
    {
      text: 'Late Minutes',
      key: 'late_minutes',
      valueFormatter: (value: number) => value || '--',
    },
    {
      text: 'Overtime Minutes',
      key: 'overtime_minutes',
      valueFormatter: (value: number) => value || '--',
    },
    {
      text: 'Shift',
      key: 'shift',
      actionFormatter: (row: any) => {
        if (!row.shift_start || !row.shift_end) return '--';
        try {
          const startShift = parseISO(row.shift_start);
          const endShift = parseISO(row.shift_end);
          return `${format(startShift, 'hh:mm a')} - ${format(endShift, 'hh:mm a')}`;
        } catch {
          return '--';
        }
      },
    },
    {
      text: 'Note',
      key: 'note',
      actionFormatter: (row: any) => row.on_leave ? 'On Leave' : '--',
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
          <CustomTable header={header as TableHeader<EOD>[]} data={response.data || []} />
        </ComponentFilter>
      </div>
    </>
  );
}