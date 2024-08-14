/* eslint-disable react/no-unescaped-entities */
'use client'
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm, SubmitHandler } from "react-hook-form";
import { login } from '../actions/user';
import { SubmitButton } from '../components/SubmitButton';
import { toast } from '@/components/ui/use-toast';

type Props = {}

type FormFields = {
    username: string,
    password: string,

}

const Signinform = (props: Props) => {
    const { register, handleSubmit, setError, reset, formState: { errors, isSubmitting } } = useForm<FormFields>()

    const router = useRouter()


    const loginF: SubmitHandler<FormFields> = async (data) => {
        try {
            const response = await login(data.username, data.password)
            if (response == 0) throw new Error("Login Failed")
            router.push('/dashboard')
            const user = await response.userId.userID
            console.log(user)
            await localStorage.setItem('user', user)
            reset()
            toast({
                title: "Hurray!!",
                description: "You're logged in"
            })
        } catch (error) {
            console.log('Error while logging in')
            toast({
                title: "Awwnnn!!",
                description: "Try again Error while logging in"
            })
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit(loginF)}>
                <div className='flex flex-col items-center justify-center min-h-screen py-2'>
                    <div className='p-10 rounded-lg shadow-lg flex flex-col'>
                        <h1 className='text-xl font-medium mb-4'>Sign In</h1>
                        <label htmlFor="" className='mb-2'>Username</label>
                        <input
                            type="text"
                            className='p-2 border-gray-300 border-[1px] rounded-lg w-[300px] mb-4 focus:outline-none focus:border-gray-600 text-black'
                            id='username'
                            placeholder='username'
                            defaultValue='ensleybd'
                            {...register('username', {
                            })} />
                        <label htmlFor="" className='mb-2'>Password</label>
                        <input
                            type="password"
                            className='p-2 border-gray-300 border-[1px] rounded-lg w-[300px] mb-4 focus:outline-none focus:border-gray-600 text-black'
                            id='password'
                            placeholder='password'
                            defaultValue='tekens243'
                            {...register('password', {
                            })} />
                        <SubmitButton text='Login Now' />
                    </div>
                </div>
            </form>

        </>

    )
}

export default Signinform