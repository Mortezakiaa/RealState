'use client'
import Loader from "./Loader"

export default function Loading() {
  return (
    <div  style={{display:'flex' , alignItems:'center' , justifyContent:'center' , width:'100%' , height:'100%'}}>
      <Loader/>
    </div>
  )
}
