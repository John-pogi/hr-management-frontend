import CustomQuery from "../../components/CustomQuery";
import PageMeta from "../../components/common/PageMeta";
import CustomTable from "../../components/CustomTable";
import Button from "../../components/ui/button/Button";
import { apiGet, apiDeletee } from "../../api/ApiHelper";
import endpoints from "../../endpoint";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Company, PageQuery, TableHeader } from "../../type/interface"

export default function Companies() {
  const queryClient = useQueryClient();
  //Unfinished/Testing
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

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

  interface ApiResponse {
    data: Company[];
  }

  const { data: response } = useQuery<ApiResponse>({
    queryKey: ["companies", pageQuery],
    queryFn: () => {console.log(pageQuery.search); return apiGet(endpoints.companies, pageQuery)},
    initialData: { data: [] },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => apiDelete(`${endpoints.companies}/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["companies"] });
    },
  });

  const addFields = [
    {
      type: "text" as const,
      name: "name",
      label: "Name",
      placeholder: "Enter company's name",
    },
    {
      type: "text" as const,
      name: "code",
      label: "Code",
      placeholder: "Enter company's code",
    },
    {
      type: "multi-select" as const,
      name: "department",
      label: "Department",
      placeholder: "Select department",
      options: [
        { value: "IT-Dev", label: "IT-Dev" },
        { value: "CMT", label: "CMT" },
        { value: "Dev-Ops", label: "Dev-Ops" },
        { value: "CS", label: "CS" },
        { value: "HR", label: "HR" },
      ],
    },
  ];
  // Unfinished/Testing
  const editFields = [
    {
      type: "text" as const,
      name: "name",
      label: "Name",
    },
    {
      type: "text" as const,
      name: "code",
      label: "Code",
    },
    {
      type: "multi-select" as const,
      name: "department",
      label: "Department",
      options: [
        { value: "IT-Dev", label: "IT-Dev" },
        { value: "CMT", label: "CMT" },
        { value: "Dev-Ops", label: "Dev-Ops" },
        { value: "CS", label: "CS" },
        { value: "HR", label: "HR" },
      ],
    },
  ];

  const handleEditClick = (company: Company) => {
    setSelectedCompany(company);
    setIsEditModalOpen(true);
  }

  
  const header: TableHeader<Company>[] = [
    {
      text: "#",
      key: "index",
      actionFormatter: (_, index) => index + 1,
    },
    {
      text: "Name",
      key: "name",
    },
    {
      text: "Code",
      key: "code",
    },
    {
      text: "Departments",
      key: "department",
      valueFormatter: (_value, _index, row: Company) => {
        const departments = row?.department;
        if (!departments || departments.length === 0) return "--";
        return departments.reduce((prev, curr) => 
          prev ? `${prev}, ${curr.name}` : curr.name, ""
        );
      },
    },
    {
      text: "Action",
      key: "id",
      actionFormatter: (company: Company) => (
        <ActionButton
          company={company}
          onEdit={() => handleEditClick(company)}
          onDelete={() => deleteMutation.mutate(company.id)}
          isDeleting={deleteMutation.isPending}
        />
      ),
    },
  ];

  interface SubmitData {
    name: number;
    code: string;
    department: string;
  }
  
  const handleAddSubmit = (data: Record<string, unknown>) => {
    const e = data as unknown as SubmitData;
    console.log(e.name);
    console.log(e.code);
    console.log(e.department);
  }

  
  return (
    <>
      <PageMeta
        title="Companies"
        description="This page handles company CRUD functionalities."
      />
      <div className="space-y-6">
        <CustomQuery 
          pageQuery={pageQuery} 
          setPageQuery={setPageQuery} 
          addFields={addFields}
          handleAddSubmit={handleAddSubmit}
        >
          <CustomTable<Company>
            header={header} 
            data={response.data || []} 
          />
        </CustomQuery>
      </div>
    </>
  );
}

interface ActionButtonProps {
  company: Company;
  onEdit: () => void;
  onDelete: () => void;
  isDeleting?: boolean;
}

const ActionButton = ({ onEdit, onDelete }: ActionButtonProps) => (
  <div className="flex justify-center gap-3">
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
