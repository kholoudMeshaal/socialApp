
import { Navigate } from 'react-router-dom'

export default function AuthProtectedRoute({children}) {

  //يوديني للبوست
  if (localStorage.getItem('token')) {
    return <Navigate to='/'  />;
  }
  
  return children;
}