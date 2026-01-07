import PageMeta from "../../components/common/PageMeta";
import { useState } from "react";
import Modal, { InputProps } from "../../components/modal";
import CustomTable from "../../components/tables/CustomTable";
import { useQuery } from "@tanstack/react-query";
import endpoints from "../../enpoint";
import Pagination from "../../components/pagination/Pagination";
import { apiFetch, apiGet, apiPost } from "../../api/ApiHelper";
import { parse, format, minutesToHours, parseISO} from 'date-fns';
import Input from "../../components/form/input/InputField";
import Select from "../../components/form/Select";
import { browser } from 'convert-csv-to-json';

export default function Blank() {
  
  const [modal, setModal] = useState(false);

  const handleCloseModal = () => {
    setModal(false);
  }

  const fields: InputProps[] = [
    {
      kind: 'basic',
      type: "text",
      name: "test",
      label: "Name",
      placeholder: "Enter your text",
      defaultValue: null,
    },
     {
      kind: 'basic',
      type: "text",
      name: "code",
      label: "Code",
      placeholder: "Enter your text",
      defaultValue: null,
    },
  ];

  const [editForm, setEditForm] = useState({
    isOpen: false,
    fields: [
      {
        kind: 'basic',
        type: "text",
        name: "name",
        label: "Name",
        placeholder: "Enter your text",
        defaultValue: null,
      },
      {
        kind: 'basic',
        type: "text",
        name: "code",
        label: "Code",
        placeholder: "Enter your text",
        defaultValue: null,
      },
    ]
  });

  const [pageQuery, setPageQuery] = useState({
    per_page: 10,
    page:1,
    from: null,
    to: null,
    company_id: null,
    search: '',
    statue: ''
  });

  const { data: eod } = useQuery({
    queryKey: ["eod", pageQuery],
    queryFn: ()=> apiGet(endpoints.eod,pageQuery),
    initialData: [],
  });

  const { data: companies } = useQuery({
    queryKey: ["companiesAPI"],
    queryFn: ()=> apiFetch(endpoints.companies),
    initialData: [],
  });

  const eodTableHeader = [
    {
      text: '#',
      key: 'id',
      actionFormater(value, index) {
          return index + 1;
      },
    },
    {
      text: 'Employee',
      key: '',
      actionFormater(value: string, index) {
        return <div className="flex flex-col">
            <span className="font-semibold">{value?.employee?.name}</span>
            <span className="text-sm">{value?.employee?.company_name}</span>
        </div>
      },
    },
     {
      text: 'Employee Number',
      key: 'employee.employee_number'
    },
      {
      text: 'Date',
      key: 'date'
    },
    {
      text: 'Time IN',
      key: 'time_in',
      valueFormater(value: string, index) {
        
        if(!value){
          return '--'
        }

        const timeDate = parse(value, "HH:mm:ss", new Date());
        return format(timeDate, "hh:mm a");
      },
    },
     {
      text: 'Time OUT',
      key: 'time_out',
      valueFormater(value: string, index) {

        if(!value){
          return '--'
        }

        const timeDate = parse(value, "HH:mm:ss", new Date());
        return format(timeDate, "hh:mm a");
      },
    },
     {
      text: 'Work Duration',
      key: 'total_minutes',
      valueFormater(minutes: number, index) {
        
        const hours = minutesToHours(minutes);
        const minutesLeft = minutes - hours * 60;

        const stringifiedHours = String(hours).length === 1 ? `0${hours}` : `${hours}`;
        const stringifiedMinutes = String(minutesLeft).length === 1 ? `0${minutesLeft}` : `${minutesLeft}`;
        return `${stringifiedHours}:${stringifiedMinutes}`;

      }
    },
    {
      text: 'Shift',
      key: 'employee.company_name',
      actionFormater(value, index) {

        const startShift = parseISO(value?.shift_start);
        const endShift = parseISO(value?.shift_end);

        let shift =  `${format(startShift, "hh:mm a")} - ${format(endShift, "hh:mm a")}`

        return shift;
      },
    },
    {
      text: 'Note',
      key: '',
      actionFormater(value, index) {
          return value?.on_leave ? 'on leave' : '--';
      },
    },
  ];

  const handleDTRUpload = (csvJson) => {
    apiPost(endpoints.dtr, {
        
    });
  }

  return (
    <div>


      <PageMeta
        title="Leaves Dashboard | TailAdmin"
        description="This is Leaves Dashboard for TailAdmin"
      />

      <div className="flex items-end gap-1 mb-2">
        {/* <Button
        onClick={()=> setModal(true)}
        >
          Add Company

          </Button> */}

<div>
<Select 

onChange={(value) => setPageQuery(prev => ({...prev, status: value}))}
options={[
  {
    label: 'ALl',
    value: ''
  },
   {
    label: 'absent',
    value: 'absent'
  },
   {
    label: 'Partial',
    value: 'partial'
  },
   {
    label: 'Present',
    value: 'present'
  }
]}/>
  
</div>
            <div>
            <label className="text-sm">File</label>
            <Input 
              type='file' 
              onChange={(e) => {

                const fileInput = e.target;

                 const file = fileInput?.files?.[0];

                  if (file) {
                      const reader = new FileReader();
                      reader.onload = function(event) {
                          const csvString = event.target.result;
                          console.log('what the fuck: ', browser.fieldDelimiter(',').csvStringToJson(csvString) )
                      };
                      reader.readAsText(file);
                  } else {
                      alert('Please select a CSV file.');
                  }
              } }
              />
          </div>

          <div>
            <label className="text-sm">Search</label>
            <Input 
              type='text' 
              onChange={(e) =>  setPageQuery((prev) => ({...prev, search: e.target.value})) }
              />
          </div>


          <Select 
            allSelection={{
              label: 'All',
              value: 'all'
            }}
            onChange={(companyID) =>  
            setPageQuery(prev => ({...prev, company_id: companyID == 'all' ? null : companyID}))}  
            options={companies.map(company => ({label: company.name, value: company.id}))}
          />

          <div>
            <label className="text-sm">From</label>
            <Input value={pageQuery.from} onChange={(e) => setPageQuery((prev) => ({...prev, from: e.target.value}))} type="date" />
          </div>

          <div>
            <label className="text-sm">To</label>
            <Input value={pageQuery.to} onChange={(e) => setPageQuery((prev) => ({...prev, to: e.target.value}))} type="date" />
          </div>


        <Pagination 
          className='ms-auto'
          onChange={(perPage)=> setPageQuery(prev => ({...prev, page: 1, per_page: perPage}))}
          isPrevDisabled={pageQuery.page <= 1}
          isNextDisabled={pageQuery.page >= eod?.last_page}
          onClickPrev={(e)=> setPageQuery(prev => ({...prev, page: prev.page <= 1 ? 1 : prev.page -1 }))  }
          onClickNext={(e)=> setPageQuery(prev => ({...prev, page:  prev.page < eod?.last_page ? prev.page + 1: prev.page }))  }
          page={pageQuery.page}
          perPage={pageQuery.per_page}
          total={companies?.total}
        />
      </div>     

      <CustomTable 
        header={eodTableHeader}
        data={eod?.data ?? []}
      />

      {modal && <Modal style="pop-up" close={handleCloseModal}  desc="add new company to the list" title="Company" fields={fields} />}
    
      {editForm.isOpen && <Modal  style="pop-up" close={()=> setEditForm(prev => ({...prev, isOpen: false}))}  desc="update company details" title="Company" fields={editForm.fields} />}
    
    </div>
  );
}
