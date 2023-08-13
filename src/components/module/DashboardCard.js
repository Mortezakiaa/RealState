'use client'
import Card from './Card'
import styles from './DashboardCard.module.css'
import { Toaster , toast } from 'react-hot-toast'
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function DashboardCard({data}) {
  const router = useRouter()
  const editHandler = ()=>{
    router.push(`/dashboard/my-profiles/${data._id}`)
  }
  const deleteHandler = ()=>{
    axios.delete(`/api/Profile/Delete/${data._id}`).then((res)=>{
      toast.success(res.data.message)
      router.refresh()
    }).catch((err)=>{
      toast.error(err.response.data.message)
    })
  }
  return (
    <div className={styles.container}>
      <Card data={data} />
      <div className={styles.main}>
        <button onClick={editHandler}>
          ویرایش
          <FiEdit />
        </button>
        <button onClick={deleteHandler}>
          حذف آگهی
          <AiOutlineDelete />
        </button>
      </div>
      <Toaster />
    </div>
  )
}
