import { StatCardProps } from "../../types/Stat";
export const StatCard: React.FC<StatCardProps> = ({ label, count, color }) => {
  return (
    <div
      className={`rounded-xl p-5 shadows-sm flex flex-col justify-center items-center ${color ?? "bg-gray-100 text-gray-800"}`}
    >
      <p className="text-sm">{label}</p>
      <h3 className="mt-1 text-2xl font-semibold">{count}</h3>
    </div>
  );
};
