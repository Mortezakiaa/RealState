import DetailsPage from "@/components/template/DetailsPage"
import Profile from "@/models/Profile"
import ConncetToDb from "@/utils/ConnectToDb"

export default async function page({params:{profileId}}) {
    await ConncetToDb()
    const profile = await Profile.findOne({_id:profileId})
    if(!profile) return (<h3>مشکلی پیش امده است</h3>)
  return (
    <div>
      <DetailsPage data={profile}/>
    </div>
  )
}

export const generateMetadata = async ({params:{profileId}})=>{
  await ConncetToDb()
  const profile = await Profile.findOne({_id:profileId})
  return{
    title:profile.title,
    description:profile.description,
    authors:{name:profile.realState},
    other:{mytag:'test Meta tag'}
  }
}