import Account from "components/admin/account/Account";
import AdminLayout from "components/admin/AdminLayout";
import Dashboard from "components/admin/Dashboard";
import Program from "components/programs/program/Program";
import ProgramDelete from "components/programs/program/ProgramDelete";
import ProgramManage from "components/programs/program/ProgramManage";
import Programs from "components/programs/Programs";
import { AuthProvider } from "utils/context";

export const adminRoutes = {
  path: "/admin",
  // parent route component
  element: (
    <AuthProvider isUser={true}>
      <AdminLayout />
    </AuthProvider>
  ),
  // child route components
  children: [
    {
      path: "/admin/",
      element: <Dashboard />,
    },
    {
      path: "/admin/programs",
      element: <Programs />,
      children: [
        {
          path: "/admin/programs/new",
          element: <ProgramManage />,
        },
        {
          path: "/admin/programs/:programId",
          element: <Program />,
        },
        {
          path: "/admin/programs/:programId/edit",
          element: <ProgramManage />,
        },
        {
          path: "/admin/programs/:programId/delete",
          element: <ProgramDelete />,
        },
      ],
    },
    {
      path: "/admin/account",
      element: <Account />,
    },
  ],
};
