import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";
// import { fetchData } from "../utils/fetchData";
import { useState } from "react";
import Modal, { InputProps } from "../components/modal";
import LeaveStatCardComponent from "../components/LeaveStatCardComponent";
import { fetchData } from "../utils/fetchData";

export default function Blank() {
  const [modal, setModal] = useState(true);

  // const url = "/api/leaves/submit";

  // Unfinished function
  const handleSubmit = () => {
    return;
  };

  const handleCloseModal = () => {
    setModal(false);
  };

  const fields: InputProps[] = [
    {
      kind: "basic",
      type: "text",
      name: "test",
      label: "Text Input",
      placeholder: "Enter your text",
      defaultValue: "TEST",
    },
    {
      kind: "basic",
      type: "password",
      name: "password",
      label: "Password",
      placeholder: "Enter your password",
      disabled: true,
      defaultValue: "TEST",
    },
    {
      kind: "basic",
      type: "email",
      name: "email",
      label: "Email",
      placeholder: "Enter your email",
      success: true,
      defaultValue: "TEST",
    },
    {
      kind: "basic",
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
      kind: "select",
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
      kind: "textarea",
      name: "textarea1",
      label: "Description (Disabled)",
      placeholder: "Enter description",
      rows: 4,
      disabled: true,
      defaultValue: "TEST",
    },
    {
      kind: "textarea",
      name: "textarea2",
      label: "Description",
      placeholder: "Enter description",
      rows: 6,
      hint: "Maximum 500 characters",
      defaultValue: "TEST",
    },
    {
      kind: "file",
      label: "File Upload",
    },
    {
      kind: "checkbox",
      label: "Enable notifications",
      checked: false,
    },
    {
      kind: "dropzone",
      label: "Image Upload",
      name: "images",
    },
    {
      kind: "multi-select",
      label: "Skills",
      options: [
        { value: "react", label: "React" },
        { value: "typescript", label: "TypeScript" },
        { value: "tailwind", label: "Tailwind CSS" },
      ],
      defaultSelected: [],
    },
  ];

  return (
    <div>
      <PageMeta
        title="Leaves Dashboard | TailAdmin"
        description="This is Leaves Dashboard for TailAdmin"
      />
      <PageBreadcrumb pageTitle="Leaves" />
      <LeaveStatCardComponent />

      {!modal && (
        <button
          onClick={() => setModal(true)}
          className="rounded-full px-5 py-3 bg-[rgba(0,0,255,0.5)] hover:opacity-90"
        >
          Open Modal
        </button>
      )}
      {modal && (
        <Modal
          style="pop-up"
          close={handleCloseModal}
          title="haha"
          desc="hahaha"
          fields={fields}
          submit={handleSubmit}
        />
      )}
    </div>
  );
}
