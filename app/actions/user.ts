import axios from "axios";
import { serialize } from "cookie"



export const login = async (username: string, password: string) => {
    const MAX_AGE = 60 * 60 * 24
    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });
        console.log(`Hello ${response.status}`)
        if (response.ok) {
            const data = await response.json();
            const token = `Bearer on holiday ${data.result.token}`;

            const serialized = serialize("SHOP", token, {
                secure: true,
                sameSite: 'strict',
                maxAge: MAX_AGE,
            })
            document.cookie = serialized
            const userId = data.result; // Grab the userId
            console.log(`Champ ${userId}`)
            return { response, userId };
        } else {
            return 0
        }
    } catch (error: any) {
        throw new Error(`Login Failed... Try Again `)
    }
};
export const logout = async () => {
    try {
        await axios.get('/api/clear-cookie')
    } catch (error: any) {
        console.error('Error logging out:', error);
        throw new Error(error);
    }
};

export const getSession = async () => {
    'use client'
    try {
        const data = await sessionStorage.getItem('token')
        console.log(data)
        return data
    } catch (error) {
        console.error('No data found');

    }
}


