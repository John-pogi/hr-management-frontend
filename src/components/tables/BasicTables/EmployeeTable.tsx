import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";

import Badge from "../../ui/badge/Badge";

interface Order {
  id: number;
  user: {
    image: string;
    name: string;
    position: string;
  };
  department: string;
  employmentStatus: string;
  attendance: string;
}

const tableData: Order[] = [
  {
    id: 1,
    user: {
      image: "/images/user/user-17.jpg",
      name: "Lindsey Curtis",
      position: "Web Designer",
    },
    department: "IT",
    employmentStatus: "Regular",
    attendance: "Present",
  },
  {
    id: 2,
    user: {
      image: "/images/user/user-18.jpg",
      name: "Kaiya George",
      position: "Project Manager",
    },
    department: "CMT",
    employmentStatus: "Probitionary",
    attendance: "Pending",
  },
  {
    id: 3,
    user: {
      image: "/images/user/user-17.jpg",
      name: "Zain Geidt",
      position: "Content Writing",
    },
    department: "Dev-OPS",
    employmentStatus: "Regular",
    attendance: "Present",
  },
  {
    id: 4,
    user: {
      image: "/images/user/user-20.jpg",
      name: "Abram Schleifer",
      position: "Digital Marketer",
    },
    department: "CS",
    employmentStatus: "Regular",
    attendance: "Absent",
  },
  {
    id: 5,
    user: {
      image: "/images/user/user-21.jpg",
      name: "Carla George",
      position: "Front-end Developer",
    },
    department: "HR",
    employmentStatus: "Probitionary",
    attendance: "Present",
  },
];

export default function BasicTableOne() {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1102px]">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Employee
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Department
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Employment Status
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Attendance
                </TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {tableData.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 overflow-hidden rounded-full">
                        <img
                          width={40}
                          height={40}
                          src={`${order.user.image}`}
                          alt={order.user.name}
                        />
                      </div>
                      <div>
                        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {order.user.name}
                        </span>
                        <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                          {order.user.position}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {order.department}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {order.employmentStatus}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <Badge
                      size="sm"
                      color={
                        order.attendance === "Present"
                          ? "success"
                          : order.attendance === "Absent"
                          ? "error"
                          : "warning"
                      }
                    >
                      {order.attendance}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
