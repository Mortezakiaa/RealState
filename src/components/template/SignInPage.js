'use client'
import { useState } from "react"
import styles from './SignupPage.module.css'
import Link from 'next/link'
import { Toaster, toast } from "react-hot-toast"
import Loader from "../module/Loader"
import {signIn} from 'next-auth/react'

export default function SignInPage() {
    const [userInfo , setUserInfo] = useState({
        email:'',
        password:'',
        loading:false
    })

    const setChanges = (e)=>{
        setUserInfo({...userInfo , [e.target.name]:e.target.value})
    }

    const signinHandler = async (e)=>{
        e.preventDefault()
        setUserInfo({...userInfo , loading:true})
        const res = await signIn('credentials' , {
            email:userInfo.email,
            password:userInfo.password,
            callbackUrl:'/dashboard'
        })
        setUserInfo({...userInfo , loading:false , password:'' , email:''})

        if(!res.ok){
            toast.error(res.error)
        }
    }
  return (
    <>
     <div className={styles.form}>
        <h4>فرم ورود</h4>
        <form>
            <label>ایمیل:</label>
            <input
            name="email"
            type="text"
            value={userInfo.email}
            onChange={setChanges}
            />
            <label>رمز عبور:</label>
            <input
            name="password"
            type="password"
            value={userInfo.password}
            onChange={setChanges}
            />
            {userInfo.loading ? (
            <Loader />
            ) : (
            <button type="submit" onClick={signinHandler}>
                ورود
            </button>
            )}
        </form>
        <p>
            حساب کاربری ندارید؟
            <Link href="/SignUp">ثبت نام</Link>
        </p>
        <Toaster />
    </div>  
    </>
  )
}
