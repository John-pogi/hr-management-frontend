import type { ChangeEvent } from "react";
import { useState } from "react";
import Modal, { InputProps } from "../modal";

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
  const inputClasses = `h-11 rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-none focus:ring  dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 ${className}`;
  
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
  ];

  return (
    <div
      className={`rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] ${className}`}
    >
      <div className="flex gap-5 px-6 py-5">
        <input
          type="search"
          id="search"
          name="search"
          placeholder="Search an employee..."
          className={inputClasses}
          onChange={onChange}
        />

        <button type="button" className="border border-black hover:bg-black px-5 rounded-md" onClick={() => setModal(true)}>Filters</button>
      </div>

      {modal && <Modal style="pop-up" close={handleCloseModal} submit={() => null} title="Filters" desc="Narrow data result for faster management." fields={fields} />}

      <div className="p-4 border-t border-gray-100 dark:border-gray-800 sm:p-6">
        <div className="space-y-6">{children}</div>
      </div>
    </div>
  );
};

export default ComponentFilter;
