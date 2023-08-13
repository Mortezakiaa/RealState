import ConncetToDb from "@/utils/ConnectToDb";
import User from "@/models/User";
import { HashedPassword } from "@/utils/auth";
import { NextResponse } from "next/server";

export async function POST(req){
    try {
        await ConncetToDb()
        const {email,password} = await req.json()
        if(!email || !password){
            return NextResponse.json({message:'Invalid Data'} , {status:422})
        }
        const exsitingUser = await User.findOne({email})
        if(exsitingUser){
            return NextResponse.json({message:'User is Exist'} , {status:422})
        }

        const hashedPass = await HashedPassword(password)
        const newUser = await User.create({email,password:hashedPass})
        return NextResponse.json({message:'User Created'},{status:200})

    } catch (error) {
        return NextResponse.json({message:'Error To Connect To Db'} , {status:500})
    }
}