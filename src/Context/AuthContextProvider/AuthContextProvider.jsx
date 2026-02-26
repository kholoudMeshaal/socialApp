import axios from 'axios';
import { createContext, useEffect, useState } from 'react'



export const AuthUserContext = createContext()

export default function AuthContextProvider({children}) {




const [userData, setUserData] = useState({});
//من غير دي انا كل مره لازم اعمل لوج ان 
const [token, setToken] = useState(() => localStorage.getItem('token'));



/******************************************************/

//المكان الي هستور فيه الداتا هو هو الي هستلم فيه التوكين 
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



//بمنع ريريندر عمال علي بطال 
//اتاكد ان في توكين قبل ما تكلم ال api 
    useEffect(() => {
        token && getUserData();
    },[token]);


/******************************************************/


const hamada = {token ,  userData, setUserData, getUserData , setToken   }; 
 
  return (
    <AuthUserContext.Provider value={hamada}>
      {children}
    </AuthUserContext.Provider>
  )
}




