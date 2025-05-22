import React from "react"
import './Navbar.css'
import profileImage from '../../assets/profileImage.jpeg'
export default function Navbar() {
    return (
        <div className="navbar py-3 d-flex justify-content-between align-items-center ">
            <img className="logo" src="Logo.png" alt="Logo" />
            <p>Admin-Panel</p>
            <div className="img-container">
                <img className="profile-image" src={profileImage} alt="Profile Image" />
            </div>
        </div>
    )
}