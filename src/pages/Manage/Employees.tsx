import ComponentFilter from "../../components/common/ComponentFilter";
import PageMeta from "../../components/common/PageMeta";
import EmployeeTable from "../../components/tables/BasicTables/EmployeeTable";

export default function Employees() {
  return (
    <>
      <PageMeta
        title="Manage Employees"
        description="This page handle employee CRUD functionalities."
      />
      <div className="space-y-6">
        <ComponentFilter>
          <EmployeeTable />
        </ComponentFilter>
      </div>
    </>
  );
}
