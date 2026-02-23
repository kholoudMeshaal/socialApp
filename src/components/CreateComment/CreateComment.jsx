import { Avatar, Button, Form, Input } from '@heroui/react'
import { Send2 } from "iconsax-reactjs"; 
import { useContext } from 'react';
import { AuthUserContext } from '../../Context/AuthContextProvider/AuthContextProvider';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function CreateComment({id}) {
 
 const { userData } = useContext(AuthUserContext); 
const queryClient = useQueryClient()

const { handleSubmit , register , reset}= useForm({
    defaultValues:{
        content: ""
    }
})
function setUserComment(data){
 
    const myForm = new FormData()
    myForm.append('content', data.content)
    return axios.post(`https://route-posts.routemisr.com/posts/${id}/comments` ,myForm ,
        {headers:{
            token: localStorage.getItem('token')
        }}
    )
}


 const {mutateAsync , data , isPending} = useMutation({
    mutationFn: setUserComment ,
    onSuccess: function(){
        reset()
        queryClient.invalidateQueries({queryKey: ['allPosts']})
        queryClient.invalidateQueries({ queryKey: ['SinglePost', id] })
        queryClient.invalidateQueries({ queryKey: ['comments', id] });
    }
})




function hamda (data){
toast.promise(
    mutateAsync(data),
    {
        loading: 'comment Creating...',
        success: function(data){
         return data.data.message
        }
    }
)
}



    return (
     <Form onSubmit={handleSubmit(hamda)} className='w-full'>
           <div className="flex w-full items-center gap-3 bg-gray-50 p-4 rounded-xl mt-2 border border-gray-100">
            <Avatar 
              
                src={userData?.photo} 
                size="sm" 
                className="shrink-0"
             
            />
            
            <Input
                variant="flat"
                placeholder={`Write a Comment...`}
                radius="full" {...register('content')}
                className="flex-1"
                classNames={{
                    inputWrapper: "bg-white border-1 border-gray-200 hover:border-blue-400 focus-within:!border-blue-500 transition-all",
                    input: "text-sm"
                }}
                endContent={
                    <Button 
                        isIconOnly isLoading={isPending}
                        size="sm"
                         type='submit'
                        variant="light" 
                        className="text-blue-600 hover:bg-blue-50"
                    >
                        <Send2 size={20} variant="Bold" />
                    </Button>
                }
            />
        </div>
     </Form>
    )
}