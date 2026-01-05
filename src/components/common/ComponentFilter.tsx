import type { ChangeEvent } from "react";
import { useState } from "react";
import Modal, { InputProps } from "../modal";
import Pagination from "../pagination/Pagination";

interface ComponentFilterProps {
  children: React.ReactNode;
  className?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const ComponentFilter: React.FC<ComponentFilterProps> = ({
  children,
  className = "",
  onChange,
}) => {
  const [modal, setModal] = useState(false);
  const [company, setCompany] = useState("");
  const [department, setDepartment] = useState("");
  
  const handleCloseModal = () => {
    setModal(false);
  }

  const fields: InputProps[] = [
    {
      kind: 'select',
      name: "company",
      label: "Company",
      placeholder: "Select an option",
      options: [
        { value: "Journey Tech Inc.", label: "Journey Tech Inc." },
        { value: "Etc.", label: "Etc." },
      ],
      defaultValue: company,
      onChange: (e) => setCompany(e.target.value),
    },
    {
      kind: 'select',
      name: "department",
      label: "Department",
      placeholder: "Select an option",
      options: [
        { value: "IT-Dev", label: "IT-Dev" },
        { value: "CMT", label: "CMT" },
        { value: "Dev-Ops", label: "Dev-Ops" },
        { value: "CS", label: "CS" },
        { value: "HR", label: "HR" },
      ],
      defaultValue: department,
      onChange: (e) => setDepartment(e.target.value),
    },
  ];

  const [pageQuery, setPageQuery] = useState({
    per_page: 10,
    page: 1,
  });
 
  return (
    <div
      className={`rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] ${className}`}
    >
      <div className="flex items-center overflow-auto gap-5 px-6 py-5">
        <div className="relative">
          <span className="absolute -translate-y-1/2 pointer-events-none left-4 top-1/2">
            <svg
              className="fill-gray-500 dark:fill-gray-400"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.04175 9.37363C3.04175 5.87693 5.87711 3.04199 9.37508 3.04199C12.8731 3.04199 15.7084 5.87693 15.7084 9.37363C15.7084 12.8703 12.8731 15.7053 9.37508 15.7053C5.87711 15.7053 3.04175 12.8703 3.04175 9.37363ZM9.37508 1.54199C5.04902 1.54199 1.54175 5.04817 1.54175 9.37363C1.54175 13.6991 5.04902 17.2053 9.37508 17.2053C11.2674 17.2053 13.003 16.5344 14.357 15.4176L17.177 18.238C17.4699 18.5309 17.9448 18.5309 18.2377 18.238C18.5306 17.9451 18.5306 17.4703 18.2377 17.1774L15.418 14.3573C16.5365 13.0033 17.2084 11.2669 17.2084 9.37363C17.2084 5.04817 13.7011 1.54199 9.37508 1.54199Z"
                fill=""
              />
            </svg>
          </span>
          <input
            type="search"
            id="search"
            name="search"
            placeholder="Find an employee..."
            className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pl-12 pr-14 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring focus:ring-brand-500/10 dark:border-gray-800 dark:bg-gray-900 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 xl:w-[430px]"
            onChange={onChange}
          />
        </div>

        <button type="button" className="ms-auto h-11 py-2.5 border border-[2px] border-gray-300 dark:border-[#3E3D4E] hover:bg-[rgba(0,0,0,0.05)] dark:hover:bg-[rgba(255,255,255,0.05)] text-blue-500 px-5 rounded-md transition-all duration-200" onClick={() => setModal(true)}>Filters</button>
      
        <Pagination 
          onChange={(perPage: number)=> setPageQuery(prev => ({...prev, page: 1, per_page: perPage}))}
          isPrevDisabled={pageQuery.page <= 1}
          isNextDisabled={pageQuery.page >= 1}
          onClickPrev={() => setPageQuery(prev => ({...prev, page: prev.page <= 1 ? 1 : prev.page -1 }))  }
          onClickNext={() => setPageQuery(prev => ({...prev, page:  prev.page < 1 ? prev.page + 1: prev.page }))  }
          page={pageQuery.page}
          perPage={pageQuery.per_page}
          total={0}
        />
      </div>

      {modal && <Modal style="pop-up" close={handleCloseModal} submit={() => null} title="Filters" desc="Narrow data result for faster management." fields={fields} />}

      <div className="p-4 border-t border-gray-100 dark:border-gray-800 sm:p-6">
        <div className="space-y-6">{children}</div>
      </div>
    </div>
  );
};

export default ComponentFilter;
