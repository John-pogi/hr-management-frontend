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
  const inputClasses = `h-11 w-full min-w-[200px] rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-none focus:ring  dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 ${className}`;
  
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
    page:1,
  });
 
  return (
    <div
      className={`rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] ${className}`}
    >
      <div className="flex overflow-auto gap-5 px-6 py-5">
        <input
          type="search"
          id="search"
          name="search"
          placeholder="Search an employee..."
          className={inputClasses}
          onChange={onChange}
        />

        <button type="button" className="border border-[2px] border-gray-300 dark:border-[#3E3D4E] hover:bg-[rgba(0,0,0,0.05)] dark:hover:bg-[rgba(255,255,255,0.05)] text-blue-500 px-5 rounded-md transition-all duration-200" onClick={() => setModal(true)}>Filters</button>
      
      </div>

      {modal && <Modal style="pop-up" close={handleCloseModal} submit={() => null} title="Filters" desc="Narrow data result for faster management." fields={fields} />}

      <div className="p-4 border-t border-gray-100 dark:border-gray-800 sm:p-6">
        <div className="space-y-6">{children}</div>
      </div>
    </div>
  );
};

export default ComponentFilter;
