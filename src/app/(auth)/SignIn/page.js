import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SignInPage from "@/components/template/SignInPage";
import {getServerSession} from 'next-auth'
import {redirect} from 'next/navigation'
export default async function page() {
  const session = await getServerSession(authOptions)
  if(session) redirect('/')
  return (
    <div>
        <SignInPage/>
    </div>
  )
}
