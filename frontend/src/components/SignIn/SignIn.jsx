import React, { useState } from "react"
import './SignIn.css'
import { useApp, useUser } from "../../store/index"
import { X, EyeClosed, Eye } from 'lucide-react'
import OrangeButton from '../Buttons/OrangeButton'
import DarkInput from "../Inputs/DarkInput"
import axios from "axios"
import { toast } from "react-toastify"
export default function SignIn() {
    const {url, setShowSignIn, toastStyle} = useApp()
    const {setUser} = useUser()
    const [currState, setCurrState] = useState("Login")
    const [passwordType, setPasswordType] = useState("password")
    const [data, setData] = useState({
        email: "",
        username: "",
        password: "",
    })
    function handleChange(event) {
        const {name, value} = event.target
        setData((prev) => ({...prev, [name]: value}))
    }
    async function handleSubmit(event) {
        event.preventDefault()
        let newUrl = url
        if(currState === 'Login')
            newUrl += "/api/user/login"
        else
            newUrl += "/api/user/signup"
        try {
            const response = await axios.post(newUrl, data, {withCredentials: true})
            if(response.data.success) {
                setUser(response.data.user)
                let message = `Welcome to Vision Vogue, ${response.data.user.username}!`
                if(currState === "Login")
                    message = `Welcome back ${response.data.user.username}`
                toast.success(message, toastStyle)
                setShowSignIn(false)
                setData({
                    email: "",
                    username: "",
                    password: "",
                })
            }
            else {
                toast.error("Something went wrong. Please try again", toastStyle)
            }
        }
        catch(err) {
            toast.error("Invalid Username or Password", toastStyle)
        }
    }
    return (
        <div className="login-popup">
            <form className="login-popup-container" onSubmit={handleSubmit}>
                <div className="X cursor-pointer" onClick={()=>setShowSignIn(false)}><X/></div>
                <div className="login-popup-contents">
                    <h2 className="login-popup-title">{currState}</h2>
                    <div className="login-popup-contents-inputs mb-4">
                        {
                            currState === "Login"
                                ? <></>
                                : <div className="input input-name">
                                    <label htmlFor="email">Email</label>
                                    <DarkInput onChange={handleChange} value = {data.email} type = "email" id = "email" name = "email" required = {true}/>
                                </div>
                        }
                        <div className="input input-email">
                            <label htmlFor="username">Username</label>
                            <DarkInput onChange={handleChange} value = {data.username} type = "text" id = "username" name = "username" required = {true}/>
                        </div>
                        <div className="input-password">
                            <div className="input">
                                <label htmlFor="password">Password</label>
                                <DarkInput onChange={handleChange} value = {data.password} type = {passwordType} id = "password" name="password" required = {true}/>
                            </div>
                            <div className="password-type">
                            {
                                passwordType === "password"
                                    ?<div onClick={()=>setPasswordType("text")}>Show password <Eye /></div>
                                    :<div onClick={()=>setPasswordType("password")}>Hide password <EyeClosed/></div>
                            }
                            </div>
                        </div>
                    </div>
                </div>
                <OrangeButton type="submit" style={{padding: '1rem', fontSize: '1.25rem'}} title={currState === "Sign up" ? "Sign up" : "Login"} />
                <div className="login-popup-condition">
                    <input type="checkbox" required/>
                    <p>By continuing, I agree to the terms of use and Privacy Policy</p>
                </div>
                {currState === "Login" 
                    ?<p>New to Vision Vogue? <span onClick={()=>setCurrState("Sign up")} >Sign up</span> </p>
                    :<p>Already have an account? <span onClick={()=>setCurrState("Login")}>Login</span> </p>
                }
            </form>
        </div>
    )
}