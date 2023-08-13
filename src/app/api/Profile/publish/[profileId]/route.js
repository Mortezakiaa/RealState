import Profile from "@/models/Profile";
import User from "@/models/User";
import ConncetToDb from "@/utils/ConnectToDb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PATCH(req,{params:{profileId}}){
    try {
        await ConncetToDb()
        const session = await getServerSession(req)
        if(!session) return NextResponse.json({message:'Please Login !!'} , {status:401})
        const user = await User.findOne({email:session.user.email})
        if(user.role !== 'ADMIN') return NextResponse.json({message:'Forbidden !'} , {status:403})
        let profile = await Profile.findOne({_id:profileId})
        profile.published = true
        profile.save()
        return NextResponse.json({message:'Data Updated!'} , {status:200})
    } catch (error) {
        return NextResponse.json({message:'Somethings Went Wrong !'} , {status:500})
    }
}

export async function DELETE(req,{params:{profileId}}){
    try {
        await ConncetToDb()
        const session = await getServerSession(req)
        const user = await User.findOne({email:session.user.email})
        if(!session) return NextResponse.json({message:'Please Login !!'} , {status:401})
        if(user.role !== 'ADMIN') return NextResponse.json({message:'Forbidden !'} , {status:403})
        const profile = await Profile.findOneAndDelete({_id:profileId})
        return NextResponse.json({message:'Data Deleted!'} , {status:200})
    } catch (error) {
        return NextResponse.json({message:'Somethings Went Wrong !'} , {status:500})
    }
}