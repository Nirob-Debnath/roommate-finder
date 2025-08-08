import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import MainLayout from './mainlayout/MainLayout';
import LogIn from './pages/LogIn';
import Signup from './pages/Signup';
import AddFindRoommate from './pages/AddFindRoommate';
import MyLisitng from './pages/MyLisitng';
import ViewDetails from './pages/ViewDetails';
import UpdateFindRoommate from './pages/UpdateFindRoommate';
import AuthProvider from './context/AuthProvider';
import BrowseLisitng from './pages/BrowseLisitng';
import PrivateRoute from './components/route/PrivateRoute';
import Home from './pages/Home';

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        path: "/",
        loader: () => fetch(`https://roommate-finder-server-neon.vercel.app/addtofindroommate`),
        Component: Home
      },
      {
        path: "addtofindroommate",
        element: (<PrivateRoute>
          <AddFindRoommate />
        </PrivateRoute>)
      },
      {
        path: "browselisting",
        loader: () => fetch(`https://roommate-finder-server-neon.vercel.app/addtofindroommate`),
        Component: BrowseLisitng
      },
      {
        path: "mylisting",
        loader: () => fetch(`https://roommate-finder-server-neon.vercel.app/addtofindroommate`),
        element: (<PrivateRoute>
          <MyLisitng />
        </PrivateRoute>)
      },
      {
        path: 'viewdetails/:id',
        loader: ({ params }) => fetch(`https://roommate-finder-server-neon.vercel.app/addtofindroommate/${params.id}`),
        Component: ViewDetails
      },
      {
        path: '/update/:id',
        loader: ({ params }) => fetch(`https://roommate-finder-server-neon.vercel.app/addtofindroommate/${params.id}`),
        Component: UpdateFindRoommate
      },
      {
        path: "login",
        Component: LogIn
      },
      {
        path: "signup",
        Component: Signup
      },
      {
        path: "/*",
        element: <h2>Error404</h2>,
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)