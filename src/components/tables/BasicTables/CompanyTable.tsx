import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";

export interface TableHeader {
  text: string;
  key: string;
  isDisabled?: boolean;
  colSpan?: number;
  rowSpan?: number;
  valueFormater?: FormatterFn<any>;
  actionFormater?: FormatterFn<any>;
}

export interface TableProps<T extends Record<string, any>> {
  header: typeof TableHeader[];
  data?: T[];
}

type FormatterFn<T> = (value: T[keyof T] | T, index: number) => React.ReactNode;

export default function CompanyTable<T extends Record<string, any>>({header, data = []}: TableProps<T>){
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1102px]">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                {header
                  .filter(heading => !heading.isDisabled)
                  .map(heading => {
                    return (
                      <TableCell
                        isHeader
                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                      >
                        {heading.text}
                      </TableCell>
                    )
                })}
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {
                data.map((dataValue, index) => {
                  return <TableRow key={index}>
                      {
                        header
                        .filter(heading => !heading.isDisabled)
                        .map(heading => {
                          return (
                            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                            {
                              heading.actionFormater 
                              ? heading.actionFormater(dataValue,index)
                              : heading.valueFormater 
                                  ? heading.valueFormater(dataValue[heading.key]) 
                                  : dataValue[heading.key]
                            }
                            </TableCell>
                          );
                        })
                      }
                  </TableRow>
                })
              }
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
