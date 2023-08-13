'use client'
import { useState } from "react"
import styles from './SignupPage.module.css'
import Link from 'next/link'
import {useRouter} from 'next/navigation'
import { Toaster, toast } from "react-hot-toast"
import Loader from "../module/Loader"

export default function SignUpPage() {
    const router = useRouter()
    const [userInfo , setUserInfo] = useState({
        email:'',
        password:'',
        rePassword:'',
        loading:false
    })

    const setChanges = (e)=>{
        setUserInfo({...userInfo , [e.target.name]:e.target.value})
    }

    const signupHandler = async(e)=>{
        e.preventDefault()
        const {password , rePassword} = userInfo
        if(password !== rePassword){
            toast.error('password and rePassword is Not equal!!!')
            return
        }
        setUserInfo({...userInfo , loading:true})
        const res = await fetch('/api/auth/SignUp' , {
            method:"POST",
            body:JSON.stringify(userInfo),
            headers:{'Content-Type':'application/json'}
        })

        const data = await res.json()
        setUserInfo({...userInfo , loading:false , password:'',rePassword:'' , email:''})
        if(res.status == 200){
             router.replace('/SignIn')
        }else{
            toast.error(data.message)
        }
    }
  return (
    <>
     <div className={styles.form}>
        <h4>فرم ثبت نام</h4>
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
            <label>تکرار رمز عبور:</label>
            <input
            name="rePassword"
            type="password"
            value={userInfo.rePassword}
            onChange={setChanges}
            />
            {userInfo.loading ? (
            <Loader />
            ) : (
            <button type="submit" onClick={signupHandler}>
                ثبت نام
            </button>
            )}
        </form>
        <p>
            حساب کاربری دارید؟
            <Link href="/SignIn">ورود</Link>
        </p>
        <Toaster />
    </div> 
    </>
  )
}
