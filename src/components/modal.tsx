import { useCallback } from "react";
import ComponentCard from "./common/ComponentCard";
import Input from "./form/input/InputField";
import TextArea from "./form/input/TextArea";
import FileInput from "./form/input/FileInput";
import Label from "./form/Label";
import Select from "./form/Select";
import MultiSelect from "./form/MultiSelect";
import Checkbox from "./form/input/Checkbox";
import { useDropzone } from "react-dropzone";
import Button from "./ui/button/Button";
import { browser } from 'convert-csv-to-json';
import { apiPost } from "../api/ApiHelper";
import endpoints from "../enpoint";

interface Option {
  value: string;
  label: string;
}

export interface InputPropsBase {
  id?: string;
  name?: string;
  placeholder?: string;
  defaultValue?: string | number | boolean | null;
  min?: string;
  max?: string;
  step?: number;
  disabled?: boolean;
  success?: boolean;
  error?: boolean;
  hint?: string;
  rows?: number;
  checked?: boolean;
  label?: string;
  desc?: string;
}

interface BaseInputProps extends InputPropsBase {
  kind: 'basic' | 'textarea' | 'checkbox' | 'file' | 'select' | 'multi-select' | 'dropzone';
}

export interface BasicInputProps extends BaseInputProps {
  kind: 'basic';
  type: "text" | "number" | "email" | "password" | "date" | "time";
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface TextAreaInputProps extends BaseInputProps {
  kind: 'textarea';
}

export interface CheckboxInputProps extends BaseInputProps {
  kind: 'checkbox';
}

export interface FileInputProps extends BaseInputProps {
  kind: 'file';
}

export interface SelectInputProps extends BaseInputProps {
  kind: 'select';
  options?: Option[];
  defaultValue?: string | number | boolean;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export interface MultiSelectInputProps extends BaseInputProps {
  kind: 'multi-select';
  options?: Option[];
  defaultSelected?: string[];
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export interface DropzoneInputProps extends BaseInputProps {
  kind: 'dropzone';
}

export type InputProps =
  | BasicInputProps
  | TextAreaInputProps
  | CheckboxInputProps
  | FileInputProps
  | SelectInputProps
  | MultiSelectInputProps
  | DropzoneInputProps;

interface ModalProps {
  fields: InputProps[];
  title?: string;
  desc?: string;
  style?: string;
  close: () => void;
  submit: (data: any) => void;
}

const isBasicInput = (field: InputProps): field is BasicInputProps => 
  field.kind === 'basic';

const isTextAreaInput = (field: InputProps): field is TextAreaInputProps => 
  field.kind === 'textarea';

const isCheckboxInput = (field: InputProps): field is CheckboxInputProps => 
  field.kind === 'checkbox';

const isFileInput = (field: InputProps): field is FileInputProps => 
  field.kind === 'file';

const isSelectInput = (field: InputProps): field is SelectInputProps => 
  field.kind === 'select';

const isMultiSelectInput = (field: InputProps): field is MultiSelectInputProps => 
  field.kind === 'multi-select';

const isDropzoneInput = (field: InputProps): field is DropzoneInputProps => 
  field.kind === 'dropzone';

const DropzoneField = ({ field }: { field: DropzoneInputProps}) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 1) {
    alert('Please select only 1 CSV/Excel file.');
    return;
  }

  const file = acceptedFiles[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = function(event) {
      const csvString = event.target?.result as string;
      const rawData = browser.fieldDelimiter(',').csvStringToJson(csvString);
      console.log(rawData);
      
      const validData = rawData.filter(row => row && Object.keys(row).length > 0);
      const dtr = validData.map((row: any) => {
        
        return {
          employee_number: row?.employee_number ||'',
          type: row?.type || '',
          date: row?.date || '',
          time: row?.time || ''
        };
      });

      const payload = { dtr };
      console.log('DTR Payload:', payload);
      apiPost(endpoints.dtr, payload);
    };
    reader.readAsText(file);

  } else {
    alert('No valid file selected.');
  }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.ms-excel': ['.xls'], 
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx']
    }
  });

  return (
    <ComponentCard title={field.label || "Dropzone"} desc="Drag & drop file upload area.">
      <div className="space-y-5 sm:space-y-6">
        <div className="transition border border-gray-300 border-dashed cursor-pointer dark:hover:border-brand-500 dark:border-gray-700 rounded-xl hover:border-brand-500">
          <form
            {...getRootProps()}
            className={`dropzone rounded-xl border-dashed border-gray-300 p-7 lg:p-10 ${
              isDragActive
                ? "border-brand-500 bg-gray-100 dark:bg-gray-800"
                : "border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-900"
            }`}
            name={field.name || 'dropzone'}
          >
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
                Drag and drop your PNG, JPG, WebP, SVG images here or browse
              </span>
              <span className="font-medium underline text-theme-sm text-brand-500">
                Browse File
              </span>
            </div>
          </form>
        </div>
      </div>
    </ComponentCard>
  );
};

export default function Modal({ style = "pop-up", close, submit, title, desc, fields }: ModalProps) {
  const handleClose = () => {
    const confirmation = confirm("Do you wish to exit?");
    if (confirmation) close();
  }

  const handleSubmit = () => {
    submit();
    close();
  }

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
              ? "bg-white dark:bg-gray-900 rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto text-start" 
              : ""
          }
        `}
        onClick={(e) => e.stopPropagation()}
      >
        <ComponentCard
          title={title || "default label"}
          desc={desc || "default desc"}
          className="relative"
        >
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
          {fields?.map((field, index) => (
            <div key={index}>
              {isDropzoneInput(field) ? (
                <DropzoneField field={field} />
              ) : (
                <div className="space-y-5 sm:space-y-6">
                  {isBasicInput(field) ? (
                    <div>
                      <Label>{field.label}</Label>
                      <Input
                        type={field.type}
                        defaultValue={String(field.defaultValue ?? "")}
                        placeholder={field.placeholder ?? ""}
                        min={field.min ?? ""}
                        max={field.max ?? ""}
                        step={field.step ?? 1}
                        disabled={!!field.disabled}
                        error={!!field.error}
                        hint={field.hint ?? ""}
                        onChange={field.onChange}
                      />
                    </div>
                  ) : isTextAreaInput(field) ? (
                    <div>
                      <Label>{field.label}</Label>
                      <TextArea
                        defaultValue={String(field.defaultValue ?? "")}
                        placeholder={field.placeholder ?? ""}
                        rows={field.rows ?? 3}
                        disabled={!!field.disabled}
                        error={!!field.error}
                        hint={field.hint ?? ""}
                      />
                    </div>
                  ) : isSelectInput(field) ? (
                    <div>
                      <Label>{field.label}</Label>
                      <Select
                        options={field.options ?? []}
                        placeholder={field.placeholder ?? "Select Option"}
                        defaultValue={String(field.defaultValue ?? "")}
                        onChange={(value) => {
                          const syntheticEvent = {
                            target: { value }
                          } as React.ChangeEvent<HTMLSelectElement>;
                          (field.onChange as (e: React.ChangeEvent<HTMLSelectElement>) => void)(syntheticEvent);
                        }}
                      />
                    </div>
                  ) : isMultiSelectInput(field) ? (
                    <div>
                      <MultiSelect
                        label={field.label ?? "Multiple Select Options"}
                        placeholder={field.placeholder ?? "Select Option"}
                        options={(field.options ?? []).map(opt => ({ 
                          text: opt.label,
                          value: opt.value 
                        }))}
                        defaultSelected={field.defaultSelected ?? []}
                        disabled={!!field.disabled}
                        onChange={(value) => {
                          const syntheticEvent = {
                            target: { 
                              value: value.join(',')
                            }
                          } as unknown as React.ChangeEvent<HTMLSelectElement>;
                          (field.onChange as (e: React.ChangeEvent<HTMLSelectElement>) => void)(syntheticEvent);
                        }}
                      />
                    </div>
                  ) : isFileInput(field) ? (
                    <div>
                      <Label>{field.label}</Label>
                      <FileInput />
                    </div>
                  ) : isCheckboxInput(field) ? (
                    <div className="flex items-center gap-3">
                      <Checkbox
                        checked={!!field.checked}
                        disabled={!!field.disabled}
                        label={field.label ?? "Checkbox"}
                      />
                    </div>
                  ) : null}
                </div>
              )}
            </div>
          ))}
          <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
            <Button size="sm" variant="outline" onClick={handleClose}>
              Close
            </Button>
            <Button size="sm" onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        </ComponentCard>
      </div>
    </div>
  );
}

