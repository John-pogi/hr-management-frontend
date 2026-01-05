import { createBrowserRouter } from "react-router-dom";
import SignIn from "./pages/AuthPages/SignIn";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import Calendar from "./pages/Calendar";
import BasicTables from "./pages/Tables/BasicTables";
import Employees from "./pages/Manage/Employees";
import LeaveRequest from "./pages/Manage/LeaveRequest";
import FormElements from "./pages/Forms/FormElements";
import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import IndexLayout from "./layout/IndexLayout";
import Home from "./pages/Dashboard/Home";
import Companies from './pages/Companies/Index'; 

export const router = createBrowserRouter([
  {
    path: "/",
    element: <IndexLayout />,
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
        path: "profile",
        element: <UserProfiles />,
      },
      {
        path: "calendar",
        element: <Calendar />,
      },
      {
        path: "blank",
        element: <Blank />,
      },
      {
        path: "form-elements",
        element: <FormElements />,
      },
      {
        path: "basic-tables",
        element: <BasicTables />,
      },
      {
        path: "alerts",
        element: <Alerts />,
      },
      {
        path: "avatars",
        element: <Avatars />,
      },
      {
        path: "badge",
        element: <Badges />,
      },
      {
        path: "buttons",
        element: <Buttons />,
      },
      {
        path: "images",
        element: <Images />,
      },
      {
        path: "videos",
        element: <Videos />,
      },
      {
        path: "line-chart",
        element: <LineChart />,
      },
      {
        path: "bar-chart",
        element: <BarChart />,
      },
    ],
  },
]);