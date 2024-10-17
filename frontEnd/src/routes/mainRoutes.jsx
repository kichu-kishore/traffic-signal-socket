import {
  createBrowserRouter,
} from "react-router-dom";
import MainLayout from "../layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
  }
]);

export default router;