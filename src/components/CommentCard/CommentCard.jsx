import { Avatar, Button, Tooltip } from '@heroui/react'; 
import { useState, useContext } from 'react';
import { Edit2, Trash, Heart } from 'iconsax-reactjs';
import UpdateComment from '../UpdateComment/UpdateComment';
import { AuthUserContext } from '../../Context/AuthContextProvider/AuthContextProvider';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function CommentCard({ commentData, postId }) {

    const { userData } = useContext(AuthUserContext);
    const [isEditing, setIsEditing] = useState(false);
    const queryClient = useQueryClient();

    const isOwner = userData?._id === commentData?.commentCreator?._id;

  
    const isLiked = commentData?.likes?.includes(userData?._id);

 
    function toggleLike() {
        return axios.put(
            `https://route-posts.routemisr.com/posts/${postId}/comments/${commentData._id}/like`,
            {},
            { headers: { token: localStorage.getItem('token') } }
        );
    }

    const { mutate: likeMutate, isPending: isLiking } = useMutation({
        mutationFn: toggleLike,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['comments', postId] });
        }
    });

    // Delete
    function deleteComment() {
        return axios.delete(
            `https://route-posts.routemisr.com/posts/${postId}/comments/${commentData._id}`,
            { headers: { token: localStorage.getItem('token') } }
        );
    }

    const { mutateAsync: deleteAsync, isPending: isDeleting } = useMutation({
        mutationFn: deleteComment,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['comments', postId] });
            await queryClient.invalidateQueries({ queryKey: ['SinglePost', postId] });
            await queryClient.invalidateQueries({ queryKey: ['allPosts'] });
        }
    });

    function handleDelete() {
        toast.promise(deleteAsync(), {
            loading: 'Deleting...',
            success: (res) => res.data.message,
            error: 'Failed to delete comment'
        });
    }

    return (
        <div className="flex gap-3 p-3 bg-gray-50 rounded-xl mb-2 border border-gray-100">
            <Avatar src={commentData?.commentCreator?.photo} size="sm" className="shrink-0" />

            <div className="flex-1">
                <p className="text-sm font-semibold capitalize">{commentData?.commentCreator?.name}</p>

                {isEditing ? (
                    <UpdateComment
                        comment={commentData}
                        postId={postId}
                        onClose={() => setIsEditing(false)}
                    />
                ) : (
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-700">{commentData?.content}</p>

                        <div className="flex gap-1 ms-2 items-center">

                      
                            <Tooltip content={isLiked ? "Unlike" : "Like"} color="danger" closeDelay={0}>
                                <Button
                                    isIconOnly
                                    size="sm"
                                    variant="light"
                                    radius="full"
                                    onClick={() => likeMutate()}
                                    isLoading={isLiking}
                                    className={isLiked ? "text-red-500" : "text-default-400 hover:text-red-400"}
                                >
                                    {!isLiking && (
                                        <Heart size={18} variant={isLiked ? "Bold" : "Outline"} />
                                    )}
                                </Button>
                            </Tooltip>

                      
                            {commentData?.likes?.length > 0 && (
                                <span className={`text-xs font-medium ${isLiked ? 'text-red-500' : 'text-gray-400'}`}>
                                    {commentData.likes.length}
                                </span>
                            )}

     
                            {isOwner && (
                                <>
                                    <Tooltip content="Edit comment" color="primary" closeDelay={0}>
                                        <Button
                                            isIconOnly
                                            size="sm"
                                            variant="light"
                                            radius="full"
                                            onClick={() => setIsEditing(true)}
                                            className="text-default-400 hover:text-primary transition-colors"
                                        >
                                            <Edit2 size={18} variant="Bold" />
                                        </Button>
                                    </Tooltip>

                                    <Tooltip content="Delete comment" color="danger" closeDelay={0}>
                                        <Button
                                            isIconOnly
                                            size="sm"
                                            variant="light"
                                            radius="full"
                                            onClick={handleDelete}
                                            isLoading={isDeleting}
                                            className="text-default-400 hover:text-danger transition-colors"
                                        >
                                            {!isDeleting && <Trash size={18} variant="Bold" />}
                                        </Button>
                                    </Tooltip>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}