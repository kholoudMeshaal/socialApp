import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from '@heroui/react'
import { useContext, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { AuthUserContext } from '../../Context/AuthContextProvider/AuthContextProvider';
import axios from 'axios';

export default function AppNavBar() {
  //t يعرض 
  //f يقفل

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    //call get user data => update state automaticlly
const { userData, getUserData , setUserData  , setToken } = useContext(AuthUserContext);
  


  const router = useNavigate()

  const profileImage = useRef()
/**************************************************************/
 

function handelLogout() {
    localStorage.clear();
    setToken(null);    
    setUserData(null);
    router('');
}



// console.log(userData)




async function handelUserProfile(){

const myForm =  new FormData()
myForm.append('photo' , profileImage.current.files[0])
  toast.promise(
    axios.put('https://route-posts.routemisr.com/users/upload-photo', myForm,
      {
        headers: {
          token:localStorage.getItem('token')
        }
      }
    ) , {
      loading : 'update profile image',
      success: function({data:{message}}){
        //for updating img 
        getUserData()
        return message
      }, 
      error: function(err){
        return err.response.data.error
      }
    }

  )
}

  return (
    <>
       <Navbar isBordered className='bg-blue-100/40 py-3 ' isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
         
          <p className="font-bold  text-blue-600 " >Linked Posts</p>
        </NavbarBrand>




        
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand>
       
          <p className="font-bold  text-blue-600">Linked Posts</p>
        </NavbarBrand>
        {/* عشان اعرض حاجه من الاتنين  */}
     {userData &&    <NavbarItem>
          <NavLink className={function({isActive}){return isActive? "text-white p-2 rounded-full  bg-slate-400": "" }}  to="/posts">
            Posts
          </NavLink>
        </NavbarItem>}
         <NavLink className={function({isActive}){return isActive? "text-white p-2 rounded-full  bg-slate-400": "" }}  to="/profile">
            Profile
          </NavLink>
           {userData && (
  <NavbarItem>
    <NavLink 
      className={({ isActive }) => isActive ? "text-white p-2 rounded-full bg-slate-400" : ""} 
      to="/notifications"
    >
       Notifications
    </NavLink>
  </NavbarItem>
)}
    
      </NavbarContent>

      <NavbarContent justify="end">

        <NavbarItem>
  <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform cursor-pointer bg-white"
              color="primary"
              name="Jason Hughes"
              size="md"
            src={userData?.photo || 'https://i.pravatar.cc/150?u=default'}/>
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">{userData?.email}</p>
            </DropdownItem>
            <DropdownItem key="settings">Name: {userData?.name}</DropdownItem>
           <DropdownItem key="team_settings" onClick={() => router('/change-password')}>
    Change Password
</DropdownItem>
            <DropdownItem key="analytics" onClick={function(){profileImage.current.click() }} >Update Profile Image</DropdownItem>
            <DropdownItem key="logout" color="danger" onClick={handelLogout}>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown></NavbarItem>
   
      </NavbarContent>





<NavbarMenu className='pt-10 gap-4'>

  
      <NavbarMenuItem>
        <Link 
          className="w-full text-lg  text-blue-600 font-medium" 
          to="/posts" 
          onClick={() => setIsMenuOpen(false)}
        >
          Posts
        </Link>
      </NavbarMenuItem>

      <hr className="my-2 border-gray-200" />


  
      <NavbarMenuItem>
        <Link 
          className="w-full text-lg text-blue-600 font-medium" 
          to="/profile" 
          onClick={() => setIsMenuOpen(false)}
        >
          My Profile
        </Link>
      </NavbarMenuItem>

      <hr className="my-2 border-gray-200" />

    

  
{/* Notification Link for Mobile Menu */}

    <NavbarMenuItem>
      <Link 
        className="w-full text-lg text-blue-600 font-medium flex justify-between items-center" 
        to="/notifications" 
        onClick={() => setIsMenuOpen(false)}
      >
        Notifications
    
        <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full">New</span>
      </Link>
    </NavbarMenuItem>
    <hr className="my-2 border-gray-200" />

      <NavbarMenuItem>
        <button 
          className="w-full text-left text-danger" 
          onClick={() => {
            handelLogout();
            setIsMenuOpen(false);
          }}
        >
          Log Out
        </button>
      </NavbarMenuItem>

</NavbarMenu>


{/* 
      <NavbarMenu className='pt-5'>
       
{userData ? <NavbarMenuItem >
      
            <Link to="post" onClick={function(){setIsMenuOpen(false)}}>
posts
            </Link>
         
        
          </NavbarMenuItem> : <NavbarMenu className='pt-5'>
       
          <NavbarMenuItem >
      
            <Link to="register" onClick={function(){setIsMenuOpen(false)}}>
sign up
            </Link>
         
        
          </NavbarMenuItem>
 
      </NavbarMenu>}


          </NavbarMenu> */}


<input type="file" onChange={handelUserProfile} className='hidden' ref={profileImage}/>


    </Navbar>



    </>
  )
}
