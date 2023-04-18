"use client"
import { useState } from 'react';
import styles from './signup.module.css'
import Link from 'next/link'
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { loginUser, registerUser } from '@/redux/apiRequests';
import { useNavigate } from 'react-router';
export default function Signup_Form() {
    const [username_regis,setusername_regis]=useState("");
    const [password_regis,setpassword_regis]=useState("");
    const [fullname,setfullname]=useState("");
    const [email,setemail]=useState("");
    const [phone,setphone]=useState("");
    const [repassword,setrepassword]=useState("");

    const dispatch=useDispatch();
    const router=useRouter();
   
    const handleSubmit =(e: { preventDefault: () => void; })=>{
        e.preventDefault();
        const newUser={
            username: username_regis,
            password: password_regis,
            name: fullname,
            email:email,
            phone: phone
        }
        console.log("newuser", newUser)
        console.log("login: ",{username:username_regis,password: password_regis})
        registerUser(newUser, dispatch,router)
       
        loginUser({username:username_regis,password: password_regis}, dispatch,router)
    }

    return (
    
            <form className={styles.form} onSubmit={handleSubmit}>
                <input type="text" id="fullname" onChange={(e) => setfullname(e.target.value)} placeholder='Tên' className={styles.username} />
                <input type="text" id="username_regis" onChange={(e) => setusername_regis(e.target.value)} placeholder='Tên đăng nhập' className={styles.username} />
                <input type="text" id="password_regis" onChange={(e) =>  setpassword_regis(e.target.value)} placeholder='Mật khẩu' className={styles.username} />
                <input type="text" id="repassword" onChange={(e) => setrepassword(e.target.value)} placeholder='Nhập lại mật khẩu' className={styles.username} />
                <input type="text" id="email" onChange={(e) => setemail(e.target.value)} placeholder='Email' className={styles.username} />
                <input type="text" id="phone" onChange={(e) =>setphone(e.target.value)} placeholder='Phone' className={styles.username} />
            <div className={styles.footer}>
                <button className={styles.btn} onClick={()=>handleSubmit}>Đăng ký</button>
                <p className={styles.forget_pwd}>
                    <Link href={''} className={styles.link}>Đã có tài khoản? Đăng nhập ngay!</Link></p>

            </div>  
            </form>
    

    )
}