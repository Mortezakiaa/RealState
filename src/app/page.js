import { getServerSession } from "next-auth"
import { authOptions } from "./api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import HomePage from "@/components/template/HomePage"

export default async function Home() {
  const session = await getServerSession(authOptions)
  if(!session) redirect('/SignIn')
  return (
   <>
    <HomePage/>
   </>
  )
}
