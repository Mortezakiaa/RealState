import ConncetToDb from "@/utils/ConnectToDb"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import User from "@/models/User"
import { redirect } from "next/navigation"
import DashboardSidebar from "@/components/layout/DashboardSidebar"
import Profile from "@/models/Profile"
import AdminPage from "@/components/template/AdminPage"

export default async function page() {
    await ConncetToDb()
    const session = await getServerSession(authOptions)
    if(!session) redirect('/SignIn')
    const user = await User.findOne({email:session.user.email})
    if(user.role !== 'ADMIN') redirect('/dashboard')
    const profile = await Profile.find({published:false})
  return (
    <>
      <DashboardSidebar role={user.role} email={session.user.email}>
        <AdminPage profiles={profile}/>
      </DashboardSidebar>
    </>
  )
}
