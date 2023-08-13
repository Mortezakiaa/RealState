import BuyResidentialsPage from "@/components/template/BuyResidentialsPage";
import axios from "axios";

export const dynamic = 'force-dynamic'

export default async function page({searchParams}) {
   const res = await axios.get('http://localhost:3000/api/Profile')
   const data = await res.data
   let finalData = data.message
   if(searchParams.category){
     finalData = finalData.filter(i => i.category === searchParams.category)
    }
  return (
    <>
      <BuyResidentialsPage data={finalData}/>
    </>
  )
}
