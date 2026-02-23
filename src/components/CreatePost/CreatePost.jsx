import { Avatar, Button, Card, CardBody, CardHeader, Divider, Form, Input } from '@heroui/react'
import { useContext, useRef, useState } from 'react'
import {AuthUserContext} from '../../Context/AuthContextProvider/AuthContextProvider'
import {DocumentUpload} from 'iconsax-reactjs'
import {useForm} from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';
import {useMutation, useQueryClient} from '@tanstack/react-query'




export default function CreatePost() {

 const {userData , token } = useContext(AuthUserContext)

const imgUpload = useRef()
const [image,setImage] = useState(null)
const [userImg, setUserImg]= useState(null)

const {handleSubmit , register , reset , formState: { errors }} = useForm({
    defaultValues:{
body : ''
    }
 })
const queryClient = useQueryClient();
/************************************************************************************************/



function handelImgUpload(e){
setImage( e.target.files[0])
setUserImg(URL.createObjectURL(e.target.files[0]))
}



function sendPost(data){
  const myFormData = new FormData()
myFormData.append("body",data.body)
if(image) myFormData.append("image",image);

return axios.post('https://route-posts.routemisr.com/posts', myFormData , {
     headers: {
              Authorization: `Bearer ${token}`,
            },
})


}




const {mutate , isPending } = useMutation({
  mutationFn:sendPost ,
  onSuccess : function({data}){
    toast.success(data.message)

    queryClient.invalidateQueries({ queryKey: ['allPosts'] });
    reset()
setUserImg(null)
  },
  onError: function({response}){
toast.error(response.data.error)
  } 

})

/*******************************************************************************************/


  return (
    <>
    <Card className="max-w-2xl w-full bg-white shadow-md rounded-2xl p-2">
  <CardHeader className="flex gap-3 items-center">
    <div> <Avatar 
      src={userData?.photo} 
      size="md"
      isBordered
      color="primary"
    /></div>
   <div> 
    <h2 className="text-lg font-bold text-gray-700">Create Post</h2>
    <p className='text-xs text-gray-500'>Share your thoughts with the world</p>
 </div>
 </CardHeader>
  
  <Divider />

  <CardBody className="">
  
    <Form className='flex  gap-4 w-full' onSubmit={handleSubmit(mutate)}>
      <div className='flex w-full gap-3 items-start'> 
        <Avatar
          src={userData?.photo || 'https://avatars.githubusercontent.com/u/86160567?s=200&v=4'}
          size="sm"
          className="mt-2"
        /> 
        
  
        <div className=" flex flex-col w-full gap-2">
          <Input 
            {...register('body',{ required: "Please write something before posting" })}
            type='text' 
            isInvalid={!!errors.body}
            errorMessage={errors.body?.message}
          
            placeholder={`What's on your mind, ${userData?.name?.split(' ')[0]}?`}
            className='w-full'
          />
          
       
          {userImg && (
            <div className="relative mt-2 rounded-xl overflow-hidden border">
              <img src={userImg} className="w-full h-auto max-h-80 object-cover" alt="preview" />
              <Button 
             
                size="sm" 
                color="danger" 
                className="absolute top-2 right-2 rounded-full"
                onClick={() => {setUserImg(null); setImage(null)}}
              >
                ✕
              </Button>
            </div>
          )}
        </div>

     
        <div className="flex items-center mt-1">
          <DocumentUpload 
            onClick={() => imgUpload.current.click()} 
            size="32"  
            className='text-blue-600  cursor-pointer hover:text-blue-800 transition-colors'
          />
        </div>
      </div>
      
      <Button 
        color='primary' 
        className='w-full font-bold' 
        type='submit' 
        variant='solid'
        isLoading={isPending}
      >
        Post
      </Button>
    </Form>
  </CardBody>


  <input type='file' className='hidden' onChange={handelImgUpload} ref={imgUpload}  />
</Card>
    </>
  )
}
