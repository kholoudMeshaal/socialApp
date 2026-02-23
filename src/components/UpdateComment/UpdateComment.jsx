import { Button, Form, Input } from '@heroui/react'
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function UpdateComment({ comment, postId, onClose }) {

    const queryClient = useQueryClient();

    const { handleSubmit, register } = useForm({
        defaultValues: {
            content: comment.content //بنرفع الكومنت القديم في  الانبوت
        }
    });

    //بتكلم السيرفر وبتبعت ال id 
    // عشان يعرف اي كومنت الي هيتعدل واي بوست 
    //فورم داتا عشان ابعتلوا الجديد 
    function updateComment(data) {
        const myForm = new FormData();
        myForm.append('content', data.content);
        return axios.put(
            `https://route-posts.routemisr.com/posts/${postId}/comments/${comment._id}`,
            myForm,
            { headers: { token: localStorage.getItem('token') } }
        );
    }


    
//بغير في الداتا 
    const { mutateAsync, isPending } = useMutation({
        mutationFn: updateComment,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['comments', postId] });
            onClose(); //بيقفل الايديت 
        }
    });

    function handleUpdate(data) {
        toast.promise(mutateAsync(data), {
            loading: 'Updating...',
            success: (res) => res.data.message,
            error: 'Failed to update comment'
        });
    }

    return (
        <Form onSubmit={handleSubmit(handleUpdate)} className='w-full'>
            <div className="flex w-full items-center gap-2">
                <Input
                    variant="flat"
                    radius="full"
                    {...register('content')}
                    className="flex-1"
                    classNames={{
                        inputWrapper: "bg-white border-1 border-blue-300 focus-within:!border-blue-500",
                    }}
                />
                <Button size="sm" color="primary" type="submit" isLoading={isPending} radius="full">
                    Save
                </Button>
                <Button size="sm" variant="light" onPress={onClose} radius="full">
                    Cancel
                </Button>
            </div>
        </Form>
    );
}