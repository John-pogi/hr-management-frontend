import React, { useCallback } from "react";
import ComponentCard from "./common/ComponentCard";
import Input from "./form/input/InputField";
import TextArea from "./form/input/TextArea";
import FileInput from "./form/input/FileInput";
import Label from "./form/Label";
import Select from "./form/Select";
import MultiSelect from "./form/MultiSelect";
import Checkbox from "./form/input/Checkbox";
import { useDropzone } from "react-dropzone";

interface Option {
  value: string;
  label: string;
}

type StringHandler = (value: string) => void;
type FileHandler = (files: File[]) => void;

export interface InputPropsBase {
  id?: string;
  name?: string;
  placeholder?: string;
  value?: string | number | boolean;
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
  onChange: StringHandler;
}

export interface TextAreaInputProps extends BaseInputProps {
  kind: 'textarea';
  onChange: StringHandler;
}

export interface CheckboxInputProps extends BaseInputProps {
  kind: 'checkbox';
  onChange: (checked: boolean) => void;
}

export interface FileInputProps extends BaseInputProps {
  kind: 'file';
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export interface SelectInputProps extends BaseInputProps {
  kind: 'select';
  options?: Option[];
  onChange: StringHandler;
}

export interface MultiSelectInputProps extends BaseInputProps {
  kind: 'multi-select';
  options?: Option[];
  defaultSelected?: string[];
  onChange: (values: string[]) => void;
}

export interface DropzoneInputProps extends BaseInputProps {
  kind: 'dropzone';
  onChange: FileHandler;
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

const DropzoneField = ({ field }: { field: DropzoneInputProps }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    field.onChange(acceptedFiles);
  }, [field]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.webp', '.svg']
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

export default function Modal({ title, desc, fields }: ModalProps) {

  return (
    <>
      <ComponentCard
        title={title || "default label"}
        desc={desc || "default desc"}
      >
        {fields?.map((field, index) => {
          if (isDropzoneInput(field)) {
            return <DropzoneField key={field.name || index} field={field} />;
          }

          return (
              <div className="space-y-5 sm:space-y-6">
                {isBasicInput(field) ? (
                  <div key={index}>
                    <Label>{field.label}</Label>
                    <Input
                      type={field.type}
                      value={String(field.value ?? "")}
                      placeholder={field.placeholder ?? ""}
                      min={field.min ?? ""}
                      max={field.max ?? ""}
                      step={field.step ?? 1}
                      disabled={!!field.disabled}
                      error={!!field.error}
                      hint={field.hint ?? ""}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  </div>
                ) : isTextAreaInput(field) ? (
                  <div key={index}>
                    <Label>{field.label}</Label>
                    <TextArea
                      value={String(field.value ?? "")}
                      placeholder={field.placeholder ?? ""}
                      rows={field.rows ?? 3}
                      disabled={!!field.disabled}
                      error={!!field.error}
                      hint={field.hint ?? ""}
                      onChange={field.onChange}
                    />
                  </div>
                ) : isSelectInput(field) ? (
                  <div key={index}>
                    <Label>{field.label}</Label>
                    <Select
                      options={field.options ?? []}
                      placeholder={field.placeholder ?? "Select Option"}
                      onChange={field.onChange}
                    />
                  </div>
                ) : isMultiSelectInput(field) ? (
                  <div key={index}>
                    <MultiSelect
                      label={field.label ?? "Multiple Select Options"}
                      options={(field.options ?? []).map(opt => ({ 
                        text: opt.label,
                        value: opt.value 
                      }))}
                      defaultSelected={field.defaultSelected ?? []}
                      disabled={!!field.disabled}
                      onChange={field.onChange}
                    />
                  </div>
                ) : isFileInput(field) ? (
                  <div key={index}>
                    <Label>{field.label}</Label>
                    <FileInput
                      onChange={field.onChange}
                    />
                  </div>
                ) : isCheckboxInput(field) ? (
                  <div className="flex items-center gap-3" key={index}>
                    <Checkbox
                      checked={!!field.checked}
                      disabled={!!field.disabled}
                      label={field.label ?? "Checkbox"}
                      onChange={field.onChange}
                    />
                  </div>
                ) : null}
              </div>
          );
        })}
      </ComponentCard>
    </>
  );
}
