import React from "react"
import './CartTotals.css'
import { useNavigate } from "react-router-dom"
import { useCart } from "../../store/index"
import OrangeButton from "../Buttons/OrangeButton"

export default function CartTotals({title, pathname}) {
    const {cartSubtotal, cartItems} = useCart()
    const navigate = useNavigate()
    return (
        <div className="cart-totals">
            <h2>Cart Total</h2>
            <div>
                <div className="cart-total-details">
                    <p>Subtotal</p>
                    <p>&#x20B9;{cartSubtotal}</p>
                </div>
                <hr />
                <div className="cart-total-details">
                    <p>Delivery Fee</p>
                    <p>&#x20B9;{cartSubtotal * 0.2}</p>
                </div>
                <hr />
                <div className="cart-total-details">
                    <p>Total</p>
                    <p>&#x20B9;{cartSubtotal*1.2}</p>
                </div>
            </div>
            <OrangeButton type = "submit" onClick={()=>{if(cartItems.length > 0) navigate(pathname)}} title={title} style={{width: 'max(15vw, 12.5rem)'}} className="px-4 py-2 px-sm-5 py-sm-3"/>
        </div>
    )
}