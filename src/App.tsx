import { createBrowserRouter } from "react-router-dom";
import SignIn from "./pages/SignIn/Index";
import NotFound from "./pages/NotFound/Index";
import Employees from "./pages/Employee/Index";
import LeaveRequest from "./pages/LeaveRequest/Index";
import AppLayout from "./layout/AppLayout";
import Index from "./layout/Index";
import Home from "./pages/Dashboard/Home";
import Companies from './pages/Companies/Index'; 
import DTR from './pages/DTR/Index'; 

import Blank from "./pages/Blank";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <SignIn />,
      },
    ],
  },
  {
    path: "/home",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "employees",
        element: <Employees />,
      },
      {
        path: "leave-request",
        element: <LeaveRequest />,
      },
      {
        path: "companies",
        element: <Companies />,
      },
       {
        path: "dtr",
        element: <DTR />,
      },
      {
        path: "blank",
        element: <Blank />,
      },
    ],
  },
]);