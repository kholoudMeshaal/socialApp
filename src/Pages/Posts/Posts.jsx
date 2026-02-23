import { useContext } from "react"
import { AuthUserContext } from "../../Context/AuthContextProvider/AuthContextProvider"
import { useQuery } from "@tanstack/react-query";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import PostCard from "../../components/PostCard/PostCard";
import axios from "axios";
import CreatePost from '../../components/CreatePost/CreatePost' 

export default function Posts() {
    const { token } = useContext(AuthUserContext); 

    function getAllPosts() {
        return axios.get(`https://route-posts.routemisr.com/posts`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
        });
    }

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['allPosts'],
        queryFn: getAllPosts,
    })

    if (isLoading) return <LoadingScreen />
    if (isError) return <div className="bg-red-900 text-4xl text-white text-center h-screen w-full">Error: {error.message}</div>

    return (
        <>
            <div className="max-w-xl mx-auto space-y-5 mt-5">
          

             <CreatePost/>
                {data?.data?.data?.posts.map(function(e) {
                    return <PostCard key={e._id} userPost={e} />
                })}
            </div>
        </>
    )
}