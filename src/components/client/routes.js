import Home from "components/client/Home";
import ClientLayout from "components/client/ClientLayout";
import Program from "components/programs/program/Program";
import Programs from "components/programs/Programs";
import { AuthProvider } from "utils/context";
import Channels from "components/channels/Channels";
import Channel from "components/channels/channel/Channel";
import Registration from "components/client/Registration";
import Login from "components/client/Login";
import NotFound from "components/NotFound";
import Account from "components/client/account/Account";
import Favorites from "components/client/account/Favorites";
import Verify from "components/client/Verify";

export const clientRoutes = {
  path: "/",
  // parent route component
  element: (
    <AuthProvider isUser={false}>
      <ClientLayout />
    </AuthProvider>
  ),
  // child route components
  children: [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/verify",
      element: <Verify />,
    },
    {
      path: "/programs",
      element: <Programs />,
      children: [
        {
          path: "/programs/:programId",
          element: <Program />,
        },
      ],
    },
    {
      path: "/channels",
      element: <Channels />,
      children: [
        {
          path: "/channels/:channelId",
          element: <Channel />,
        },
      ],
    },
    {
      path: "/account",
      element: <Account />,
    },
    {
      path: "/favorites",
      element: <Favorites />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/registration",
      element: <Registration />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ],
};
