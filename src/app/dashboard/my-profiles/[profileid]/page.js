import AddProfilePage from "@/components/template/AddProfilePage"
import Profile from "@/models/Profile"
import ConncetToDb from "@/utils/ConnectToDb"

export default async function page({params:{profileid}}) {
    await ConncetToDb()
    const profile = await Profile.findOne({_id:profileid})
    if(!profile) return (<h3>مشکلی پیش امده است لطفا دوباره امتحان کنید!</h3>)

  return (
    <>
     <AddProfilePage data={JSON.parse(JSON.stringify(profile))}/> 
    </>
  )
}
