import NextAuth from "next-auth/next";
import CredentialsProvider from 'next-auth/providers/credentials'
import User from "@/models/User";
import { verifyPass } from "@/utils/auth";
import ConncetToDb from "@/utils/ConnectToDb";

export const authOptions = {
    session:{strategy:'jwt'},
    providers:[
        CredentialsProvider({
            async authorize(credentials){
                const {email , password} = credentials
                try {
                    await ConncetToDb()
                    if(!email || !password){
                        throw new Error('Invalid Data!!!')
                    }
                    const user = await User.findOne({email})
                    if(!user){
                        throw new Error('User is Not Exist!!')
                    }

                    const isValid = await verifyPass(password , user.password)

                    if(!isValid){
                        throw new Error('Email Or Password is Wrong !!!')
                    }

                    return { email }

                } catch (error) {
                    throw new Error('Failed to Connect To DB')
                }
            }
        })
    ]
}

const handler = NextAuth(authOptions)

export {handler as GET , handler as POST}