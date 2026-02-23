import axios from 'axios';
import { createContext, useEffect, useState } from 'react'



export const AuthUserContext = createContext()

export default function AuthContextProvider({children}) {




const [userData, setUserData] = useState({});

const [token, setToken] = useState(() => localStorage.getItem('token'));



/******************************************************/


    async function getUserData() {
      try {
        const response = await axios.get(
          `https://route-posts.routemisr.com/users/profile-data`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        console.log(response);
        setUserData(response.data.data.user);
        return response.data.data.user;
      } catch (error) {
        setUserData(null);
        return null;
      }
    }




    useEffect(() => {
        token && getUserData();
    },[token]);


/******************************************************/



//  function updateToken(newToken) {
//         if (newToken) {
//             localStorage.setItem('token', newToken);
//             setToken(newToken);
//         } else {
//             localStorage.removeItem('token');
//             setToken(null);
//             setUserData(null);
//         }
//     }



const hamada = {token ,  userData, setUserData, getUserData , setToken   }; 
 
  return (
    <AuthUserContext.Provider value={hamada}>
      {children}
    </AuthUserContext.Provider>
  )
}




