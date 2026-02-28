import Layout from "../components/Layout/Layout";
import Posts from "../Pages/Posts/Posts";
import Register from "../Pages/Register/Register";
import NotFound from "../Pages/NotFound/NotFound";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from './ProtectedRoute/ProtectedRoute'
import AuthProtectedRoute from "./AuthProtectedRoute/AuthProtectedRoute";
import PostDetails from "../Pages/SinglePost/SinglePost";
import ChangePassword from "../components/ChangePass/ChangePass";
import Profile from "../components/Profile/Profile";
// import Notification from "../Pages/Notfication/Notification";

export const myRouter = createBrowserRouter([

  {
    path: '', 
    element: <Register />
  },
  

  {
    path: "/", 
    element: <Layout />, 
    children: [
      { 
        path: 'posts',
        element: <Posts /> 
      },
     
      { 
        path: 'posts', 
        element: <ProtectedRoute><Posts /></ProtectedRoute> 
      },
 { 
        path: 'postDetails/:id',
        element: <ProtectedRoute><PostDetails /></ProtectedRoute> 
      },
      { 
        path: '*', 
        element: <NotFound /> 
      },
      {path: "/change-password", element: <ChangePassword />} ,
      { path: 'profile', element: <Profile /> } , 
      // { path: 'notifications', element: <ProtectedRoute><Notification /></ProtectedRoute> }
    ]
  }
]);