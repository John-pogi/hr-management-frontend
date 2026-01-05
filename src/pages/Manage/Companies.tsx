import ComponentFilter from "../../components/common/ComponentFilter";
import PageMeta from "../../components/common/PageMeta";
import CompanyTable from "../../components/tables/BasicTables/CompanyTable";

export default function Companies() {

  const header = [
    {
      text: '#',
      key: 'id',
      actionFormater(value, index) {
          return index + 1;
      },
    },
    {
      text: 'Name',
      key: 'name'
    },
    {
      text: 'Code',
      key: 'code'
    },
    {
      text: 'Departments',
      key: 'departments',
      valueFormater: (value, index)=> {

        if(value.length <= 0){
          return '--';
        }

        return value.reduce((prev,current)=> prev.length ?  `${prev}, ${current?.name}` :  current?.name , '');
       },
    },
     {
        text: 'Action',
        key: 'action',
        actionFormater(value, index) {
            return <ActionButton  company={value} />
        },
    },
  ];

  return (
    <>
      <PageMeta
        title="Manage Employees"
        description="This page handle employee CRUD functionalities."
      />
      <div className="space-y-6">
        <ComponentFilter>
          <CompanyTable header={header} data={[]} />
        </ComponentFilter>
      </div>
    </>
  );
}
