
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({children}) {

  
  if (localStorage.getItem('token')) {
    return children;
  }
  //navigate عشان الباث فوق يتغير ويوديني
  return <Navigate to='/register' />; 
}