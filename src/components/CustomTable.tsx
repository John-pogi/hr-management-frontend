import {
  Table,
  TableBody,
  TableCell,
  TableHeader as TableHeaderComponent,
  TableRow,
} from "./ui/table";
import { ReactNode } from "react";

export interface TableHeader<T extends Record<string, any> = Record<string, any>> {
  text: string;
  key: keyof T;
  isDisabled?: boolean;
  colSpan?: number;
  rowSpan?: number;
  actionFormatter?: (row: T, index: number) => ReactNode;
  valueFormatter?: (value: any, index: number) => ReactNode;
}

export interface TableProps<T extends Record<string, any>> {
  header: TableHeader<T>[];
  data?: T[];
}

export default function CustomTable<T extends Record<string, any>>({
  header,
  data = [],
}: TableProps<T>) {

    const getContent = (content: any,key: string) => {
        const keys = key.split('.');


        if(keys.length <= 1){
            return content[key] ?? '--';
        }



        let value = content;

        for (let index = 0; index < keys.length; index++) {

            const key = keys[index];

            if(!Object.keys(value).includes(key)){
                return '<invalid key>';
            }	

            value = value[key];

        }

        return value ?? '--';
    }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1102px]">
          <Table>
            <TableHeaderComponent className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                {header
                  .filter((heading) => !heading.isDisabled)
                  .map((heading) => (
                    <TableCell
                      key={String(heading.key)}
                      isHeader
                      className={`px-5 py-3 font-medium text-gray-500 text-theme-xs dark:text-gray-400 ${heading.text === "Action" ? 'text-center' : 'text-start'}`}
                    >
                      {heading.text}
                    </TableCell>
                  ))}
              </TableRow>
            </TableHeaderComponent>

            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {data.map((dataValue, index) => (
                <TableRow key={index}>
                  {header
                    .filter((heading) => !heading.isDisabled)
                    .map((heading) => (
                      <TableCell
                        key={String(heading.key)}
                        className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400"
                      >
                        {heading.actionFormatter ? (
                          heading.actionFormatter(dataValue, index)
                        ) : heading.valueFormatter ? (
                          heading.valueFormatter(     dataValue[ heading.key], index)
                        ) : (
                          getContent(dataValue, heading.key)
                        )}
                      </TableCell>
                    ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
