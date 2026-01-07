export default function EcommerceMetrics() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-4 md:gap-6">
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <span className="inline-block text-gray-800 dark:text-white p-1">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M4 17h16v3h2V10c0-1.65-1.35-3-3-3h-7c-.55 0-1 .45-1 1v7H4V5H2v15h2zm9-8h6c.55 0 1 .45 1 1v5h-7z"/>
              <path d="M7.5 9a2.5 2.5 0 1 0 0 5 2.5 2.5 0 1 0 0-5"/>
            </svg>
          </span>
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Unused Leave
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              0
            </h4>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <span className="inline-block text-gray-800 dark:text-white p-1">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M4 17h16v3h2V10c0-1.65-1.35-3-3-3h-7c-.55 0-1 .45-1 1v7H4V5H2v15h2zm9-8h6c.55 0 1 .45 1 1v5h-7z"/>
              <path d="M7.5 9a2.5 2.5 0 1 0 0 5 2.5 2.5 0 1 0 0-5"/>
            </svg>
          </span>
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Pending Leave
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              0
            </h4>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <span className="inline-block text-gray-800 dark:text-white p-1">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M4 17h16v3h2V10c0-1.65-1.35-3-3-3h-7c-.55 0-1 .45-1 1v7H4V5H2v15h2zm9-8h6c.55 0 1 .45 1 1v5h-7z"/>
              <path d="M7.5 9a2.5 2.5 0 1 0 0 5 2.5 2.5 0 1 0 0-5"/>
            </svg>
          </span>
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Approved Leave
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              6
            </h4>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <span className="inline-block text-gray-800 dark:text-white p-1">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M4 17h16v3h2V10c0-1.65-1.35-3-3-3h-7c-.55 0-1 .45-1 1v7H4V5H2v15h2zm9-8h6c.55 0 1 .45 1 1v5h-7z"/>
              <path d="M7.5 9a2.5 2.5 0 1 0 0 5 2.5 2.5 0 1 0 0-5"/>
            </svg>
          </span>
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Rejected Leave
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              1
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
}
