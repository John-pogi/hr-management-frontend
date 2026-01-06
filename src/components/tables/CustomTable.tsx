
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
  header: TableHeader[];
  data?: T[];
}

type FormatterFn<T> = (value: T[keyof T] | T, index: number) => React.ReactNode;

export default function CustomTable<T extends Record<string, any>>({header, data = []}: TableProps<T>){


    const getContent = (content: any,key: string) => {
        const keys = key.split('.');

        if(keys.length <= 1){
            return content[key];
        }

        let value = content;

        for (let index = 0; index < keys.length; index++) {

            const key = keys[index];

            if(!Object.keys(value).includes(key)){
                return '<invalid key>';
            }	

            value = value[key];

        }

        return value;
    }

    return <>
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
            <div className="max-w-full overflow-x-auto">
                <div className="min-w-[1102px]">
                    <table className="min-w-full">
                        <thead className="border-b border-gray-100 dark:border-white/[0.05]">
                            <tr>
                            {header
                                .filter(heading => !heading.isDisabled)
                                .map(heading => {
                                    return <th className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400" colSpan={heading.colSpan ?? 1} rowSpan={heading.rowSpan ?? 1}>{heading.text}</th>
                            })}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                            {
                                data.map((dataValue, index) => {
                                    return <tr>
                                        {
                                            header
                                            .filter(heading => !heading.isDisabled)
                                            .map(heading => {
                                                return (
                                                        <td className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400" colSpan={heading.colSpan ?? 1} rowSpan={heading.rowSpan ?? 1}>
                                                            {
                                                                heading.actionFormater 
                                                                ? heading.actionFormater(dataValue,index)
                                                                : heading.valueFormater 
                                                                    ? heading.valueFormater(getContent(dataValue, heading.key)) 
                                                                    : getContent(dataValue, heading.key)
                                                            }
                                                        </td>
                                                );
                                            })
                                        }
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </>
}