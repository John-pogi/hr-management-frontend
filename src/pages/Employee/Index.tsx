import CustomQuery from "../../components/CustomQuery";
import PageMeta from "../../components/common/PageMeta";
import CustomTable from "../../components/CustomTable";
import type { ChangeEvent } from "react";
import { apiGet, apiFetch } from "../../api/ApiHelper";
import endpoints from "../../endpoint.ts";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import Button from "../../components/ui/button/Button";
import { Employee, Company, Department, PageQuery, TableHeader } from "../../type/interface"

export default function Employees() {
  const queryClient = useQueryClient();

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

  interface employeeResponse {
    data: Employee[];
  }
  
  const { data: response } = useQuery<employeeResponse>({
    queryKey: ["employees", pageQuery],
    queryFn: () => {console.log(pageQuery.search); return apiGet(endpoints.employees, pageQuery)},
    initialData: { data: [] },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => apiGet(`${endpoints.employees}/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });

  interface companyResponse {
    data: Company[];
  }

  const { data: companies } = useQuery<companyResponse>({
    queryKey: ["companiesAPI"],
    queryFn: ()=> apiFetch(endpoints.companies),
    initialData: { data: [] },
  });

  interface departmentResponse {
    data: Company[];
  }

  const { data: departments } = useQuery<departmentResponse>({
    queryKey: ["departmentsAPI"],
    queryFn: ()=> apiFetch(endpoints.departments),
    initialData: { data: [] },
  });
  
  const [employee, setEmployee] = useState({
    fullname: "",
    email: "",
    position: "",
    contact: "",
    department: "",
    company: "",
  })

  const filterFields = [
    {
      kind: "select" as const,
      name: "company",
      label: "Company",
      placeholder: "Select company",
      options: [
        { value: "", label: "All Companies" },
        ...(Array.isArray(companies) ? companies.map((company: Company) => ({ 
          label: company.name, 
          value: String(company.id),
        })) : [])
      ],
      defaultValue: pageQuery.company || undefined,
      onChange: (e: ChangeEvent<HTMLSelectElement>) => setPageQuery((prev) => ({...prev, company: e.target.value})),
    },
    {
      kind: "select" as const,
      name: "department",
      label: "Department",
      placeholder: "Select department",
      options: [
        { value: "", label: "All Department" },
        ...(Array.isArray(departments) ? departments.map((department: Department) => ({ 
          label: department.name, 
          value: String(department.id),
        })) : [])
      ],
      defaultValue: pageQuery.department || undefined,
      onChange: (e: ChangeEvent<HTMLSelectElement>) => setPageQuery((prev) => ({...prev, department: e.target.value})),
    },
  ];

  const addFields = [
    {
      kind: 'basic' as const,
      type: "text" as const,
      name: "fullname",
      label: "Full Name",
      placeholder: "Enter employee's full name",
      defaultValue: employee.fullname,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setEmployee((prev) => ({...prev, fullname: e.target.value})),
    },
    {
      kind: 'basic' as const,
      type: "email" as const,
      name: "email",
      label: "Email",
      placeholder: "Enter employee's email",
      defaultValue: employee.email,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setEmployee((prev) => ({...prev, email: e.target.value})),
    },
    {
      kind: 'basic' as const,
      type: "text" as const,
      name: "position",
      label: "Position",
      placeholder: "Enter employee's position",
      defaultValue: employee.position,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setEmployee((prev) => ({...prev, position: e.target.value})),
    },
    {
      kind: 'basic' as const,
      type: "text" as const,
      name: "contact",
      label: "Contact",
      placeholder: "Enter employee's contact",
      defaultValue: employee.contact,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setEmployee((prev) => ({...prev, contact: e.target.value})),
    },
    {
      kind: "select" as const,
      name: "company",
      label: "Company",
      placeholder: "Select company",
      options: [
        ...(Array.isArray(companies) ? companies.map((company: Company) => ({ 
          label: company.name, 
          value: String(company.id),
        })) : [])
      ],
      defaultValue: employee.company,
      onChange: (e: React.ChangeEvent<HTMLSelectElement>) => setEmployee((prev) => ({...prev, company: e.target.value})),
    },
    {
      kind: "multi-select" as const,
      name: "department",
      label: "Department",
      placeholder: "Select department",
      options: [
        ...(Array.isArray(departments) ? departments.map((department: Department) => ({ 
          label: department.name, 
          value: String(department.id),
        })) : [])
      ],
      defaultValue: employee.department,
      onChange: (e: React.ChangeEvent<HTMLSelectElement>) => setEmployee((prev) => ({...prev, department: e.target.value})),
    },
  ];

  const header: TableHeader<Employee>[] = [
    {
      text: "#",
      key: "index",
      actionFormatter: (_, index) => index + 1,
    },
    {
      text: "Full Name",
      key: "fullname",
    },
    {
      text: "Email",
      key: "email",
    },
    {
      text: "Position",
      key: "position",
    },
    {
      text: "Contact",
      key: "contact",
    },
    {
      text: "Departments",
      key: "department",
      actionFormatter: (employee: Employee) => {
        const departments = employee.department;
        if (!departments) return "--";
  
        const department = Array.isArray(departments) ? departments : [departments];
        
        return department.reduce((prev, curr) => 
          prev ? `${prev}, ${curr.name}` : curr.name, ""
        );
      },
    },
    {
      text: "Company",
      key: "company",
      valueFormatter: (_value, _index, row: Employee) => {
        const company = row?.company;
        if (!company || company.length === 0) return "--";
        return company[0]?.name || "--";
      },
    },
    {
      text: "Action",
      key: "id",
      actionFormatter: (employee: Employee) => (
        <ActionButton
          employee={employee}
          onView={() => console.log("View", employee.id)}
          onEdit={() => console.log("Edit", employee.id)}
          onDelete={() => deleteMutation.mutate(employee.id)}
          isDeleting={deleteMutation.isPending}
        />
      ),
    },
  ];

  const handleAddSubmit = () => {
    console.log(employee.fullname);
    console.log(employee.email);
    console.log(employee.position);
    console.log(employee.contact);
    console.log(employee.department);
    console.log(employee.company);
  }

  const handleFilterSubmit = () => {
    console.log(pageQuery.company);
    console.log(pageQuery.department);
  }

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
          addFields={addFields}
          handleAddSubmit={handleAddSubmit}
          handleFilterSubmit={handleFilterSubmit}
        >
          <CustomTable<Employee>
            header={header} 
            data={response.data || []} 
          />
        </CustomQuery>
      </div>
    </>
  );
}

interface ActionButtonProps {
  employee: Employee;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
  isDeleting?: boolean;
}

const ActionButton = ({ onView, onEdit, onDelete }: ActionButtonProps) => (
  <div className="flex justify-center gap-3">
    <Button size="sm" className="!text-green-500" variant="outline" onClick={onView}>
      <svg
        className="w-4 h-4 mr-1 fill-current"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"/>
      </svg>
      View
    </Button>
    <Button size="sm" className="!text-blue-500" variant="outline" onClick={onEdit}>
      <svg
        className="fill-current"
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z"
          fill=""
        />
      </svg>
      Edit
    </Button>
    <Button size="sm" className="!text-red-500" variant="outline" onClick={onDelete}>
      <svg  xmlns="http://www.w3.org/2000/svg" width="19" height="24" fill="currentColor" viewBox="0 0 24 24" >
        <path d="M17 6V4c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v2H2v2h2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8h2V6zM9 4h6v2H9zM6 20V8h12v12z"></path><path d="M9 10h2v8H9zM13 10h2v8h-2z"></path>
      </svg>
      Delete
    </Button>
  </div>
);