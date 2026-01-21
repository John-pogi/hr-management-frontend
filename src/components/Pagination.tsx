import { useEffect, useMemo, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "../../src/icons";

export default function Pagination({ onClickNext, onClickPrev, onChange, total, isNextDisabled, isPrevDisabled, perPage, page}){

    const options = [
        {
            label: '10',
            value: 10,
        },
         {
            label: '30',
            value: 30,
        },
         {
            label: '50',
            value: 50,
        },
        {
            label: '100',
            value: 100,
        },
    ];

    const [selectedOption, setSelectedOption] = useState(options[0].value);

    const handleOnChange = (e) => {
        setSelectedOption(e.target.value);
    }

    useEffect(()=>{
        if(onChange){
            onChange(selectedOption);
        }
    },[selectedOption, onChange])

    const paginationText = useMemo(()=>{

        const maxContent = page * perPage ;
        const minContent = (maxContent ?? 0) - (perPage -1);

        return `${minContent ?? 0} - ${   Math.min((maxContent ?? 0), total)  }`

    }, [page,perPage, total]) ;

    return<>

    <div className="flex items-center gap-1 h-11 min-w-[275px] px-2 py-2.5 rounded-lg max-w-max border-[2px] border-gray-300 dark:border-[#3E3D4E] text-blue-500 hover:bg-[rgba(0,0,0,0.05)] dark:hover:bg-[rgba(255,255,255,0.05)]">
         
         <button disabled={isPrevDisabled} onClick={onClickPrev} className="pr-2 dark:border-gray-700 border-r">
            <ChevronLeftIcon className={`text-[24px] ${isPrevDisabled ? '!text-gray-300 dark:!text-gray-700' : ''}`}/>
         </button>

        <select  
            value={selectedOption}
            onChange={handleOnChange} 
            className="border-none outline-none text-blue-500 bg-transparent">
                {options.map((option, index) => (
                    <option key={index} value={option.value}>{option.label}</option>
                ))}
        </select>

        {(total || total == 0) && (
            <>
                <div className="flex gap-2 mx-2">
                    <span>{paginationText}</span>
                    <span>of</span>
                    <span>{total}</span>
                </div>
            </>
        )}            

         <button disabled={isNextDisabled} onClick={onClickNext} className="pl-2 border-l dark:border-gray-700">
            <ChevronRightIcon className={`text-[27px] ${isNextDisabled ? '!text-gray-300 dark:!text-gray-700' : ''}`}/>
         </button>
    </div>
    </>
}