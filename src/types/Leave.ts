export interface LeaveRecord {
  id: string;
  employeeName: string;
  startDate: string;
  endDate: string;
  days: number;
  type: "Paid" | "Sick" | "Unpaid" | "Maternity/Paternity";
  status: "Pending" | "Approved" | "Rejected" | "Unused";
  reason: string;
}
