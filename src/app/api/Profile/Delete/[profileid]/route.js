import Profile from "@/models/Profile";
import User from "@/models/User";
import ConncetToDb from "@/utils/ConnectToDb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function DELETE(req,context){
    try {
        await ConncetToDb()
         const session = await getServerSession(req)
         if(!session) return NextResponse.json({message:'Please Login!!'} , {status:401})
         const user = await User.findOne({email:session.user.email})
         if(!user) return NextResponse.json({message:'User Not Found'},{status:404})
         const id = context.params.profileid
         const profile = await Profile.findOne({_id:id})
         if(!user._id.equals(profile.userId)) return NextResponse.json({message:'Forbidden !!'} , {status:403})
         await Profile.deleteOne({_id:id})
         return NextResponse.json({message:'Data Deleted !'},{status:200})
    } catch (error) {
        return NextResponse.json({message:'Something went Wrong!'},{status:500})
    }
}