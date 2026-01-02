import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";
import { StatCard } from "../components/common/StatCard";
import { fetchData } from "../utils/fetchData";
import { useEffect, useState } from "react";

export default function Leaves() {
  // All of these are bound to change, so if needed, adjust the code accordingly.
  const [leaves, setLeaves] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fetchedData, setFetchedData] = useState<string | null>(null);
  useEffect(() => {
    async function loadLeaves() {
      try {
        setLoading(true);
        // Once the backend has a proper body to send as a response, you can now replace "<any[]>" with the type file that you will be making for this fetch.
        const data = await fetchData<any[]>("/api/leaves");
        setFetchedData(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    }
    loadLeaves();
  }, []);

  return (
    <div>
      <PageMeta
        title="Leaves Dashboard | TailAdmin"
        description="This is Leaves Dashboard for TailAdmin"
      />
      <PageBreadcrumb pageTitle="Leaves" />
      <div className="min-h-7 rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12 flex space-x-4 text-center  ">
        <StatCard
          label={`Unspent Leaves: ${fetchedData.label}`}
          count={fetchedData.count}
          color="bg-green-100 text-green-700"
          className="text-center"
        ></StatCard>
        <StatCard
          label={`Spent Leaves: ${fetchedData.label}`}
          count={fetchedData.count}
          color="bg-green-100 text-green-700"
        ></StatCard>
        <StatCard
          label={`Remaining Leaves: ${cardState.label}`}
          count={cardState.count}
          color="bg-green-100 text-green-700"
        ></StatCard>
      </div>
    </div>
  );
}
