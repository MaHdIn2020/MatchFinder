import {
  createBrowserRouter,
} from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Authenticaton/Login";
import Register from "../pages/Authenticaton/Register";
import UserDashboard from "../pages/Shared/UserDashboard";
import EditBiodata from "../pages/Shared/EditBiodata";
import ViewBiodata from "../pages/Shared/ViewBiodata";
import MyContactRequests from "../pages/Shared/MyContactRequest";
import PrivateRoute from "./PrivateRoute";
import AdminDashboardLayout from "../pages/Shared/AdminDashboard";
import FavoritesBiodata from '../pages/Shared/FavoritesBiodata';
import AdminDashboardHome from '../pages/Shared/AdminDashboardHome';
import ManageUsers from '../pages/Shared/ManageUsers';
import ApprovedPremium from '../pages/Shared/ApprovedPremium';
import ApprovedContactRequest from '../pages/Shared/ApprovedContactRequest';
import BiodatasPage from '../pages/Shared/BiodatasPage';
import BiodataDetails from '../pages/Shared/BiodataDetails';
import CheckoutContact from '../pages/Shared/CheckoutContact';
import GotMarried from '../pages/Shared/GotMarried';
import AdminSuccessStories from '../pages/Shared/AdminSuccessStories';
import ErrorPage from "../pages/Shared/ErrorPage";


const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
        {
            index: true,
            Component: Home
        },
        {
          path: "/dashboard",
          Component: UserDashboard,
          children: [
            {
              index:true,
              path:"edit-biodata",
              Component: EditBiodata
            },
            {
              path:'view-biodata/:biodataId',
              Component: ViewBiodata
            },
            {
              path: 'contact-requests',
              Component: MyContactRequests,
            },
            {
              path: 'favorites',
              Component: FavoritesBiodata
            },
            {
              path: 'got-married',
              Component: GotMarried
            },
          ]
        },
        {
          path: '/biodatas',
          Component: BiodatasPage
        },
        {
          path: '/biodata/:biodataId',
          element: <PrivateRoute>
            <BiodataDetails />
          </PrivateRoute>
        },
        {
          path: '/checkout/:biodataId',
          element: <PrivateRoute>
            <CheckoutContact />
          </PrivateRoute>
        },
        {
          path:'admin-dashboard',
          element: <PrivateRoute>
            <AdminDashboardLayout></AdminDashboardLayout>
          </PrivateRoute>,
          children: [
            {
              index: true,
              path: '',
              Component: AdminDashboardHome
            },
            {
              path: 'manage-users',
              Component: ManageUsers
            },
            {
              path: 'approved-premium',
              Component: ApprovedPremium
            },
            {
              path: 'approved-contact-requests',
              Component: ApprovedContactRequest
            },
            {
              path: 'success-stories',
              Component: AdminSuccessStories
            }
          ]
        }

    ]
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path:'/login',
        Component: Login
      },
      {
        path:"/register",
        Component: Register
      }
    ]
  }
]);

export default router