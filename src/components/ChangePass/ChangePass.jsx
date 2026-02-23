import { Input, Button } from '@heroui/react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthUserContext } from '../../Context/AuthContextProvider/AuthContextProvider';

export default function ChangePassword() {
    const navigate = useNavigate();
    const { token } = useContext(AuthUserContext); 

    const { handleSubmit, register, watch, formState: { errors } } = useForm({
        mode: 'all'
    });

    const newPwd = watch('newPassword');

    async function sendChangePassword(data) {
    //ببعت الي السيرفر محتاجوا بس 
        const dataToSend = {
            password: data.password,
            newPassword: data.newPassword
        };

        toast.promise(
            axios.patch('https://route-posts.routemisr.com/users/change-password', dataToSend, {
                headers: { 
                    token: token || localStorage.getItem('token')
                }
            }),
            {
                loading: 'Changing password...',
                success: (res) => {
                    setTimeout(() => navigate('/posts'), 2000); //  قبل ما يوديه علي البوستات بيعملوا تأخير بسيط عشان يشوف الرسالة
                    return res.data.message || 'Password updated successfully!';
                },
                error: (err) => {
                    // عشان نعرف السيرفر زعلان من ايه بالظبط
                    console.error('API Error:', err.response?.data);
                    return err.response?.data?.error || err.response?.data?.message || 'Failed to change password';
                }
            }
        );
    }

    return (
        <div className="max-w-md mx-auto mt-20 bg-white p-8 rounded-2xl shadow-xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Change Password</h2>

            <form onSubmit={handleSubmit(sendChangePassword)} className="flex flex-col gap-6">
                
                <Input
                    label="Current Password"
                    type="password"
                    {...register('password', { required: 'Current password is required' })} 
                    isInvalid={!!errors.password}
                    errorMessage={errors.password?.message}
                    labelPlacement="outside"
                 placeholder='Current Password'
                    variant="bordered"
                />

                <Input
                    label="New Password"
                    type="password"
                    {...register('newPassword', {
                        required: 'New password is required',
                        pattern: {
                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                            message: 'Min 8 chars, uppercase, lowercase, number & special character'
                        }
                    })}
                    isInvalid={!!errors.newPassword}
                    errorMessage={errors.newPassword?.message}
                    labelPlacement="outside"
                 placeholder='New Password'
                    variant="bordered"
                />

                <Input
                    label="Confirm New Password"
                    type="password"
                    {...register('rePassword', {
                        required: 'Please confirm your password',
                        validate: (value) => value === newPwd || 'Passwords do not match'
                    })}
                    isInvalid={!!errors.rePassword}
                    errorMessage={errors.rePassword?.message}
                    labelPlacement="outside"
                 placeholder='Confirm New Password'
                    variant="bordered"
                />

                <Button type="submit" color="primary" className="w-full font-bold h-12 text-lg">
                    Update Password
                </Button>
            </form>
        </div>
    );
}