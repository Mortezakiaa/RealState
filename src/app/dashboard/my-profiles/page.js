import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import MyProfilesPage from "@/components/template/MyProfilesPage"
import User from "@/models/User"
import ConncetToDb from "@/utils/ConnectToDb"
import { getServerSession } from "next-auth"

export default async function page() {
    await ConncetToDb()
    const session = await getServerSession(authOptions)
   const [user] = await User.aggregate([
    {$match:{email:session.user.email}},
    {$lookup:{
        from:'profiles',
        foreignField:'userId',
        localField:'_id',
        as:'profiles'
    }}
   ])
  return (
    <div>
      <MyProfilesPage profiles={user.profiles}/>
    </div>
  )
}
