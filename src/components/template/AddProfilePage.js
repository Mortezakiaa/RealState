'use client'
import styles from './AddProfilePage.module.css'
import TextInput from '../module/TextInput'
import TextList from '../module/TextList'
import RadioList from '../module/RadioList'
import CustomDatePicker from '../module/CustomDatePicker'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Toaster, toast } from 'react-hot-toast'
import Loader from '../module/Loader'
import { useRouter } from 'next/navigation'
export default function AddProfilePage({data}) {
    const router = useRouter()
    const [profileData, setProfileData] = useState({
        title: "",
        description: "",
        location: "",
        phone: "",
        price: "",
        realState: "",
        constructionDate: new Date(),
        category: "",
        rules: [],
        amenities: [],
      });
      const [loading , setLoading] = useState(false)
      useEffect(()=>{
        if(data)setProfileData(data)
      },[])
      const submitHandler = async()=>{
         setLoading(true)
        axios.post('/api/Profile',profileData).then((res)=>{
            setLoading(false)
            toast.success(res.data.message)
            setProfileData({
                title: "",
                description: "",
                location: "",
                phone: "",
                price: "",
                realState: "",
                constructionDate: new Date(),
                category: "",
                rules: [],
                amenities: [],
            })
            router.refresh()
        }).catch((err)=>{
            setLoading(false)
            toast.error(err.response.data.message)
        })
      }

      const editHandler = ()=>{
        setLoading(true)
        axios.patch('/api/Profile' , profileData).then((res)=>{
            setLoading(false)
            toast.success(res.data.message)
        }).catch((err)=>{
            setLoading(false)
            toast.error(err.response.data.message)
        })
      }
  return (
    <div className={styles.container}>
        <h3>{data ? "ویرایش آگهی" : "ثبت آگهی"}</h3>
        <TextInput
            title="عنوان آگهی"
            name="title"
            profileData={profileData}
            setProfileData={setProfileData}
        />
        <TextInput
            title="توضیحات"
            name="description"
            profileData={profileData}
            setProfileData={setProfileData}
            textarea={true}
        />
        <TextInput
            title="آدرس"
            name="location"
            profileData={profileData}
            setProfileData={setProfileData}
        />
        <TextInput
            title="شماره تماس"
            name="phone"
            profileData={profileData}
            setProfileData={setProfileData}
        />
        <TextInput
            title="قیمت(تومان)"
            name="price"
            profileData={profileData}
            setProfileData={setProfileData}
        />
        <TextInput
            title="بنگاه"
            name="realState"
            profileData={profileData}
            setProfileData={setProfileData}
        />
        <RadioList profileData={profileData} setProfileData={setProfileData} />
        <TextList
            title="امکانات رفاهی"
            profileData={profileData}
            setProfileData={setProfileData}
            type="amenities"
        />
        <TextList
            title="قوانین"
            profileData={profileData}
            setProfileData={setProfileData}
            type="rules"
        />
        <CustomDatePicker
            profileData={profileData}
            setProfileData={setProfileData}
        />
        <Toaster />
        {loading ? (
            <Loader />
        ) : data ? (
            <button className={styles.submit} onClick={editHandler}>
            ویرایش آگهی
            </button>
        ) : (
            <button className={styles.submit} onClick={submitHandler}>
            ثبت آگهی
            </button>
        )}
    </div>
  )
}

