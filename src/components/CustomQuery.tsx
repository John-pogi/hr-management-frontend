import { useState, useCallback } from "react";
import Pagination from "./Pagination";
import { PageQuery, Field } from "../type/interface";
import Modal from "./Modal";

interface ComponentFilterProps {
  children: React.ReactNode;
  className?: string;
  search?: string;
  pageQuery: PageQuery;
  setPageQuery: React.Dispatch<React.SetStateAction<PageQuery>>;
  filterFields?: Field[];
  addFields?: Field[];
  handleAddSubmit?: (e: Record<string, unknown>) => void;
  handleFilterSubmit?: (e: Record<string, unknown>) => void;
}

const ComponentFilter: React.FC<ComponentFilterProps> = ({
  children,
  className = "",
  search = "Search something...",
  pageQuery,
  setPageQuery,
  filterFields = [],
  addFields = [],
  handleAddSubmit = () => {},
  handleFilterSubmit = () => {},
}) => {

  const [modal, setModal] = useState({
    filter: false,
    add: false,
  });

  const handlePageChange = useCallback((perPage: number) => {
    setPageQuery((prev) => ({ 
      ...prev, 
      page: "1", 
      per_page: perPage.toString()
    }));
  }, [setPageQuery]);

  const [timeoutId, setTimeoutId] = useState<number | null>(null);

  const onSearchChange = useCallback((value: string) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const newTimeout = setTimeout(() => {
      setPageQuery(prev => ({ 
        ...prev, 
        page: "1",
        search: value || '' 
      }));
    }, 1000);

    setTimeoutId(newTimeout);
  }, [timeoutId, setPageQuery]);


  const handlePrevPage = useCallback(() => {
    setPageQuery((prev) => ({ 
      ...prev, 
      page: Math.max(1, parseInt(prev.page || "1") - 1).toString()
    }));
  }, [setPageQuery]);

  const handleNextPage = useCallback(() => {
    setPageQuery((prev) => ({ 
      ...prev, 
      page: (parseInt(prev.page || "1") + 1).toString()  // ✅ String conversion
    }));
  }, [setPageQuery]);
  return (
    <div
      className={`rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] ${className}`}
    >
      <div className="flex items-center overflow-auto gap-5 px-6 py-5">

        {addFields.length > 0 && (
          <button
            type="button"
            className="h-11 px-5 py-2.5 border-2 border-gray-300 hover:bg-gray-50 dark:border-[#3E3D4E] dark:hover:bg-white/5 text-blue-500 rounded-md transition-all duration-200 font-medium"
            onClick={() => setModal((prev) => ({
              ...prev,
              add: true,
            }))}
          >
            Create +
          </button>
        )}

        <div className="relative flex-1 max-w-md me-auto">
          <span className="absolute -translate-y-1/2 pointer-events-none left-4 top-1/2 text-blue-500">
            <svg
              className="fill-gray-500 dark:fill-gray-400"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.04175 9.37363C3.04175 5.87693 5.87711 3.04199 9.37508 3.04199C12.8731 3.04199 15.7084 5.87693 15.7084 9.37363C15.7084 12.8703 12.8731 15.7053 9.37508 15.7053C5.87711 15.7053 3.04175 12.8703 3.04175 9.37363ZM9.37508 1.54199C5.04902 1.54199 1.54175 5.04817 1.54175 9.37363C1.54175 13.6991 5.04902 17.2053 9.37508 17.2053C11.2674 17.2053 13.003 16.5344 14.357 15.4176L17.177 18.238C17.4699 18.5309 17.9448 18.5309 18.2377 18.238C18.5306 17.9451 18.5306 17.4703 18.2377 17.1774L15.418 14.3573C16.5365 13.0033 17.2084 11.2669 17.2084 9.37363C17.2084 5.04817 13.7011 1.54199 9.37508 1.54199Z"
                fill="currentColor"
              />
            </svg>
          </span>
          <input
            type="search"
            id="search"
            name="search"
            placeholder={search}
            className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pl-12 pr-4 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-gray-900 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 xl:w-[430px]"
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        {filterFields.length > 0 && (
          <button
            type="button"
            className="flex items-center gap-2 h-11 px-5 py-2.5 border-2 border-gray-300 hover:bg-gray-50 dark:border-[#3E3D4E] dark:hover:bg-white/5 text-blue-500 rounded-md transition-all duration-200 font-medium"
            onClick={() => setModal((prev) => ({
              ...prev,
              filter: true,
            }))}
          >
            <svg
              className="stroke-current fill-white dark:fill-gray-800"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.29004 5.90393H17.7067"
                stroke=""
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M17.7075 14.0961H2.29085"
                stroke=""
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12.0826 3.33331C13.5024 3.33331 14.6534 4.48431 14.6534 5.90414C14.6534 7.32398 13.5024 8.47498 12.0826 8.47498C10.6627 8.47498 9.51172 7.32398 9.51172 5.90415C9.51172 4.48432 10.6627 3.33331 12.0826 3.33331Z"
                fill=""
                stroke=""
                strokeWidth="1.5"
              />
              <path
                d="M7.91745 11.525C6.49762 11.525 5.34662 12.676 5.34662 14.0959C5.34661 15.5157 6.49762 16.6667 7.91745 16.6667C9.33728 16.6667 10.4883 15.5157 10.4883 14.0959C10.4883 12.676 9.33728 11.525 7.91745 11.525Z"
                fill=""
                stroke=""
                strokeWidth="1.5"
              />
            </svg>
            Filters
          </button>
        )}
        
        <Pagination
          onChange={handlePageChange}
          isPrevDisabled={Number(pageQuery.page) <= 1}
          isNextDisabled={false}
          onClickPrev={handlePrevPage}
          onClickNext={handleNextPage}
          page={pageQuery.page}
          perPage={pageQuery.per_page}
          total={100}
        />
      </div>

      {modal.filter && (
        <Modal
          style="pop-up"
          close={() => setModal((prev) => ({
            ...prev,
            filter: false,
          }))}
          title="Filters"
          desc="Narrow data results for faster management."
          fields={filterFields}
          submit={handleFilterSubmit}
        />
      )}

      {modal.add && (
        <Modal
          style="pop-up"
          close={() => setModal((prev) => ({
            ...prev,
            add: false,
          }))}
          title="Create"
          desc="Create a new entry."
          fields={addFields}
          submit={handleAddSubmit}
        />
      )}

      <div className="p-4 border-t border-gray-100 dark:border-gray-800 sm:p-6">
        <div className="space-y-6">{children}</div>
      </div>
    </div>
  );
};

export default ComponentFilter;
