import prisma from "@/app/prismadb"
import bcrypt from "bcrypt"
import { generateToken } from '../auth/jwt'
import { NextResponse } from "next/server";
import { logs } from "@/app/actions/logs";
import axios from "axios";


export async function POST(req: Request) {
    const body = await req.json()
    const { username, password } = body

    try {
        const user = await prisma.user.findFirst({
            where: {
                username: body.username
            }
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' });
        }

        const passwordMatch = await bcrypt.compare(body.password, user.password);

        if (!passwordMatch) {
            return NextResponse.json({ error: 'Invalid password' });
        }
        const tokenPayload = {
            username: user.username,
            userid: user.userID,
            // You can include any other user data you want in the token
        };
        const token = generateToken(tokenPayload);
        const result = { ...user, token }
        await logs('Login', 'userdb', user.userID, JSON.stringify(user))

        return NextResponse.json({ message: 'Login successful', result });
    } catch (error) {
        console.error('Error during login:', error);
        return NextResponse.json({ error: 'Internal Server Error' });
    }

}