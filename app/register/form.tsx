'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import axios from "axios"
import { SubmitButton } from '../components/SubmitButton'

type Props = {}

const SignForm = (props: Props) => {
    const [user, setUser] = useState({
        username: "",
        password: "",

    })

    const router = useRouter()

    const Register = () => {
        const data = {
            username: user.username,
            password: user.password,
        }
        axios.post('/api/register', data)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error)
            })
            .finally(() => {
                router.push('/login')
            })
    }
    return (
        <form action={Register}>
            <div className='flex flex-col items-center justify-center min-h-screen py-6  mx-9'>
                <div className='p-10 rounded-lg shadow-lg px-8 '>
                    <h4 className="font-medium text-lg py-3 mb-4">Sign Up </h4>
                    <div className='flex flex-col'>
                        <label htmlFor='' className='mb-2'>Username</label>
                        <input
                            type="text"
                            className='p-2 border-gray-300 border-[1px] rounded-lg w-full mb-4 focus:outline-none focus:border-gray-600 text-black'
                            id='name'
                            value={user.username}
                            placeholder='name'
                            onChange={(e) => setUser({ ...user, username: e.target.value })}
                        />
                    </div>


                    <div className='flex flex-col'>
                        <label htmlFor='' className='mb-2'>Password</label>
                        <input
                            type="password"
                            className='p-2 border-gray-300 border-[1px] rounded-lg w-full mb-4 focus:outline-none focus:border-gray-600 text-black'
                            id='password'
                            value={user.password}
                            placeholder='password'
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                        />
                    </div>


                    <div className='flex flex-col '>
                        <SubmitButton text='Register Now' />

                        <Link href='/login' className='text-sm text-center mt-5 text-neutral-600'>Already have an Account?</Link>

                    </div>
                </div>
            </div>
        </form>
    )
}

export default SignForm