import { ReactNode } from "react";

export interface Employee {
    id: number;
    fullname: string;
    email: string;
    position: string;
    contact: string;
    company: Array<{ 
        id: number,
        name: string,
        code: string,
        logo: string | null,
        created_at: string,
        updated_at: string,
    }>;
    department: Array<{
        id: number,
        name: string,
    }>;
}

export interface Company {
    id: number,
    name: string,
    code: string,
    logo: string | null,
    created_at: string,
    updated_at: string,
    department: Array<{
        id: number,
        name: string,
    }>;
}

export interface EOD {
  id: number;
  employee_id: number;
  date: string;
  time_in: string | null;
  time_out: string | null;
  total_minutes: number;
  late_minutes: number;
  overtime_minutes: number;
  shift_start: string;
  shift_end: string;
  note: boolean;
  employee: {
    id: number;
    name: string;
    employee_number: string;
    company_name: string;
  };
}

export interface Leave {
    id: number;
    start_date: string;
    end_date: string;
    status: string;
    leave_type: { name: string } | null;
}

export interface PageQuery {
    per_page: string;
    page: string;
    company: string | null;
    department: string | null;
    search: string;
    from: string | null;
    to: string | null;
    company_id: string | null;
    status: string | null;
}

export interface TableHeader<T> {
    text: string;
    key: keyof T | string;
    isDisabled?: boolean;
    colSpan?: number;
    rowSpan?: number;
    actionFormatter?: (row: T, index: number) => ReactNode;
    valueFormatter?: (value: T[keyof T], index: number, row: T) => React.ReactNode;
}