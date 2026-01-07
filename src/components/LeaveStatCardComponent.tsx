import { StatCard } from "./common/StatCard";
import { useEffect, useState, useMemo } from "react";
import { LeaveRecord } from "../types/Leave";

export default function LeaveStatCardComponent() {
  const [fetchedData, setFetchedData] = useState<LeaveRecord[]>([]);

  useEffect(() => {
    const mockData: LeaveRecord[] = [
      {
        id: "1",
        employeeName: "Keynes Ken",
        type: "Paid",
        startDate: "2026-01-02",
        endDate: "2026-01-03",
        days: 2,
        status: "Approved",
        reason: "Vacation",
      },
      {
        id: "2",
        employeeName: "Keynes Ken",
        type: "Sick",
        startDate: "2026-01-05",
        endDate: "2026-01-05",
        days: 1,
        status: "Pending",
        reason: "Fever",
      },
      {
        id: "3",
        employeeName: "Keynes Ken",
        type: "Paid",
        startDate: "2026-01-10",
        endDate: "2026-01-12",
        days: 3,
        status: "Rejected",
        reason: "Busy season",
      },
    ];
    setFetchedData(mockData);
  }, []);

  const stats = useMemo(() => {
    return {
      approved: fetchedData.filter((i) => i.status === "Approved").length,
      pending: fetchedData.filter((i) => i.status === "Pending").length,
      rejected: fetchedData.filter((i) => i.status === "Rejected").length,
      unused: fetchedData.filter((i) => i.status === "Unused").length,
    };
  }, [fetchedData]);

  return (
    // These StatCards are just components that will appear in any desired section of a page, mostly a profile page or inside of the "Leaves" page (upper section).
    <div className="min-h-7 rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12 flex space-x-4 text-center  ">
      <StatCard
        label="Approved Leaves:"
        count={stats.approved}
        color="bg-green-100 text-green-700"
        className="text-center"
      ></StatCard>
      <StatCard
        label="Unused Leaves:"
        count={stats.unused}
        color="bg-green-100 text-green-700"
        className="text-center"
      ></StatCard>
      <StatCard
        label="Pending Leaves:"
        count={stats.pending}
        color="bg-green-100 text-green-700"
        className="text-center"
      ></StatCard>
      <StatCard
        label="Rejected Leaves:"
        count={stats.rejected}
        color="bg-green-100 text-green-700"
        className="text-center"
      ></StatCard>
    </div>
  );
}
