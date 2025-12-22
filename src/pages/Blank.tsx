import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";
import Modal, { InputProps } from "../components/modal";

export default function Blank() {
  const fields: InputProps[] = [
    {
      type: "text",
      name: "test",
      placeholder: "Enter your email",
      hint: "This is an invalid email address.",
    },
    {
      type: "password",
      name: "test",
      placeholder: "Enter your email",
      hint: "This is an invalid email address.",
      disabled: true,
    },
    {
      type: "email",
      name: "test",
      placeholder: "Enter your email",
      hint: "This is an invalid email address.",
      success: true,
    },
    {
      type: "number",
      name: "test",
      placeholder: "Enter your email",
      hint: "This is an invalid email address.",
      error: true,
    },
    {
      type: "select",
      name: "test",
      placeholder: "Select an option",
      options: [
        { value: "marketing", label: "Marketing" },
        { value: "template", label: "Template" },
        { value: "development", label: "Development" },
      ],
    },
    {
      type: "textarea",
      name: "test",
      placeholder: "Enter your email",
      disabled: true,
    },
    {
      type: "textarea",
      name: "test",
      placeholder: "Enter your email",
    },
    {
      type: "file",
    },
    {
      type: "checkbox",
      label: "checkbox",
    },
    {
      type: "dropzone",
    },
  ]
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

          <Modal fields={fields} />

        </div>
      </div>
    </div>
  );
}
