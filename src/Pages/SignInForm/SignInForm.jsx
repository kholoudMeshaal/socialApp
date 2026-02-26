import { Input, Button, Link, Divider } from "@heroui/react";
import { FiMail, FiLock } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import { AuthUserContext } from "../../Context/AuthContextProvider/AuthContextProvider";



const SignInForm = ({ buttonClasses }) => {

  const { handleSubmit, register, formState: { errors } } = useForm({

    defaultValues: {
      email: "",
      password: "",
    },
    mode: 'all'
  });
/***************************************************************/


const { getUserData , token , setToken  } = useContext(AuthUserContext);
const myNavigate = useNavigate();
const [isLoading , setIsLoading]= useState(false)



/*****************************************************************/


async function sendUserLogin(data) {
  setIsLoading(true);

  toast.promise(
    axios.post(`https://route-posts.routemisr.com/users/signin`, data), 
    {
success: async function(res) {
    const newToken = res.data.data.token  
    const message = res.data.message;

    localStorage.setItem('token', newToken)  
    //معايا توكين كل ما اعمل لوج ان
    setToken(newToken)                       
    myNavigate('/posts');
    setIsLoading(false);
    return message;
},
      error: function(msg) {
        setIsLoading(false); 
        return <p className="text-red-500">{msg.response?.data?.error}</p>;
      },
    }
  ); 
}


/************************************************************************/
  return (
    <div className="w-full bg-white p-8 rounded-2xl shadow-2xl">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Log In</h2>
        <p className="text-gray-500">Welcome back!</p>
      </div>

      <form onSubmit={handleSubmit(sendUserLogin)} className="flex flex-col gap-5">
        
        {/* **************************email input**************************************************************************/}
        <Input
          label="Email Address"
          type="email"
          {...register("email", {
            required: "Email is Required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Invalid email format"
            }
          })}
          isInvalid={!!errors.email}
          errorMessage={errors.email?.message}
          labelPlacement="outside"
          placeholder="Email address"
          variant="bordered"
          size="lg"
          autoComplete="email" // عشان الكروم ميزعلش
          startContent={<FiMail className="text-gray-400" size={20} />}
          classNames={{
            inputWrapper: "border-2 bg-slate-200 hover:border-cyan-500 focus-within:!border-cyan-500 transition-colors",
          }}
        />

       {/* ***************************Password input************************************************** */}
        <Input
          label="Password"
          type="password"
          {...register("password", { required: "Password is Required" })}
          isInvalid={!!errors.password}
          errorMessage={errors.password?.message}
          labelPlacement="outside"
          placeholder="Enter Your Password"
          variant="bordered"
          size="lg"
          autoComplete="current-password"
          startContent={<FiLock className="text-gray-400" size={20} />}
          classNames={{
            inputWrapper: "border-2 bg-slate-200 hover:border-cyan-500 focus-within:!border-cyan-500 transition-colors",
          }}
        />
        
        <div className="flex justify-end">
          <Link  href="#" size="sm" className="text-cyan-600 font-medium hover:underline">
            Forgot password?
          </Link>
        </div>

        <Button className={buttonClasses} isLoading={isLoading} type="submit" size="lg">
          Sign In
        </Button>

        <div className="relative flex items-center gap-4 my-4">
          <Divider className="flex-1" />
          <span className="text-sm text-gray-500 whitespace-nowrap">Or continue with</span>
          <Divider className="flex-1" />
        </div>

        <div className="flex justify-between gap-3 ">
        
          <Button type="button" isIconOnly variant="bordered" className="w-full border-gray-200 hover:bg-gray-50">
            <FcGoogle size={24} />
          </Button>
          <Button type="button" isIconOnly variant="bordered" className="w-full border-gray-200 hover:bg-gray-50 ">
            <FaFacebookF size={20} className="text-blue-600" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;