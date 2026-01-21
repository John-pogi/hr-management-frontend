import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";
import Modal from "../components/Modal";
import {
  Field,
} from "../type/interface";

export default function Blank() {
  const fields: Field[] = [
    {
      type: "select" as const,
      name: "status",
      label: "Status",
      placeholder: "Select status",
      options: [
        { value: "", label: "All Status" },
        { value: "absent", label: "Absent" },
        { value: "partial", label: "Partial" },
        { value: "present", label: "Present" },
      ],
    },
    {
      type: "textarea" as const,
      name: "companies",
      label: "Companies",
    },
    {
      type: "time" as const,
      name: "from",
      label: "From",
    },
    {
      type: "date" as const,
      name: "to",
      label: "To",
    },
    {
      type: "checkbox" as const,
      name: "a",
      defaultValue: "A",
    },
    {
      type: "checkbox" as const,
      name: "b",
      defaultValue: "B",
    },
    {
      type: "checkbox" as const,
      name: "c",
      defaultValue: "c",
    },
    {
      type: "multi-select" as const,
      name: "department",
      label: "Department",
      placeholder: "Select department",
      options: [
        { value: "IT-Dev", label: "IT-Dev" },
        { value: "CMT", label: "CMT" },
        { value: "Dev-Ops", label: "Dev-Ops" },
        { value: "CS", label: "CS" },
        { value: "HR", label: "HR" },
      ],
    },
    {
      type: 'file' as const,
      name: "file",
      label: "File",
    },
  ]

  const handleSubmit = (formData: Record<string, unknown>) => {
    console.log('Form submitted:', formData);
  };
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

          <Modal style={"view"} fields={fields} submit={handleSubmit} />
        </div>
      </div>
    </div>
  );
}
