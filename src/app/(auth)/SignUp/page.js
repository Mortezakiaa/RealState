import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SignUpPage from "@/components/template/SignUpPage";
import {getServerSession} from 'next-auth'
import {redirect} from 'next/navigation'
export default async function page() {
  const session = await getServerSession(authOptions)
  if(session) redirect('/')
  
  return (
    <div>
      <SignUpPage/>
    </div>
  )
}
