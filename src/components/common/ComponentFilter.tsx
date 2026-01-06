import { useState, useCallback } from "react";
import Modal, { InputProps } from "../modal";
import Pagination from "../pagination/Pagination";

interface PageQuery {
  per_page: number;
  page: number;
  company?: string;
  department?: string;
}

interface ComponentFilterProps {
  children: React.ReactNode;
  className?: string;
  onSearchChange?: (value: string) => void;
  onAddChange?: (value: string) => void;
  pageQuery: PageQuery;
  setPageQuery: React.Dispatch<React.SetStateAction<PageQuery>>;
  filterFields?: InputProps[];
  addFields?: InputProps[];
}

const ComponentFilter: React.FC<ComponentFilterProps> = ({
  children,
  className = "",
  onSearchChange,
  pageQuery,
  setPageQuery,
  filterFields = [],
  addFields = [],
}) => {

  const [modal, setModal] = useState({
    filter: false,
    add: false,
  });

  const handlePageChange = useCallback(
    (perPage: number) => {
      setPageQuery((prev) => ({ ...prev, page: 1, per_page: perPage }));
    },
    [setPageQuery]
  );

  const handlePrevPage = useCallback(() => {
    setPageQuery((prev) => ({ ...prev, page: Math.max(1, prev.page - 1) }));
  }, [setPageQuery]);

  const handleNextPage = useCallback(() => {
    setPageQuery((prev) => ({ ...prev, page: prev.page + 1 }));
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
          <span className="absolute -translate-y-1/2 pointer-events-none left-4 top-1/2">
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
            placeholder="Find a company..."
            className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pl-12 pr-4 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-gray-900 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 xl:w-[430px]"
            onChange={(e) => onSearchChange?.(e.target.value)}
          />
        </div>

        {filterFields.length > 0 && (
          <button
            type="button"
            className="h-11 px-5 py-2.5 border-2 border-gray-300 hover:bg-gray-50 dark:border-[#3E3D4E] dark:hover:bg-white/5 text-blue-500 rounded-md transition-all duration-200 font-medium"
            onClick={() => setModal((prev) => ({
              ...prev,
              filter: true,
            }))}
          >
            Filters
          </button>
        )}
        
        <Pagination
          onChange={handlePageChange}
          isPrevDisabled={pageQuery.page <= 1}
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
          submit={() => 'mother fucker'}
          desc="Narrow data results for faster management."
          fields={filterFields}
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
          submit={() => 'mother fucker'}
          desc="Create a new entry."
          fields={addFields}
        />
      )}

      <div className="p-4 border-t border-gray-100 dark:border-gray-800 sm:p-6">
        <div className="space-y-6">{children}</div>
      </div>
    </div>
  );
};

export default ComponentFilter;
