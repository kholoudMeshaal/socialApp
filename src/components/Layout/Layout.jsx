import { Outlet } from 'react-router-dom'
import AppNavBar from '../AppNavBar/AppNavBar'
import { useContext } from 'react'
import { AuthUserContext } from '../../Context/AuthContextProvider/AuthContextProvider'
// import Register from "../../Pages/Register/Register";

export default function Layout() {

  const { token } = useContext(AuthUserContext)

  return (
    <>
    {/* <Register /> */}
      {token && <AppNavBar />}
      <main>
        <div className='min-h-screen bg-gray-300 pt-1'>
          <Outlet />
        </div>
      </main>
    </>
  )
}