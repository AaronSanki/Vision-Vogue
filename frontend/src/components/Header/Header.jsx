import React from "react";
import './Header.css'
import image from './Header.png'
import WhiteButton from '../Buttons/WhiteButton'
export default function Header() {
    return (
        <div className="header">
            <img src={image} alt="Header Banner" className="header-img" />
            <div className="header-contents">
                {/* <h2>Book your Frames here</h2>
                <p>Vision Vogue - Where Style Meets Sight</p>
                <WhiteButton title="View Menu"/> */}
            </div>
        </div>
    )
}