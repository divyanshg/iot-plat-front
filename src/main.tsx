import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Protected from './components/Protected.tsx';
import Public from './components/public.tsx';
import Certificates from './pages/Certificates/index.tsx';
import NewCertificate from './pages/Certificates/New.tsx';
import Device from './pages/Devices/Device.tsx';
import Devices from './pages/Devices/index.tsx';
import NewDevice from './pages/Devices/New.tsx';
import Group from './pages/Groups/Group.tsx';
import Groups from './pages/Groups/index.tsx';
import NewGroup from './pages/Groups/New.tsx';
import NewSubGroup from './pages/Groups/NewSubGroup.tsx';
import SubGroup from './pages/Groups/SubGroup.tsx';
import Home from './pages/Home.tsx';
import Login from './pages/login.tsx';
import NotFound from './pages/NotFound.tsx';
import Policies from './pages/Policies/index.tsx';
import NewPolicies from './pages/Policies/New.tsx';
import Policy from './pages/Policies/Policy.tsx';
import Register from './pages/Register.tsx';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Public />,
    children: [
      {
        path: "",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: ":org_id",
    element: <Protected />,
    errorElement: <NotFound />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "groups",
        children: [
          {
            path: "",
            element: <Groups />,
          },
          {
            path: "new",
            element: <NewGroup />,
          },
          {
            path: ":group_id",
            children: [
              { path: "", element: <Group /> },
              {
                path: "subgroups",
                children: [
                  {
                    path: "new",
                    element: <NewSubGroup />,
                  },
                  {
                    path: ":sub_grp_id",
                    element: <SubGroup />,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        path: "devices",
        children: [
          {
            path: "",
            element: <Devices />,
          },
          {
            path: "new",
            element: <NewDevice />,
          },
          {
            path: ":id",
            element: <Device />,
          },
        ],
      },
      {
        path: "certificates",
        children: [
          {
            path: "",
            element: <Certificates />,
          },
          {
            path: "new",
            element: <NewCertificate />,
          },
        ],
      },
      {
        path: "policies",
        children: [
          {
            path: "",
            element: <Policies />,
          },
          {
            path: "new",
            element: <NewPolicies />,
          },
          {
            path: ":id",
            element: <Policy />,
          },
        ],
      },
      {
        path: "*",
        element: <NotFound />,
      },
      // {
      //   path: ":id",
      //   children: [
      //     {
      //       path: "",
      //       element: <Room />,
      //     },
      //     {
      //       path: "dashboard",
      //       element: <Dashboard />,
      //     },
      //     {
      //       path: "properties",
      //       element: <Properties />,
      //     },
      //   ],
      // },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
