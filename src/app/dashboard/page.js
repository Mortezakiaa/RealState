import DashboardPage from "@/components/template/DashboardPage";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import ConncetToDb from "@/utils/ConnectToDb";
import User from "@/models/User";
import { redirect } from "next/navigation";

export default async function page() {
  await ConncetToDb()
  const session = await getServerSession(authOptions)
  if(!session) redirect('/SignIn')
  const user = await User.findOne({email:session.user.email})
  return (
    <div>
      <DashboardPage createdAt={user.createdAt}/>
    </div>
  )
}
