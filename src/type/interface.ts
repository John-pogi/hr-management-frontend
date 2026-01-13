import { ReactNode } from "react";

export interface InputInterface {
  name: string;
  placeholder?: string;
  defaultValue?: string;
  defaultSelected?: string[];
  className?: string;
  min?: number | string;
  max?: number | string;
  step?: number;
  disabled?: boolean;
  success?: boolean;
  error?: boolean;
  hint?: string;
  value?: string;
  checked?: boolean;
  label?: string;
  desc?: string;
  allSelection?: OptionInterface;
  rows?: number;
}

export interface OptionInterface {
  value: string;
  label: string;
}

export interface CommonField extends InputInterface {
  type: "text" | "number" | "email" | "password" | "date" | "time";
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface SelectField extends InputInterface {
  type: "select";
  options?: OptionInterface[];
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export interface MultiSelectField extends InputInterface {
  type: "multi-select";
  options?: OptionInterface[];
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export interface TextAreaField extends InputInterface {
  type: "textarea";
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface CheckBoxField extends InputInterface {
  type: "checkbox";
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface FileField extends InputInterface {
  type: "file";
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export type Field = CommonField | SelectField | MultiSelectField | TextAreaField | CheckBoxField | FileField;

export interface Employee {
  id: number;
  fullname: string;
  email: string;
  position: string;
  contact: string;
  company: Company[],
  department: Department[],
}

export interface Company {
  id: number,
  name: string,
  code: string,
  logo: string | null,
  created_at: string,
  updated_at: string,
  department: Department[],
}

export interface Department {
  id: number,
  name: string,
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
  start_date: string;
  end_date: string;
  note: boolean;
  employee: {
    id: number;
    name: string;
    employee_number: string;
    company_name: string;
    slCredit: string;
    vlCredit: string;
  };
}

export interface Leave {
  id: number;
  start_date: string;
  end_date: string;
  status: string;
  leave_type: { name: string } | null;
  notes: string;
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