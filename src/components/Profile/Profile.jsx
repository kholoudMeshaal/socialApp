import { Card, CardHeader, CardBody, Avatar, Divider, Button } from "@heroui/react";
import { useContext } from "react";
import { AuthUserContext } from "../../Context/AuthContextProvider/AuthContextProvider";
import { User, Sms, Edit } from "iconsax-reactjs";
import LoadingScreen from "../../Pages/LoadingScreen/LoadingScreen";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import PostCard from "../PostCard/PostCard";

export default function Profile() {
  const { userData , token } = useContext(AuthUserContext);

function getUserPosts() {
    return axios.get(`https://route-posts.routemisr.com/users/${userData?._id}/posts`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}

const { data : posts, isLoading } = useQuery({
    queryFn: getUserPosts,
    queryKey: ['profileData'],
    select: (data) => data.data.data.posts 
    
  
})


console.log("posts", posts);



if (isLoading){
    return <LoadingScreen/>
}


  return (
<>
    {userData ? (<main className="profile-page">
  <section className="relative block h-125">


    <div className="absolute top-0 w-full h-full bg-linear-to-r from-blue-600 to-cyan-400">
      <div className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-17.5" 
           style={{transform: 'translateZ(0px)'}}>
        <svg className="absolute bottom-0 overflow-hidden" xmlns="http://www.w3.org/2000/svg" 
             preserveAspectRatio="none" version="1.1" viewBox="0 0 2560 100" x={0} y={0}>
          <polygon className="text-gray-200 fill-current" points="2560 0 2560 100 0 100" />
        </svg>
      </div>
    </div>

  </section>

  <section className="relative py-16 bg-gray-200">
    <div className="container mx-auto px-4">
      <div className="relative flex flex-col min-w-0 wrap-break-word bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
        <div className="px-6">

          <div className="flex flex-wrap justify-center">
            {/* صورة البروفايل */}
            <div className="w-full lg:w-3/12  px-4 lg:order-2 flex justify-center">
              <div className="relative">
                <img 
                  alt="profile" 
                  src={userData.photo}
                  className="shadow-xl rounded-full align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-37.5" 
                />
              </div>
            </div>

          </div>

          {/* بيانات اليوزر */}
          <div className="text-center mt-35">
            <h3 className="text-4xl font-semibold leading-normal mb-2 text-gray-700">
             {userData.name}
            </h3>
            <div className="text-sm leading-normal mt-0 mb-2 text-gray-400 font-bold uppercase">
            {userData.email}
            </div>
            {/* <div className="mb-2 text-gray-600 mt-10">
             {userData.dateOfBirth}
            </div> */}

          </div>

<div className="flex flex-col items-center w-full mt-10 max-w-2xl mx-auto px-4 gap-8">
  

  <div className="text-center">
    <h2 className="text-3xl font-extrabold text-gray-800 tracking-tight capitalize">
      <span className="text-blue-600">
        {userData?.name?.split(' ')[0]}'s
      </span> Posts
    </h2>
    <div className="w-16 h-1 bg-blue-500 mx-auto rounded-full mt-2"></div>
  </div>


  <div className="flex flex-col gap-6 w-full items-center">
    {posts?.map((e) => (
      <PostCard key={e._id} userPost={e} />
    ))}
  </div>

</div>

        </div>
      </div>
    </div>
  </section>
</main>): <LoadingScreen/>}


    </>

  );
}



