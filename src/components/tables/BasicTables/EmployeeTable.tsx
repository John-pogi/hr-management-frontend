import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";

import Badge from "../../ui/badge/Badge";
import Button from "../../ui/button/Button";

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
  {
    id: 6,
    user: {
      image: "/images/user/user-21.jpg",
      name: "Carla George",
      position: "Front-end Developer",
    },
    department: "HR",
    employmentStatus: "Probitionary",
    attendance: "Present",
  },
  {
    id: 7,
    user: {
      image: "/images/user/user-21.jpg",
      name: "Carla George",
      position: "Front-end Developer",
    },
    department: "HR",
    employmentStatus: "Probitionary",
    attendance: "Present",
  },
  {
    id: 8,
    user: {
      image: "/images/user/user-21.jpg",
      name: "Carla George",
      position: "Front-end Developer",
    },
    department: "HR",
    employmentStatus: "Probitionary",
    attendance: "Present",
  },
  {
    id: 9,
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
    <>
      <p>gahahaha</p>
    
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
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400"
                  >
                    Action
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
                    <TableCell>
                      <div className="flex justify-center gap-3">
                        <Button size="sm" className="!text-green-500" variant="outline" onClick={() => 'order.id'}>
                          <svg
                            className="w-4 h-4 mr-1 fill-current"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                            <path fillRule="evenodd" clipRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"/>
                          </svg>
                          Read
                        </Button>
                        <Button size="sm" className="!text-blue-500" variant="outline" onClick={() => 'order.id'}>
                          <svg
                            className="fill-current"
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z"
                              fill=""
                            />
                          </svg>
                          Update
                        </Button>
                        <Button size="sm" className="!text-red-500" variant="outline" onClick={() => 'order.id'}>
                          <svg
                            className="w-4 h-4 mr-1 fill-current"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path fillRule="evenodd" clipRule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9zM4 5a1 1 0 012 0 1 1 0 001 1h8a1 1 0 001-1 1 1 0 112 0v2a2 2 0 01-1.414 1.828L15 9.414l-1.293 1.293a1 1 0 01-1.414 0L12 10.586l-1.293 1.293a1 1 0 01-1.414 0L9 10.414l-.707.707A2 2 0 017 12V5a1 1 0 012 0z"/>
                          </svg>
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
}
