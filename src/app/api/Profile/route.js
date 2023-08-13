import Profile from "@/models/Profile";
import User from "@/models/User";
import ConncetToDb from "@/utils/ConnectToDb";
import { Types } from "mongoose";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req){
    try {
        await ConncetToDb()
        const session = await getServerSession(req)
        if(!session) return NextResponse.json({message:'Please Login!!'} , {status:401})
        const {title,description,location,phone,price,realState,constructionDate,category,rules,amenities} = await req.json()
        const user  = await User.findOne({email:session.user.email})
        if(!user) return NextResponse.json({message:'User Not Found'},{status:404})

        if(!title || !description || !location || !phone || !price || !realState || !constructionDate)
        return NextResponse.json({message:'Invcalid Data !!'},{status:400})
        const newProfile = await Profile.create({
            title,
            description,
            location,
            phone,
            price:+price,
            realState,
            constructionDate,
            category,
            rules,
            amenities,
            userId:new Types.ObjectId(user._id)
        })
        return NextResponse.json({message:'Profile Created !!!'} , {status:201})
    } catch (error) {
        return NextResponse.json({message:'Somethings Went Wront!'} , {status:500})
    }
}

export async function PATCH(req){
    try {
        await ConncetToDb()
        const session = await getServerSession(req)
        if(!session) return NextResponse.json({message:'Please Login!!'} , {status:401})
        const body = await req.json()
        const {_id,title,description,location,phone,price,realState,constructionDate,category,rules,amenities} = body
        const user  = await User.findOne({email:session.user.email})
        if(!user) return NextResponse.json({message:'User Not Found'},{status:404})
        if(!title || !description || !location || !phone || !price || !realState || !constructionDate)
        return NextResponse.json({message:'Invcalid Data !!'},{status:400})
        const profile = await User.findOne({_id})
        if(!user._id.equals(profile.userId)) return NextResponse.json({message:'Forbidden !!'} , {status:403})
        Object.assign(profile,body)
        profile.save()
        return NextResponse.json({message:'Data is Updated !'},{status:200})
    } catch (error) {
        return NextResponse.json({message:'Somethings Went Wrong!'} , {status:500})
    }
}

export async function GET(){
    try {
        await ConncetToDb()
        const profile = await Profile.find({published:true}).select("-userId")
        return NextResponse.json({message:profile},{status:200})
    } catch (error) {
        return NextResponse.json({message:'Somethings Went Wrong!'} , {status:500})
    }
}