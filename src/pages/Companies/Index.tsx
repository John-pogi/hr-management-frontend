import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import { useState } from "react";
import Modal, { InputProps } from "../../components/modal";
import CustomTable from "../../components/tables/CustomTable";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import endpoints from "../../enpoint";
import Button from "../../components/ui/button/Button";
import Pagination from "../../components/pagination/Pagination";
import { apiGet, apiPost, apiPut, apiDelete } from "../../api/ApiHelper";
import { Company } from "../../types/Company";
import { CompanyModal } from "../../types/CompanyModal";

export default function Blank() {
  const queryClient = useQueryClient();
  const [modal, setModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const fields: InputProps[] = [
    {
      kind: 'basic',
      type: "text",
      name: "name",
      label: "Name",
      placeholder: "Enter your text",
      defaultValue: selectedCompany?.name ? selectedCompany.name : "",
    },
    {
      kind: 'basic',
      type: "text",
      name: "code",
      label: "Code",
      placeholder: "Enter your text",
      defaultValue: selectedCompany?.code ? selectedCompany.code : "",
    },
  ];

  // const [editForm, setEditForm] = useState({
  //   isOpen: false,
  //   fields: [
  //     {
  //       kind: 'basic',
  //       type: "text",
  //       name: "name",
  //       label: "Name",
  //       placeholder: "Enter your text",
  //       defaultValue: null,
  //     },
  //     {
  //       kind: 'basic',
  //       type: "text",
  //       name: "code",
  //       label: "Code",
  //       placeholder: "Enter your text",
  //       defaultValue: null,
  //     },
  //   ]
  // });

  const [pageQuery, setPageQuery] = useState({
    per_page: 10,
    page:1,
  });

  const { data: companies } = useQuery({
    queryKey: ["companies", pageQuery],
    queryFn: ()=> apiGet(endpoints.companies,pageQuery),
    initialData: [],
  });

  console.log("Companies:", companies);
  console.log("Selected Company:", selectedCompany);
  
  const companyTableHeader = [
    {
      text: '#',
      key: 'id',
      actionFormater(value, index) {
          return index + 1;
      },
    },
    {
      text: 'Name',
      key: 'name'
    },
    {
      text: 'Code',
      key: 'code'
    },
    {
      text: 'Departments',
      key: 'departments',
      valueFormater: (value, index)=> {

        if(value.length <= 0){
          return '--';
        }

        return value.reduce((prev,current)=> prev.length ?  `${prev}, ${current?.name}` :  current?.name , '');
       },
    },
     {
        text: 'Action',
        key: 'action',
        actionFormater(value, index) {
            return <ActionButton  company={value} />
        },
    },
  ];

  const ActionButton = ({ company }: { company: Company }) => {
    const queryClient = useQueryClient();

    const handleEditClick = () => {
      setSelectedCompany(company);
      setModal(true);
      setIsEditing(true);
    };

    const handleOnClickDelete = async () => {
      const confirmed = window.confirm(`Are you sure you want to delte this ${company.name}?`);

      if (confirmed) {
        try {
          await apiDelete(`${endpoints.companies}/${company.id}`);
          queryClient.invalidateQueries({ queryKey: ["companies"] });
        } catch (error) {
          console.error("Deletion failed:", error);
          alert("Could not delete the company. Please try again.");
        }
      }
    };

    return <>
      <div className="flex items-center gap-2">
        <Button onClick={handleEditClick} variant="outline" size="sm">Edit</Button>
        <Button variant="outline" size="sm" onClick={handleOnClickDelete}>Delete</Button>
      </div>
    </>
  };

  const handleCloseModal = () => {
    setModal(false);
    setIsEditing(false);
    setSelectedCompany(null);
  }
  
  const handleSubmit = async (formData: CompanyModal) => {
    try {
      if (isEditing && selectedCompany) {
        await apiPut(`${endpoints.companies}/${selectedCompany.id}`, formData);
      } else {
        await apiPost(endpoints.companies, formData);
      }
      queryClient.invalidateQueries({ queryKey: ["companies"] });
    } catch (error) {
      console.error(error);
    }
  }
    
  return (
    <div>
      <PageMeta
        title="Leaves Dashboard | TailAdmin"
        description="This is Leaves Dashboard for TailAdmin"
      />

      <PageBreadcrumb pageTitle="Companies" />


      <div className="flex gap-1 justify-between mb-2">
        <Button
        onClick={()=> setModal(true)}
        >
          Add Company
        </Button>

        <Pagination 
          onChange={(perPage)=> setPageQuery(prev => ({...prev, page: 1, per_page: perPage}))}
          isPrevDisabled={pageQuery.page <= 1}
          isNextDisabled={pageQuery.page >= companies?.last_page}
          onClickPrev={(e)=> setPageQuery(prev => ({...prev, page: prev.page <= 1 ? 1 : prev.page -1 }))  }
          onClickNext={(e)=> setPageQuery(prev => ({...prev, page:  prev.page < companies?.last_page ? prev.page + 1: prev.page }))  }
          page={pageQuery.page}
          perPage={pageQuery.per_page}
          total={companies?.total}
        />
      </div>     

      <CustomTable 
        header={companyTableHeader}
        data={companies?.data ?? []}
      />

      {modal && (
        <Modal 
          style="pop-up" 
          close={handleCloseModal} 
          desc={isEditing ? "Update company details" : "Add a new company"} 
          title="Company" 
          fields={fields} 
          submit={handleSubmit} 
        />
      )}

      {/* {(isEditing && modal) && <Modal style="pop-up" close={handleCloseModal}  desc="add new company to the list" title="Company" fields={fields} submit={handleSubmit} />} */}
    
      {/* {editForm.isOpen && <Modal  style="pop-up" close={()=> setEditForm(prev => ({...prev, isOpen: false}))}  desc="update company details" title="Company" fields={editForm.fields} />} */}
    
    </div>
  );
}
