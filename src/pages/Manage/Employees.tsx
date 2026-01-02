import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import EmployeeTable from "../../components/tables/BasicTables/EmployeeTable";

export default function BasicTables() {
  return (
    <>
      <PageMeta
        title="Manage Employees"
        description="This page handle employee CRUD functionalities."
      />
      <div className="space-y-6">
        <ComponentCard title="Employee Table">
          <EmployeeTable />
        </ComponentCard>
      </div>
    </>
  );
}
