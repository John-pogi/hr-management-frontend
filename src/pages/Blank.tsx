import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";

export default function Blank() {
  return (
    <div>
      <PageMeta
        title="Leaves Dashboard | TailAdmin"
        description="This is Leaves Dashboard for TailAdmin"
      />
      <PageBreadcrumb pageTitle="Blank Page" />
      <div className="min-h-7 rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12 flex space-x-4 text-center  ">
        <p className="dark:text-white">BLANK PAGE</p>
      </div>
    </div>
  );
}
