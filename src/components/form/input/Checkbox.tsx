import clsx from "clsx";
import { useState } from "react";

interface CheckboxProps {
  label?: string;
  checked: boolean;
  className?: string;
  name?: string;
  disabled?: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked = false,
  name,
  className = "",
  disabled = false,
}) => {
  const [check, setCheck] = useState(checked);
  return (
    <label
      className={clsx(
        "flex items-center space-x-3 cursor-pointer text-gray-800 dark:text-gray-200",
        { "cursor-not-allowed opacity-50": disabled }
      )}
    >
      <input
        id="checkbox"
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
      {label && <span className="text-sm font-medium select-none">{label}</span>}
    </label>
  );
};

export default Checkbox;
