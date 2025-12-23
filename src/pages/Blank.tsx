import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";
import Modal, { InputProps } from "../components/modal";
import { useState } from "react";

export default function Blank() {
  const [modal, setModal] = useState(true);
  const handleCloseModal = () => {
    setModal(false);
  }
  const fields: InputProps[] = [
    {
      kind: 'basic',
      type: "text",
      name: "test",
      label: "Text Input",
      placeholder: "Enter your text",
      defaultValue: "TEST",
    },
    {
      kind: 'basic',
      type: "password",
      name: "password",
      label: "Password",
      placeholder: "Enter your password",
      disabled: true,
      defaultValue: "TEST",
    },
    {
      kind: 'basic',
      type: "email",
      name: "email",
      label: "Email",
      placeholder: "Enter your email",
      success: true,
      defaultValue: "TEST",
    },
    {
      kind: 'basic',
      type: "number",
      name: "number",
      label: "Number",
      placeholder: "Enter number",
      error: true,
      min: "0",
      max: "100",
      step: 1,
      defaultValue: "TEST",
    },
    {
      kind: 'select',
      name: "select",
      label: "Category",
      placeholder: "Select an option",
      options: [
        { value: "marketing", label: "Marketing" },
        { value: "template", label: "Template" },
        { value: "development", label: "Development" },
      ],
      defaultValue: "TEST",
    },
    {
      kind: 'textarea',
      name: "textarea1",
      label: "Description (Disabled)",
      placeholder: "Enter description",
      rows: 4,
      disabled: true,
      defaultValue: "TEST",
    },
    {
      kind: 'textarea',
      name: "textarea2",
      label: "Description",
      placeholder: "Enter description",
      rows: 6,
      hint: "Maximum 500 characters",
      defaultValue: "TEST",
    },
    {
      kind: 'file',
      label: "File Upload",
    },
    {
      kind: 'checkbox',
      label: "Enable notifications",
      checked: false,
    },
    {
      kind: 'dropzone',
      label: "Image Upload",
      name: "images",
    },
    {
      kind: 'multi-select',
      label: "Skills",
      options: [
        { value: "react", label: "React" },
        { value: "typescript", label: "TypeScript" },
        { value: "tailwind", label: "Tailwind CSS" }
      ],
      defaultSelected: [],
    }
  ];
  return (
    <div>
      <PageMeta
        title="React.js Blank Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Blank Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Blank Page" />
      <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
        <div className="mx-auto w-full max-w-[630px] text-center">
          <h3 className="mb-4 font-semibold text-gray-800 text-theme-xl dark:text-white/90 sm:text-2xl">
            Card Title Here
          </h3>

          <p className="text-sm text-gray-500 dark:text-gray-400 sm:text-base">
            Start putting content on grids or panels, you can also use different
            combinations of grids.Please check out the dashboard and other pages
          </p>

          {!modal && <button onClick={() => setModal(true)} className="rounded-full px-5 py-3 bg-[rgba(0,0,255,0.5)] hover:opacity-90">Open Modal</button>}

          {modal && <Modal style="pop-up" close={handleCloseModal} title="haha" desc="hahaha" fields={fields} />}

        </div>
      </div>
    </div>
  );
}
