import { useNavigate, useLocation } from 'react-router-dom'
import { useState } from 'react'
import OrangeButton from '../Buttons/OrangeButton'
import './Navbar.css'
import { Search, LogOut, ShoppingCart, User, CalendarArrowDown } from 'lucide-react'
import { useApp, useUser } from '../../store/index'
import { toast } from "react-toastify"
import axios from "axios"
export default function Navbar() {
    const {showSignIn, setShowSignIn, url, toastStyle} = useApp()
    const {user, setUser} = useUser()
    const [menu, setMenu] = useState("home")
    const navigate = useNavigate()
    const location = useLocation()
    function handleClick(e, menu) {
        if(showSignIn)
            e.preventDefault()
        else
            setMenu(menu)
    }
    function handleLogout() {
        axios.get(`${url}/api/user/logout`, {withCredentials: true})
            .then(() => {
                toast.success("Logged out Successfully!", toastStyle)
                setUser(null)
            })
            .catch((err) => {
                toast.error("Error: Couldn't log out", toastStyle)
                console.error("Logout failed:", err)
            })
    }
    return (
        <div className={`navbar nav py-3 d-flex justify-content-between align-items-center ${showSignIn?"disable":""}`}>
            <img onClick={()=>navigate("/")} className='logo cursor-pointer' src="/Logo.png" alt="Logo" />
            {
                location.pathname == '/'
                &&
                <ul className='navbar-menu d-flex list-unstyled gap-3'>
                    <li><a href = "#" className={`menu ${menu === 'home'?'active':''} cursor-pointer`} onClick={(e)=>handleClick(e, "home")}>Home</a></li>
                    <li><a href='#filter-shape' className={`menu ${menu === 'filter'?'active':''} cursor-pointer`} onClick={(e)=>handleClick(e, "filter")}>Filter</a></li>
                    <li><a href='#app-download' className={`menu ${menu === 'mobile-app'?'active':''} cursor-pointer`} onClick={(e)=>handleClick(e, "mobile-app")}>Mobile-App</a></li>
                    <li><a href='#footer' className={`menu ${menu === 'contact-us'?'active':''} cursor-pointer`} onClick={(e)=>handleClick(e, "contact-us")}>Contact us</a></li>
                </ul>
            }
            <div className="navbar-right d-flex align-items-center gap-4">
                <Search/>
                <div className='navbar-cart position-relative cursor-pointer'>
                    {user && <><div onClick={()=>navigate("/cart")}>{<ShoppingCart/>}</div><div className="dot position-absolute"></div></>}
                </div>
                {
                    user === null
                    ? <OrangeButton onClick = {()=> setShowSignIn(true)} title="sign-in"/>
                    : <>
                        <div className="position-relative d-inline-block">
                            <button className="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                                <User/>
                            </button>
                            <div className="collapse mt-2 position-absolute w-100 z-3" id="collapseExample">
                                <div className="card card-body">
                                    <div className='button cursor-pointer' onClick={() => navigate('/myorders')}> <CalendarArrowDown/> </div>
                                    <hr />
                                    <div className = "button cursor-pointer" onClick={handleLogout} >{<LogOut/>}</div>
                                </div>
                            </div>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}