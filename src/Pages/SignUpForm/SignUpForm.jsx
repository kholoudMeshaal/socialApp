import { Input, Button, Checkbox, Link, Divider, Select, SelectItem } from "@heroui/react";
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { Controller, useForm } from 'react-hook-form'; 
import axios from "axios";
import { useState } from "react";
import toast from 'react-hot-toast';


const SignUpForm = ({ buttonClasses , switchToSignIn }) => {


  const { handleSubmit, register , watch, control,  formState: { errors } } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: ""
    }, 
    mode: 'all'
  });

/************************************************************/ 

const pwd = watch("password");
const [isLoading , setIsLoading]= useState(false)



/*************************************************************/
async function sendUserRegister(data) {
  setIsLoading(true);

  toast.promise(
axios.post(`https://route-posts.routemisr.com/users/signup`,
     data ),

   {
     loading: 'SignUp...',
     success: function(msg){
       if (switchToSignIn) {
            switchToSignIn(); 
          }
     return <p className="text-green-500" >{msg.data.message}</p>
     },
    error: function(msg){
     return <p className="text-red-500" >{msg.response.data.error}</p>
     },
   }
 );
  setIsLoading(false);
}
//   try {
//     const response = await axios.post('https://linked-posts.routemisr.com/users/signup', data);
    

//     if (response.status === 200 || response.status === 201) {
//       toast.success('Account Created Successfully! 🎉');
    
//     }
//   } catch (error) {
//     const errorMsg = error.response?.data?.message || "invalid data";
//     toast.error(errorMsg);
//   } finally {
//     setIsLoading(false);
//   }

/****************************************************/

  return (
    <div  className="w-full min-h-screen bg-white p-8  rounded-2xl shadow-2xl">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h2>
        <p className="text-gray-500">Sign up to get started</p>
      </div>



      <form onSubmit={handleSubmit(sendUserRegister)} className="flex flex-col gap-4">

  {/* ******************Full Name Input**************************************************** */}


        <Input
        autoComplete="name"
        aria-label="name"
      
          type="text"
        {...register("name" , {
            required : {
            value : true , message : "Name is Required" 
        },
        pattern : {value: /^[a-zA-Z\s]{3,20}$/, message:"Enter Valid UserName" }
    })}
          labelPlacement="outside"
          placeholder="Full Name"
          variant="bordered"
          isInvalid={!!errors.name}
          errorMessage ={errors.name?.message}
          size="lg"
          startContent={<FiUser className="text-gray-400" size={20} />}
          classNames={{
            inputWrapper: "border-2 bg-slate-200 hover:border-cyan-500 focus-within:!border-cyan-500 transition-colors",
          }}
        />

 {/* *******************Email Input******************************************************* */}
        <Input
        aria-label="Email Address"
        autoComplete="email"
          type="email"
             {...register("email", {
            required : {
            value : true , message : "Email is Required" 
        },
        pattern : {value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ , message:"Email is Required" }
    })}
    isInvalid={!!errors.email}
    errorMessage={errors.email?.message}
          labelPlacement="outside"
          placeholder="Email address"
          variant="bordered"
          size="lg"
          startContent={<FiMail className="text-gray-400" size={20} />}
          classNames={{
            inputWrapper: "border-2 bg-slate-200 hover:border-cyan-500 focus-within:!border-cyan-500 transition-colors",
          }}
        />

 {/* *****************Password Input****************************************************** */}
         <Input
         aria-label="password"
            {...register("password", {
            required : {
            value : true , message : "Password is Required" 
        },
        pattern : {value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, message: "Password must be at least 8 characters, including uppercase, lowercase, number, and special character (@$!%*?&)." }
    })}
          isRequired
          isInvalid={!!errors.password}
          errorMessage={errors.password?.message}
          type="password"
          autoComplete="new-password"
          labelPlacement="outside"
          placeholder="Enter Your Password"
          variant="bordered"
          size="lg"
          startContent={<FiLock className="text-gray-400" size={20} />}
          classNames={{
            inputWrapper: "border-2 bg-slate-200 hover:border-cyan-500 focus-within:!border-cyan-500 transition-colors",
          }}
        />

  {/* ******************Confirm Password Input************************************************* */}
        <Input              
         autoComplete="new-password"
        aria-label="re password"
          type="password"
          {...register("rePassword", { 
            required: "Passwords do not match",
            validate:  function(value) {
                if (value == pwd ){
                   return true
                } return "Passwords do not match"
             
          }})}
          isInvalid={!!errors.rePassword}
          errorMessage={errors.rePassword?.message}
          labelPlacement="outside"
          placeholder="Confirm password"
          variant="bordered"
          size="lg"
         
          startContent={<FiLock className="text-gray-400" size={20} />}
          classNames={{ inputWrapper: "border-2 bg-slate-200 hover:border-cyan-500 focus-within:!border-cyan-500 transition-colors" }}
        />

  {/* *****************date input************************************************************ */}
       <Input
    type="date"
    aria-label="Date of Birth"  
    autoComplete="new-date"
    {...register("dateOfBirth", { required: "Date is Required" })}
    isInvalid={!!errors.dateOfBirth}
    errorMessage={errors.dateOfBirth?.message}
    labelPlacement="outside"
  
    variant="bordered"
    size="lg"
    classNames={{ inputWrapper: "border-2 bg-slate-200 hover:border-cyan-500 focus-within:!border-cyan-500 transition-colors" }}
/>

 {/* *****************gender************************************************************ */}
        
        <Controller name="gender" control={control} render={function(x){
        return <Controller name="gender" control={control} render={function(x) {
    return <Select
        {...x.field}
        aria-label="Gender"  
     
        isInvalid={!!errors.gender}
        errorMessage={errors.gender?.message}
        className="w-full"
        classNames={{
            trigger: "bg-slate-200 hover:border-cyan-500 focus-within:!border-cyan-500 transition-colors"
        }}
        selectedKeys={[x.field.value]}
        placeholder="Please Select Your Gender"
    >
        <SelectItem key={"male"}>Male</SelectItem>
        <SelectItem key={"female"}>Female</SelectItem>
    </Select>
}}/>
        }}/>
       
        <Checkbox
    color="primary"
    size="sm"
    aria-label="Agree to terms and privacy policy" 
    classNames={{
        base: "items-start",
        label: "text-gray-600 text-xs leading-tight"
    }}
>
          I agree to the{" "}
          <Link to='' size="sm" className="text-cyan-600 font-medium hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link to='' size="sm" className="text-cyan-600 font-medium hover:underline">
            Privacy Policy
          </Link>
        </Checkbox>

  {/* *****************Submit Button************************************************************ */}
        
        <Button  className={buttonClasses} type="submit" isLoading={isLoading} size="lg">
          Create Account
        </Button>

  {/* *****************Divider************************************************************ */}
        
        <div className="relative flex items-center gap-4 my-2">
          <Divider className="flex-1" />
          <span className="text-xs text-gray-500 whitespace-nowrap">Or continue with</span>
          <Divider className="flex-1" />
        </div>

   {/* *****************Social Login*********************************************************** */}
        
        <div className="flex justify-between gap-3">
          <Button type="button" isIconOnly variant="bordered" className="w-full border-gray-200 hover:bg-gray-50">
            <FcGoogle size={24} />
          </Button>
          <Button type="button" isIconOnly variant="bordered" className="w-full border-gray-200 hover:bg-gray-50">
            <FaFacebookF size={20} className="text-blue-600" />
          </Button>
    
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;