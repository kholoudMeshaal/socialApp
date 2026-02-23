import axios from "axios";
import { useParams } from "react-router-dom";
import PostCard from "../../components/PostCard/PostCard";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import CommentCard from "../../components/CommentCard/CommentCard";
import { useQuery } from "@tanstack/react-query";

export default function SinglePost() {

  const { id } = useParams();

   function getSinglePost() {
  
     return axios.get(`https://route-posts.routemisr.com/posts/${id}` , {
        headers: {
          token: localStorage.getItem('token')
        }
      });
    
  }

 function getComments() {
   
     return axios.get(
        `https://route-posts.routemisr.com/posts/${id}/comments?page=1&limit=10`,
        { headers: { token: localStorage.getItem('token') } }
      );

 
  }

  const { data, isLoading: postLoading } = useQuery({
    queryKey: ['SinglePost', id], //  عشان لو اتغير يعمل fetch تاني
    queryFn: getSinglePost,
    retry: false,
  });

  const { data: commentsData, isLoading: commentsLoading } = useQuery({
    queryKey: ['comments', id],
    queryFn: getComments ,
    retry: false,
  });

  if (postLoading || commentsLoading) return <LoadingScreen />;


    return (
    <div className="max-w-xl mx-auto mt-10">
  
      <PostCard id userPost={data?.data?.data?.post} />

  
      <div className="mt-4">
 
          {commentsData.data.data.comments.map(comment => (
            <CommentCard key={comment._id} commentData={comment} postId={id}/>


            
          ))}
      
      </div>
    </div>
  );
}