import { useState, useCallback } from "react";
import ComponentCard from "./ComponentCard";
import Button from "./Button";
import {
  Field,
  CommonField,
  SelectField,
  MultiSelectField,
  TextAreaField,
  CheckBoxField,
  FileField,
} from "../type/interface";
import Label from "./Label";
import clsx from "clsx";
import { useDropzone } from "react-dropzone";

interface Modal {
  fields: Field[];
  title?: string;
  desc?: string;
  style?: "pop-up" | "view";
  close?: () => void;
  disabled?: boolean;
  submit?: (formData: Record<string, unknown>) => void;
}

export default function Modal({ style = "pop-up", close, submit, title, desc, fields, disabled = false, }: Modal) {

  const handleClose = () => {
    const confirmation = confirm("Do you wish to exit?");
    if (confirmation && close) close();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    if (!disabled && submit) {
      submit(data as Record<string, unknown>);
    }

    if (close) close();
  };

  const CommonFields = (field: Field): field is CommonField => ["text", "number", "email", "password", "date", "time"].includes(field.type);
  const SelectFields = (field: Field): field is SelectField => field.type === "select";
  const MultiSelectFields = (field: Field): field is MultiSelectField => field.type === "multi-select";
  const TextareaFields = (field: Field): field is TextAreaField => field.type === "textarea";
  const CheckBoxFields = (field: Field): field is CheckBoxField => field.type === "checkbox";
  const FileFields = (field: Field): field is FileField => field.type === "file";

  return (
    <div
      className={`
        ${
          style === "pop-up"
            ? "fixed z-[99999] inset-0 dvh-screen backdrop-blur-sm flex justify-center items-center p-5 overflow-hidden animate-in fade-in-0 zoom-in duration-500 ease-out" 
            : ""
        }
      `}
      onClick={handleClose}
    >
      <div 
        className={`
          ${
            style === "pop-up"
              ? "custom-scrollbar bg-white dark:bg-gray-900 rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto text-start" 
              : ""
          }
        `}
        onClick={(e) => e.stopPropagation()}
      >
        <ComponentCard title={title || "no label"} desc={desc || "no description"} className="relative">
          <button
            onClick={handleClose}
            className="absolute right-3 top-3 z-999 flex h-9.5 w-9.5 items-center justify-center rounded-full bg-gray-100 text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white sm:right-6 sm:top-6 sm:h-11 sm:w-11"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.04289 16.5413C5.65237 16.9318 5.65237 17.565 6.04289 17.9555C6.43342 18.346 7.06658 18.346 7.45711 17.9555L11.9987 13.4139L16.5408 17.956C16.9313 18.3466 17.5645 18.3466 17.955 17.956C18.3455 17.5655 18.3455 16.9323 17.955 16.5418L13.4129 11.9997L17.955 7.4576C18.3455 7.06707 18.3455 6.43391 17.955 6.04338C17.5645 5.65286 16.9313 5.65286 16.5408 6.04338L11.9987 10.5855L7.45711 6.0439C7.06658 5.65338 6.43342 5.65338 6.04289 6.0439C5.65237 6.43442 5.65237 7.06759 6.04289 7.45811L10.5845 11.9997L6.04289 16.5413Z"
                fill="currentColor"
              />
            </svg>
          </button>
          
          <form onSubmit={handleSubmit} className="space-y-3">
            {fields.map((field, index) => (
              <div key={index} className="space-y-5 sm:space-y-6">
                {CommonFields(field) ? (
                  <div>
                    <Label htmlFor={field.name}>{field.label}</Label>
                    <Input
                      name={field.name}
                      type={field.type}
                      defaultValue={field.defaultValue}
                      placeholder={field.placeholder}
                      min={field.min}
                      max={field.max}
                      step={field.step ?? 1}
                      disabled={!!field.disabled}
                      error={!!field.error}
                      hint={field.hint}
                      onChange={field.onChange}
                    />
                  </div>
                ) : SelectFields(field) ? (
                  <div>
                    <Label htmlFor={field.name}>{field.label}</Label>
                    <Select
                      name={field.name}
                      type={field.type}
                      options={field.options}
                      defaultValue={field.defaultValue}
                      placeholder={field.placeholder}
                      disabled={!!field.disabled}
                      error={!!field.error}
                      hint={field.hint}
                      onChange={field.onChange}
                    />
                  </div>
                ) : MultiSelectFields(field) ? (
                  <div>
                    <Label htmlFor={field.name}>{field.label}</Label>
                    <MultiSelect
                      name={field.name}
                      type={field.type}
                      options={field.options}
                      defaultSelected={field.defaultSelected}
                      placeholder={field.placeholder}
                      disabled={!!field.disabled}
                      error={!!field.error}
                      hint={field.hint}
                    />
                  </div>
                ) : TextareaFields(field) ? (
                  <div>
                    <Label htmlFor={field.name}>{field.label}</Label>
                    <TextArea
                      name={field.name}
                      type={field.type}
                      defaultValue={field.defaultValue}
                      placeholder={field.placeholder}
                      rows={field.rows}
                      disabled={!!field.disabled}
                      error={!!field.error}
                      hint={field.hint}
                    />
                  </div>
                ) : CheckBoxFields(field) ? (
                  <div className="flex items-center gap-3">
                    <Checkbox
                      name={field.name}
                      type={field.type}
                      defaultValue={field.defaultValue}
                      checked={!!field.checked}
                      disabled={!!field.disabled}
                    />
                  </div>
                ) : FileFields(field) ? (
                  <>
                    <File
                      name={field.name}
                      type={field.type}
                    />
                  </>
                ) : null}
              </div>
            ))}

            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button size="sm" variant="outline" onClick={handleClose}>
                Close
              </Button>
              {!disabled && (
                <Button type="submit" size="sm">
                  Submit
                </Button>
              )}
            </div>
          </form>
        </ComponentCard>
      </div>
    </div>
  );
}

function Input({
  type = "text",
  name,
  placeholder,
  defaultValue,
  className = "",
  min,
  max,
  step,
  disabled = false,
  success = false,
  error = false,
  hint,
  value,
  onChange,
}: CommonField) {

  let inputClasses = ` h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-none focus:ring  dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 ${className}`;

  if (disabled) {
    inputClasses += ` text-gray-500 border-gray-300 opacity-40 bg-gray-100 cursor-not-allowed dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700 opacity-40`;
  } else if (error) {
    inputClasses += `  border-error-500 focus:border-error-300 focus:ring-error-500/20 dark:text-error-400 dark:border-error-500 dark:focus:border-error-800`;
  } else if (success) {
    inputClasses += `  border-success-500 focus:border-success-300 focus:ring-success-500/20 dark:text-success-400 dark:border-success-500 dark:focus:border-success-800`;
  } else {
    inputClasses += ` bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90  dark:focus:border-brand-800`;
  }
  return(
    <div className="relative">
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        className={inputClasses}
        value={value}
        onChange={onChange as (e: React.ChangeEvent<HTMLInputElement>) => void}
      />

      {hint && (
        <p
          className={`mt-1.5 text-xs ${
            error
              ? "text-error-500"
              : success
              ? "text-success-500"
              : "text-gray-500"
          }`}
        >
          {hint}
        </p>
      )}
    </div>
  );
}

function Select({
  name,
  options = [],
  placeholder = "Select an option",
  className = "",
  defaultValue = "",
  allSelection,
  onChange,
}: SelectField) {
  const [selectedValue, setSelectedValue] = useState<string>(defaultValue);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedValue(value);
  };

  return(
    <select
      className={`h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 ${
        selectedValue
          ? "text-gray-800 dark:text-white/90"
          : "text-gray-400 dark:text-gray-400"
      } ${className}`}
      value={selectedValue}
      onChange={onChange ?? handleChange}
      name={name}
    >
      <option
        value=""
        disabled
        className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
      >
        {placeholder}
      </option>

      {allSelection && (
         <option
          key={allSelection.value}
          value={allSelection.value}
          className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
        >
          {allSelection.label}
        </option>
      )}
      {(options ?? []).map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

function MultiSelect({
  name,
  label,
  options = [],
  defaultSelected = [],
  disabled = false,
  placeholder,
}: MultiSelectField) {
  const [selectedOptions, setSelectedOptions] =
    useState<string[]>(defaultSelected);
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    if (!disabled) setIsOpen((prev) => !prev);
  };

  const handleSelect = (optionValue: string) => {
    const newSelectedOptions = selectedOptions.includes(optionValue)
      ? selectedOptions.filter((value) => value !== optionValue)
      : [...selectedOptions, optionValue];

    setSelectedOptions(newSelectedOptions);
  };

  const removeOption = (value: string) => {
    const newSelectedOptions = selectedOptions.filter((opt) => opt !== value);
    setSelectedOptions(newSelectedOptions);
  };

  const selectedValuesText = selectedOptions.map(
    (value) => options.find((option) => option.value === value)?.label || ""
  );
  return(
    <div className="w-full">
      <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
        {label}
      </label>

      <input 
        type="hidden"
        name={name}
        value={JSON.stringify(selectedOptions)}
      />

      <div className="relative z-20 inline-block w-full">
        <div className="relative flex flex-col items-center">
          <div onClick={toggleDropdown} className="w-full">
            <div className="mb-2 flex min-h-11 rounded-lg border border-gray-300 py-1.5 pl-3 pr-3 shadow-theme-xs outline-none transition focus:border-brand-300 focus:shadow-focus-ring dark:border-gray-700 dark:bg-gray-900 dark:focus:border-brand-300">
              <div className="flex flex-wrap flex-auto gap-2">
                {selectedValuesText.length > 0 ? (
                  selectedValuesText.map((text, index) => (
                    <div
                      key={index}
                      className="group flex items-center justify-center rounded-full border-[0.7px] border-transparent bg-gray-100 py-1 pl-2.5 pr-2 text-sm text-gray-800 hover:border-gray-200 dark:bg-gray-800 dark:text-white/90 dark:hover:border-gray-800"
                    >
                      <span className="flex-initial max-w-full">{text}</span>
                      <div className="flex flex-row-reverse flex-auto">
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            removeOption(selectedOptions[index]);
                          }}
                          className="pl-2 text-gray-500 cursor-pointer group-hover:text-gray-400 dark:text-gray-400"
                        >
                          <svg
                            className="fill-current"
                            role="button"
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M3.40717 4.46881C3.11428 4.17591 3.11428 3.70104 3.40717 3.40815C3.70006 3.11525 4.17494 3.11525 4.46783 3.40815L6.99943 5.93975L9.53095 3.40822C9.82385 3.11533 10.2987 3.11533 10.5916 3.40822C10.8845 3.70112 10.8845 4.17599 10.5916 4.46888L8.06009 7.00041L10.5916 9.53193C10.8845 9.82482 10.8845 10.2997 10.5916 10.5926C10.2987 10.8855 9.82385 10.8855 9.53095 10.5926L6.99943 8.06107L4.46783 10.5927C4.17494 10.8856 3.70006 10.8856 3.40717 10.5927C3.11428 10.2998 3.11428 9.8249 3.40717 9.53201L5.93877 7.00041L3.40717 4.46881Z"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <input
                    placeholder={placeholder}
                    className="w-full h-full p-1 pr-2 text-sm bg-transparent border-0 outline-none appearance-none text-gray-400 focus:border-0 focus:outline-none focus:ring-0 dark:text-white/90"
                    readOnly
                    value={placeholder}
                  />
                )}
              </div>
              <div className="flex items-center py-1 pl-1 pr-1 w-7">
                <button
                  type="button"
                  className="w-5 h-5 text-gray-700 outline-none cursor-pointer focus:outline-none dark:text-gray-400"
                >
                  <svg
                    className={`stroke-current ${isOpen ? "rotate-180" : ""}`}
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.79175 7.39551L10.0001 12.6038L15.2084 7.39551"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {isOpen && (
            <div
              className="absolute left-0 z-40 w-full overflow-y-auto bg-white rounded-lg shadow top-full max-h-select dark:bg-gray-900"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col">
                {options.map((option, index) => (
                  <div
                    key={index}
                    className={`hover:bg-primary/5 w-full cursor-pointer rounded-t border-b border-gray-200 dark:border-gray-800`}
                    onClick={() => handleSelect(option.value)}
                  >
                    <div
                      className={`relative flex w-full items-center p-2 pl-2 ${
                        selectedOptions.includes(option.value)
                          ? "bg-primary/10"
                          : ""
                      }`}
                    >
                      <div className="mx-2 leading-6 text-gray-800 dark:text-white/90">
                        {option.label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function TextArea({
  placeholder = "Enter your message",
  rows = 3,
  defaultValue = "",
  className = "",
  disabled = false,
  error = false,
  hint = "",
}: TextAreaField) {
  let textareaClasses = `w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs focus:outline-none ${className} `;

  if (disabled) {
    textareaClasses += ` bg-gray-100 opacity-50 text-gray-500 border-gray-300 cursor-not-allowed opacity40 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700`;
  } else if (error) {
    textareaClasses += ` bg-transparent  border-gray-300 focus:border-error-300 focus:ring focus:ring-error-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-error-800`;
  } else {
    textareaClasses += ` bg-transparent text-gray-900 dark:text-gray-300 text-gray-900 border-gray-300 focus:border-brand-300 focus:ring focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800`;
  }
  return(
    <div className="relative">
      <textarea
        placeholder={placeholder}
        rows={rows}
        defaultValue={defaultValue}
        disabled={disabled}
        className={textareaClasses}
      />
      {hint && (
        <p
          className={`mt-2 text-sm ${
            error ? "text-error-500" : "text-gray-500 dark:text-gray-400"
          }`}
        >
          {hint}
        </p>
      )}
    </div>
  );
}

function Checkbox({
  defaultValue = "",
  checked = false,
  name,
  className = "",
  disabled = false,
}: CheckBoxField) {
  const [check, setCheck] = useState(checked);
  return(
    <label
      className={clsx(
        "flex items-center space-x-3 cursor-pointer text-gray-800 dark:text-gray-200",
        { "cursor-not-allowed opacity-50": disabled }
      )}
    >
      <input
        name={name}
        type="checkbox"
        className={clsx(
          "w-4 h-4 border-gray-300 rounded focus:ring-2 focus:ring-brand-500",
          "dark:bg-gray-700 dark:border-gray-600 dark:checked:bg-brand-500 dark:checked:border-brand-500",
          "focus:ring-offset-0 focus:outline-none",
          className
        )}
        checked={check}
        onChange={() => setCheck(() => !check) }
        disabled={disabled}
      />
      {defaultValue && <span className="text-sm font-medium select-none dark:text-white capitalize">{defaultValue}</span>}
    </label>
  );
}

function File({ name }: FileField) {
  interface DtrRecord {
    employee_number: string;
    type: string;
    date: string;
    time: string;
  }

  const [content, setContent] = useState<DtrRecord[]>([]);
  const [fileName, setFileName] = useState<string>('');

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 1) {
      alert('Please select only 1 file.');
      return;
    }

    const file = acceptedFiles[0];
    if (file) {
      setFileName(file.name);
      
      const reader = new FileReader();
      reader.onload = (event) => {
        const csvString = event.target?.result as string;
        
        const rawData = parseCSV(csvString);
        const validData = rawData.filter(row => row && Object.keys(row).length > 0);
        
        const dtr = validData.map((row: Record<string, string>) => ({
          employee_number: String(row?.employee_number || ''),
          type: String(row?.type || ''),
          date: String(row?.date || ''),
          time: String(row?.time || '')
        }));
        
        setContent(dtr);
      };
      reader.readAsText(file);
    }
  }, []);

  const parseCSV = (csvString: string): Record<string, string>[] => {
    const lines = csvString.split('\n').filter(line => line.trim());
    if (lines.length === 0) return [];
    
    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
    return lines.slice(1).map(line => {
      const values = line.split(',').map(v => v.trim().replace(/"/g, ''));
      return headers.reduce(
        (obj: Record<string, string>, header: string, i) => {
          obj[header] = values[i] || '';
          return obj;
        }, 
        {} as Record<string, string>
      );
    });
  };


  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.ms-excel': ['.xls'], 
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx']
    }
  });

  const hiddenValue = JSON.stringify(content);

  return (
    <div className="space-y-5 sm:space-y-6">
      <input type="hidden" name={name} value={hiddenValue} />
      
      {fileName && (
        <div className="p-3 bg-green-50 border border-green-200 rounded-lg dark:bg-green-900/20">
          <p className="text-sm font-medium text-green-800 dark:text-green-200">
            ✅ {fileName} uploaded ({content.length} records)
          </p>
        </div>
      )}
      
      <div {...getRootProps()} className={`dropzone rounded-xl border-dashed p-7 lg:p-10 transition cursor-pointer ${
        isDragActive
          ? "border-brand-500 bg-gray-100 dark:bg-gray-800"
          : "border-gray-300 bg-gray-50 hover:border-brand-500 dark:border-gray-700 dark:bg-gray-900"
      }`}>
        <input {...getInputProps()} />
        <div className="dz-message flex flex-col items-center !m-0">
          <div className="mb-[22px] flex justify-center">
            <div className="flex h-[68px] w-[68px] items-center justify-center rounded-full bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-400">
              <svg
                className="fill-current"
                width="29"
                height="28"
                viewBox="0 0 29 28"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M14.5019 3.91699C14.2852 3.91699 14.0899 4.00891 13.953 4.15589L8.57363 9.53186C8.28065 9.82466 8.2805 10.2995 8.5733 10.5925C8.8661 10.8855 9.34097 10.8857 9.63396 10.5929L13.7519 6.47752V18.667C13.7519 19.0812 14.0877 19.417 14.5019 19.417C14.9161 19.417 15.2519 19.0812 15.2519 18.667V6.48234L19.3653 10.5929C19.6583 10.8857 20.1332 10.8855 20.426 10.5925C20.7188 10.2995 20.7186 9.82463 20.4256 9.53184L15.0838 4.19378C14.9463 4.02488 14.7367 3.91699 14.5019 3.91699ZM5.91626 18.667C5.91626 18.2528 5.58047 17.917 5.16626 17.917C4.75205 17.917 4.41626 18.2528 4.41626 18.667V21.8337C4.41626 23.0763 5.42362 24.0837 6.66626 24.0837H22.3339C23.5766 24.0837 24.5839 23.0763 24.5839 21.8337V18.667C24.5839 18.2528 24.2482 17.917 23.8339 17.917C23.4197 17.917 23.0839 18.2528 23.0839 18.667V21.8337C23.0839 22.2479 22.7482 22.5837 22.3339 22.5837H6.66626C6.25205 22.5837 5.91626 22.2479 5.91626 21.8337V18.667Z"
                />
              </svg>
            </div>
          </div>
          
          <h4 className="mb-3 font-semibold text-gray-800 text-theme-xl dark:text-white/90">
            {isDragActive ? "Drop Files Here" : "Drag & Drop Files Here"}
          </h4>
          
          <span className="text-center mb-5 block w-full max-w-[290px] text-sm text-gray-700 dark:text-gray-400">
            Drag and drop your CSV, XLS, XLSX files here or browse
          </span>
          
          <span className="font-medium underline text-theme-sm text-brand-500">
            Browse File
          </span>
        </div>
      </div>
    </div>
  );
}

