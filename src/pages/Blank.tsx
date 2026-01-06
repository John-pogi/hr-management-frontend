import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";
import LeaveStatCardComponent from "../components/LeaveStatCardComponent";

export default function Blank() {
  return (
    <div>
      <PageMeta
        title="Leaves Dashboard | TailAdmin"
        description="This is Leaves Dashboard for TailAdmin"
      />
      <PageBreadcrumb pageTitle="Leaves" />
      <LeaveStatCardComponent />
    </div>
  );
}
