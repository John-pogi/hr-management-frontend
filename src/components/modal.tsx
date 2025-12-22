import React from "react";
import clsx from "clsx";
import { useDropzone } from "react-dropzone";

interface Option {
  value: string;
  label: string;
}

type EventHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
type StringHandler = (value: string) => void;
type FileHandler = (acceptedFiles: File[]) => void;

export interface InputProps {
  type?: "text" | "number" | "email" | "password" | "date" | "time" | "select" | "textarea" | "file" | "checkbox" | "dropzone";
  id?: string;
  name?: string;
  placeholder?: string;
  value?: string | number;
  onChange?: EventHandler | StringHandler | FileHandler;
  className?: string;
  min?: string;
  max?: string;
  step?: number;
  disabled?: boolean;
  success?: boolean;
  error?: boolean;
  hint?: string;
  options?: Option[];
  rows?: number;
  checked?: boolean;
  label?: string;
  accept?: Record<string, string[]>;
}

interface ModalProps {
  fields: InputProps[];
}

// DropzoneField component - handles FileHandler only
const DropzoneField: React.FC<{
  id?: string;
  onChange?: FileHandler;
  disabled?: boolean;
  error?: boolean;
  success?: boolean;
  hint?: string;
  accept?: Record<string, string[]>;
}> = ({ onChange, disabled, error, success, hint, accept }) => {
  const handleDrop = (acceptedFiles: File[]) => {
    onChange?.(acceptedFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    accept,
    disabled,
  });

  return (
    <div className="relative">
      <div 
        {...getRootProps()} 
        className={clsx(
          "transition border border-dashed cursor-pointer rounded-xl p-7 lg:p-10",
          disabled 
            ? "border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 cursor-not-allowed opacity-50" 
            : error 
              ? "border-error-500 bg-gray-50 dark:bg-gray-900 hover:border-error-500" 
              : success 
                ? "border-success-500 bg-gray-50 dark:bg-gray-900 hover:border-success-500"
                : isDragActive 
                  ? "border-brand-500 bg-gray-100 dark:bg-gray-800 hover:border-brand-500" 
                  : "border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-900 hover:border-brand-500 dark:hover:border-brand-500"
        )}
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
      </div>
      {hint && (
        <p className={`mt-2 text-xs ${error ? "text-error-500" : "text-gray-500 dark:text-gray-400"}`}>
          {hint}
        </p>
      )}
    </div>
  );
};

export default function Modal({ fields }: ModalProps) {
  const getBaseClasses = (extraClassName: string = "") => 
    `w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-none focus:ring dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 ${extraClassName}`;

  const getStateClasses = (type: string, disabled: boolean, error: boolean, success: boolean) => {
    const baseState = disabled
      ? "text-gray-500 border-gray-300 opacity-40 bg-gray-100 cursor-not-allowed dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700 opacity-40"
      : error
      ? "border-error-500 focus:border-error-300 focus:ring-error-500/20 dark:text-error-400 dark:border-error-500 dark:focus:border-error-800"
      : success
      ? "border-success-500 focus:border-success-300 focus:ring-success-500/20 dark:text-success-400 dark:border-success-500 dark:focus:border-success-800"
      : "bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90 dark:focus:border-brand-800";

    return type === "textarea" 
      ? baseState.replace(/h-11/g, "min-h-[80px]")
      : `h-11 ${baseState}`;
  };

  const getHintClasses = (error: boolean, success: boolean, type: string) => {
    const size = type === "textarea" ? "mt-2 text-sm" : "mt-1.5 text-xs";
    return `${size} ${error ? "text-error-500" : success ? "text-success-500" : "text-gray-500 dark:text-gray-400"}`;
  };

  // Handler for regular form inputs only (no FileHandler)
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    onChange?: EventHandler | StringHandler
  ) => {
    if (!onChange) return;
    if (typeof onChange === "function") {
      const isEventHandler = (onChange as EventHandler).call?.length === 1;
      if (isEventHandler) {
        (onChange as EventHandler)(e);
      } else {
        (onChange as StringHandler)(e.target.value);
      }
    }
  };

  return (
    <>
      {fields?.map(
        (
          {
            type = "text",
            id,
            name,
            placeholder,
            value,
            onChange,
            className = "",
            min,
            max,
            step,
            disabled = false,
            success = false,
            error = false,
            hint,
            options = [],
            rows = 3,
            checked = false,
            label,
            accept = {
              "image/png": [],
              "image/jpeg": [],
              "image/webp": [],
              "image/svg+xml": [],
            },
          },
          index
        ) => (
          <div className="relative mb-4" key={id ?? index}>
            {type === "dropzone" ? (
              <DropzoneField
                id={id}
                onChange={onChange as FileHandler}
                disabled={disabled}
                error={error}
                success={success}
                hint={hint}
                accept={accept}
              />
            ) : type === "select" ? (
              <select
                id={id}
                name={name}
                className={`${getBaseClasses(className)} pr-11 ${getStateClasses(type, disabled, error, success)}`}
                value={value as string ?? ""}
                onChange={(e) => handleChange(e, onChange as EventHandler)}
                disabled={disabled}
              >
                <option value="" disabled>{placeholder || "Select an option"}</option>
                {options.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            ) : type === "textarea" ? (
              <>
                <textarea
                  id={id}
                  name={name}
                  placeholder={placeholder}
                  rows={rows}
                  value={value ?? ""}
                  onChange={(e) => handleChange(e, onChange as EventHandler)}
                  disabled={disabled}
                  className={`${getBaseClasses(className)} ${getStateClasses(type, disabled, error, success)}`}
                />
                {hint && <p className={getHintClasses(error, success, type)}>{hint}</p>}
              </>
            ) : type === "file" ? (
              <input
                type="file"
                className="focus:border-ring-brand-300 h-11 w-full overflow-hidden rounded-lg border border-gray-300 bg-transparent text-sm text-gray-500 shadow-theme-xs transition-colors file:mr-5 file:border-collapse file:cursor-pointer file:rounded-l-lg file:border-0 file:border-r file:border-solid file:border-gray-200 file:bg-gray-50 file:py-3 file:pl-3.5 file:pr-3 file:text-sm file:text-gray-700 placeholder:text-gray-400 hover:file:bg-gray-100 focus:outline-none focus:file:ring-brand-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400 dark:text-white/90 dark:file:border-gray-800 dark:file:bg-white/[0.03] dark:file:text-gray-400 dark:placeholder:text-gray-400"
                onChange={(e) => handleChange(e, onChange as EventHandler)}
              />
            ) : type === "checkbox" ? (
              <label className={clsx("flex items-center space-x-3 cursor-pointer text-gray-800 dark:text-gray-200", { "cursor-not-allowed opacity-50": disabled })}>
                <input
                  id={id}
                  type="checkbox"
                  className={clsx(
                    "w-4 h-4 border-gray-300 rounded focus:ring-2 focus:ring-brand-500 dark:bg-gray-700 dark:border-gray-600 dark:checked:bg-brand-500 dark:checked:border-brand-500 focus:ring-offset-0 focus:outline-none",
                    className
                  )}
                  checked={checked}
                  onChange={(e) => handleChange(e, onChange as EventHandler)}
                  disabled={disabled}
                />
                {label && <span className="text-sm font-medium">{label}</span>}
              </label>
            ) : (
              <>
                <input
                  type={type}
                  id={id}
                  name={name}
                  placeholder={placeholder}
                  value={value ?? ""}
                  onChange={(e) => handleChange(e, onChange as EventHandler)}
                  min={min}
                  max={max}
                  step={step}
                  disabled={disabled}
                  className={`${getBaseClasses(className)} ${getStateClasses(type, disabled, error, success)}`}
                />
                {hint && <p className={getHintClasses(error, success, type)}>{hint}</p>}
              </>
            )}
          </div>
        )
      )}
    </>
  );
}
