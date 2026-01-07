import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";

export default function Blank() {
  return (
    <div>
      <PageMeta
        title="Blank Page"
        description="This is blank page."
      />
      <PageBreadcrumb pageTitle="Blank Page" />
    </div>
  );
}
