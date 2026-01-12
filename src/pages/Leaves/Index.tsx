import CustomQuery from "../../components/CustomQuery";
import PageMeta from "../../components/common/PageMeta";
import CustomTable from "../../components/CustomTable";
import type { ChangeEvent } from "react";
import { apiGet, apiFetch } from "../../api/ApiHelper";
import endpoints from "../../endpoint.ts";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { PageQuery, TableHeader } from "../../type/interface"

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
  
  const { data: companies } = useQuery({
    queryKey: ["companiesAPI"],
    queryFn: ()=> apiFetch(endpoints.companies),
    initialData: [],
  });
  
  const { data: leaves } = useQuery<ApiResponse>({
    queryKey: ["leaves", pageQuery],
    queryFn: ()=> apiGet(endpoints.leaveRequest, pageQuery),
    initialData: { data: [] },
  });

  const filterFields = [
    {
      type: "select" as const,
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
      type: "select" as const,
      name: "company_id",
      label: "Companies",
      placeholder: "Select companies",
      options: [
        { value: "", label: "All Companies" },
        ...(Array.isArray(companies) ? companies.map((company: any) => ({ 
          label: company.name, 
          value: company.id.toString() 
        })) : [])
      ],
    },
    {
      type: "date" as const,
      name: "from",
      label: "From",
    },
    {
      type: "date" as const,
      name: "to",
      label: "To",
      defaultValue: pageQuery.to || undefined,
      min: pageQuery.from || undefined,
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
      text: 'Available Credit',
      key: 'employee.deparment_name',
      actionFormatter: (row: any) => (
        <div className="grid grid-cols-[23px_1fr]">
          <span className="font-semibold text-gray-500 border-r border-gray-500">SL</span>
          <span className="font-bold ms-2">{row?.employee?.slCredit}</span>
          <span className="font-semibold text-gray-500 border-r border-gray-500">VL</span>
          <span className="font-bold ms-2">{row?.employee?.vlCredit}</span>
        </div>
      ),
    },
     {
      text: 'Leave Credit',
      key: 'valid_credit',
    },
    {
      text: 'Duration',
      key: 'duration',
      actionFormatter: (row: any) => (
        <div>
          <span className="font-bold ms-2">{row?.start_date} <span className="text-gray-500">-</span> {row?.end_date}</span>
        </div>
      ),
    },
    {
      text: 'Request Type',
      key: 'leave_type.name',
      actionFormatter: (row: any) => (
        <div className="flex flex-col">
          <span className="font-semibold">{row.leave_type?.name || '--'}</span>
          <span className="text-sm text-gray-500">{row.notes || '--'}</span>
        </div>
      ),
    },
    {
      text: 'Attachment',
      key: 'attachment',
    },
    {
      text: 'Status',
      key: 'status',
    },
  ];

  interface SubmitData {
    company_id: number;
    status: string;
    from: string;
    to: string;
  }

  const handleFilterSubmit = (data: Record<string, unknown>) => {
    const e = data as unknown as SubmitData;
    setPageQuery((prev) => ({
      ...prev,
      page: "1",
      company_id: String(e.company_id ?? null),
      status: e.status ?? null,
      from: e.from ?? null,
      to: e.to ?? null,
    }));
  };

  return (
    <>
      <PageMeta
        title="Manage Employees"
        description="This page handle employee CRUD functionalities."
      />
      <div className="space-y-6">
        <CustomQuery 
          pageQuery={pageQuery} 
          setPageQuery={setPageQuery} 
          filterFields={filterFields} 
          handleFilterSubmit={handleFilterSubmit}
        >
          <CustomTable header={header as TableHeader<EOD>[]} data={leaves.data || []} />
        </CustomQuery>
      </div>
    </>
  );
}