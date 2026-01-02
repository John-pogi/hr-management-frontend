import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";
import { StatCard } from "../components/common/StatCard";
import { fetchData } from "../utils/fetchData";
import { useEffect, useState } from "react";
import Modal, { InputProps } from "../components/modal";

export default function Blank() {
  const [modal, setModal] = useState(true);
  const [fetchedData, setFetchedData] = useState<number | null>(null);

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


  useEffect(() => {
    async function loadLeaves() {
      try {
        await fetchData("/api/leaves");
        setFetchedData(null);
      } catch (error) {
        if (error instanceof Error) {
          //
        }
      } finally {
        //
      }
    }
    loadLeaves();
  }, []);

  return (
    <div>
      <PageMeta
        title="Leaves Dashboard | TailAdmin"
        description="This is Leaves Dashboard for TailAdmin"
      />
      <PageBreadcrumb pageTitle="Leaves" />
      <div className="min-h-7 rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12 flex space-x-4 text-center  ">
        <StatCard
          label="Unspent Leaves:"
          count={fetchedData ?? 0}
          color="bg-green-100 text-green-700"
          className="text-center"
        ></StatCard>
        <StatCard
          label="Spent Leaves:"
          count={fetchedData ?? 0}
          color="bg-green-100 text-green-700"
        ></StatCard>
        <StatCard
          label="Remaining Leaves:"
          count={fetchedData ?? 0}
          color="bg-green-100 text-green-700"
        ></StatCard>
      </div>

      {!modal && <button onClick={() => setModal(true)} className="rounded-full px-5 py-3 bg-[rgba(0,0,255,0.5)] hover:opacity-90">Open Modal</button>}
      {modal && <Modal style="pop-up" close={handleCloseModal} title="haha" desc="hahaha" fields={fields} />}
    </div>
  );
}
