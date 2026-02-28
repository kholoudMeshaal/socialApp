
import { Button, Card, CardBody, CardHeader, Divider, Image } from '@heroui/react'
import CreateComment from '../../components/CreateComment/CreateComment';
import defaultProfile from '../../assets/img/img.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { Edit2, Trash, Heart } from "iconsax-reactjs";
import { useState, useContext } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';
import { AuthUserContext } from '../../Context/AuthContextProvider/AuthContextProvider';
import UpdatePost from '../UpdatePost/UpdatePost';
import ReactionButton from '../ReactionBtn/ReactionBtn';

export default function PostCard({userPost, id}) {








 //crud operation 

    const { image, createdAt, body, user, commentsCount, _id, likes } = userPost;
    const { userData } = useContext(AuthUserContext);
    const [isEditing, setIsEditing] = useState(false);
    const queryClient = useQueryClient();
    const navigate = useNavigate();


    //بيقارن الي عمل البوست ب الي مسجل دخول 
    const isOwner = userData?._id === user?._id;

    // هل اليوزر عمل لايك قبل كده؟
    const isLiked = likes?.includes(userData?._id);
/******************************************************************************************************************/


    //  Like / Unlike
    function toggleLike() {
        return axios.put(
            `https://route-posts.routemisr.com/posts/${_id}/like`,
            {},
            { headers: { token: localStorage.getItem('token') } }
        );
    }




//عشان حوار انها تتعدل قدام اليوزر علطول 
    const { mutate: likeMutate, isPending: isLiking } = useMutation({
        mutationFn: toggleLike,
        onSuccess:  () => {
             queryClient.invalidateQueries({ queryKey: ['allPosts'] });
             queryClient.invalidateQueries({ queryKey: ['SinglePost', _id] });
        }
    });
    /****************************************************************************************************************/

    // Delete
    function deletePost() {
        return axios.delete(
            `https://route-posts.routemisr.com/posts/${_id}`,
            { headers: { token: localStorage.getItem('token') } }
        );
    }

    //لو عمل ديليت  يرجعوا لصفحه البوستات 
    const { mutateAsync: deleteAsync, isPending: isDeleting } = useMutation({
        mutationFn: deletePost,
        onSuccess:  () => {
             queryClient.invalidateQueries({ queryKey: ['allPosts'] });
        
            if (id) navigate('/posts');
        }
    });

    function handleDelete() {
        toast.promise(deleteAsync(), {
            loading: 'Deleting post...',
            success: (res) => res.data.message,
            error: 'Failed to delete post'
        });
    }
    /***********************************************************************************************************/

    return (
        <Card className="max-w-2xl mb-5">
            <CardHeader className="flex gap-3 justify-between">
                <div className="flex gap-3 items-center">
                    <Image
                        alt="user photo"
                        className='bg-gray-400 rounded-full object-cover'
                        height={40}
                        src={userPost?.user?.photo || defaultProfile}
                        width={40}
                    />
                    <div className="flex flex-col">
                        <p className="text-md font-semibold capitalize">{user?.name}</p>
                        <p className="text-tiny text-default-500 font-medium">
                            {new Date(createdAt).toLocaleDateString("en-GB", {
                                day: 'numeric', month: 'short', year: 'numeric'
                            })}
                        </p>
                    </div>
                </div>

                {isOwner && (
                    <div className="flex gap-2">
                        <button onClick={() => setIsEditing(!isEditing)} className="text-gray-400 hover:text-blue-500">
                            <Edit2 size={18} />
                        </button>
                        <button onClick={handleDelete} disabled={isDeleting} className="text-gray-400 hover:text-red-500 disabled:opacity-50">
                            <Trash size={18} />
                        </button>
                    </div>
                )}
            </CardHeader>

            <Divider />

            <CardBody>
                {isEditing ? (
                    <UpdatePost post={userPost} onClose={() => setIsEditing(false)} />
                ) : (
                    <>
                        <p className='mb-4 ps-5'>{body}</p>
                        <img
                            className="w-full object-cover max-h-112.5 rounded-3xl"
                            src={image || "https://www.callofduty.com/content/dam/atvi/callofduty/cod-touchui/blog/body/codm/CODM-S7ANNOUNCE-TOUT.jpg"}
                            alt="post content"
                        />
                    </>
                )}
            </CardBody>

            <hr className="border-t border-gray-200 my-2 w-[90%] mx-auto" />

            <div className="flex items-center justify-between p-2 text-gray-500">
                <div className="flex items-center gap-3">

                    {/*  Like Button */}

                    <ReactionButton
    isLiked={isLiked}
    onLike={() => likeMutate()}
    isLiking={isLiking}
/>
{/* اللايك الي بيسمع في الapi  */}
                   {/* <Button
    isLoading={isLiking} 
    onClick={() => likeMutate()}
    disabled={isLiking}
    className="flex items-center gap-1 hover:bg-gray-50 rounded-full p-2 transition-colors"
>


  
                        <Heart
                            size={20}
                            variant={isLiked ? "Bold" : "Outline"}
                            className={isLiked ? "text-red-500" : "text-gray-400"}
                        />
                        <span className={`text-sm font-medium ${isLiked ? 'text-red-500' : 'text-gray-500'}`}>
                            {likes?.length || 0}
                        </span>
                    </Button> */}

                    {/* Comments Count */}
                    <div className="flex items-center hover:bg-gray-50 rounded-full p-2">
                        <svg width="22px" height="22px" viewBox="0 0 24 24" className="w-5 h-5 ms-2 fill-current">
                            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22ZM8 13.25C7.58579 13.25 7.25 13.5858 7.25 14C7.25 14.4142 7.58579 14.75 8 14.75H13.5C13.9142 14.75 14.25 14.4142 14.25 14C14.25 13.5858 13.9142 13.25 13.5 13.25H8ZM7.25 10.5C7.25 10.0858 7.58579 9.75 8 9.75H16C16.4142 9.75 16.75 10.0858 16.75 10.5C16.75 10.9142 16.4142 11.25 16 11.25H8C7.58579 11.25 7.25 10.9142 7.25 10.5Z" />
                        </svg>
                        <span className='ps-2 font-medium'>{commentsCount || 0} Comments</span>
                    </div>
                </div>

                {!id && (
                    <Link to={`/postDetails/${_id}`} className='text-blue-800 hover:underline cursor-pointer pe-4'>
                        Show all {commentsCount} comments
                    </Link>
                )}
            </div>

            {!isDeleting && <CreateComment id={_id} />}
        </Card>
    );
}
