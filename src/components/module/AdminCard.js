'use client'
import styles from './AdminCard.module.css'
import { useRouter } from 'next/navigation'
import { Toaster, toast } from "react-hot-toast";
import { sp } from '@/utils/replaceNumber';
import axios from 'axios';
export default function AdminCard({ data: { _id, title, description, location, price } }) {
    const router = useRouter()
    const publishHandler = ()=>{
        axios.patch(`/api/Profile/publish/${_id}`).then((res)=>{
            toast.success(res.data.message)
            router.refresh()
        }).catch((err)=>{
            toast.error(err.response.data.message)
        })
    }
    const DeleteHandler = ()=>{
      axios.delete(`/api/Profile/publish/${_id}`).then((res)=>{
        toast.success(res.data.message)
        router.refresh()
      }).catch((err)=>{
          toast.error(err.response.data.message)
      })
    }
  return (
    <div className={styles.container}>
      <h3>{title}</h3>
      <p>{description}</p>
      <div className={styles.properties}>
        <span>{location}</span>
        <span>{sp(price)}</span>
      </div>
      <div style={{display:'flex' , gap:'10px'}}>
        <button onClick={publishHandler}>انتشار</button>
        <button style={{backgroundColor:'red'}} onClick={DeleteHandler}>حذف</button>
      </div>
      <Toaster />
    </div>
  )
}
