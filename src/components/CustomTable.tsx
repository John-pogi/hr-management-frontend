import {
  Table,
  TableBody,
  TableCell,
  TableHeader as TableHeaderComponent,
  TableRow,
} from "./ui/table";
import { TableHeader } from "../type/interface";

export interface TableProps<T extends object> {
  header: TableHeader<T>[];
  data?: T[];
}

export default function CustomTable<T extends object>({
  header,
  data = [],
}: TableProps<T>) {
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
              {data.map((value, index) => (
                <TableRow key={index}>
                  {header
                    .filter((heading) => !heading.isDisabled)
                    .map((heading) => (
                      <TableCell
                        key={String(heading.key)}
                        className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400"
                      >
                        {heading.actionFormatter ? (
                          heading.actionFormatter(value, index)
                        ) : heading.valueFormatter ? (
                          heading.valueFormatter(value[heading.key as keyof T], index, value)
                        ) : (
                          `${value[heading.key as keyof T] ?? "--"}`
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