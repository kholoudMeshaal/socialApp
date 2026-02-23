import { Button, Form, Textarea } from '@heroui/react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';
import { DocumentUpload } from 'iconsax-reactjs';
import { useRef, useState } from 'react';

export default function UpdatePost({ post, onClose }) {

    const queryClient = useQueryClient();
    const imgUpload = useRef();

    //  ابدأ بالصورة القديمة للبوست
    const [image, setImage] = useState(null);
    const [userImg, setUserImg] = useState(post.image || null);

    const { handleSubmit, register } = useForm({
        defaultValues: { body: post.body }
    });

    //  لما يختار صورة جديدة
    function handleImgUpload(e) {
        setImage(e.target.files[0]);
        setUserImg(URL.createObjectURL(e.target.files[0]));
    }

    function updatePost(data) {
        const myForm = new FormData();
        myForm.append('body', data.body);
        if (image) myForm.append('image', image); 
        return axios.put(
            `https://route-posts.routemisr.com/posts/${post._id}`,
            myForm,
            { headers: { token: localStorage.getItem('token') } }
        );
    }

    const { mutateAsync, isPending } = useMutation({
        mutationFn: updatePost,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['allPosts'] });
            await queryClient.invalidateQueries({ queryKey: ['SinglePost', post._id] });
            onClose();
        }
    });

    function handleUpdate(data) {
        toast.promise(mutateAsync(data), {
            loading: 'Updating post...',
            success: (res) => res.data.message,
            error: 'Failed to update post'
        });
    }

    return (
        <Form onSubmit={handleSubmit(handleUpdate)} className='w-full p-2'>
            <Textarea
                variant="flat"
                radius="lg"
                {...register('body')}
                className="w-full mb-3"
                classNames={{
                    inputWrapper: "bg-white border-1 border-blue-300 focus-within:!border-blue-500",
                }}
            />

       
            {userImg && (
                <div className="relative w-full rounded-xl overflow-hidden border mb-3">
                    <img
                        src={userImg}
                        className="w-full h-auto max-h-80 object-cover"
                        alt="preview"
                    />
                
                    <Button
                        size="sm"
                        color="danger"
                        className="absolute top-2 right-2 rounded-full"
                        onPress={() => { setUserImg(null); setImage(null); }}
                    >
                        ✕
                    </Button>
                </div>
            )}

            <div className="flex gap-2 justify-between w-full items-center">
              
                <DocumentUpload
                    onClick={() => imgUpload.current.click()}
                    size="28"
                    className='text-blue-600 cursor-pointer hover:text-blue-800 transition-colors'
                />

                <div className="flex gap-2">
                    <Button size="sm" color="primary" type="submit" isLoading={isPending} radius="full">
                        Save
                    </Button>
                    <Button size="sm" variant="light" onPress={onClose} radius="full">
                        Cancel
                    </Button>
                </div>
            </div>

            <input type='file' className='hidden' onChange={handleImgUpload} ref={imgUpload} />
        </Form>
    );
}