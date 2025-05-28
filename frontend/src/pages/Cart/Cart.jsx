import React, { useEffect } from "react"
import { useApp, useCart, useUser } from "../../store/index"
import './Cart.css'
import { X } from 'lucide-react'
import WhiteButton from '../../components/Buttons/WhiteButton'
import DarkInput from '../../components/Inputs/DarkInput'
import CartTotals from "../../components/CartTotals/CartTotals"
import Spinner from "../../components/Spinner/Spinner"
import { useNavigate } from "react-router-dom"
export default function Cart() {
    const {cartItems, removeFromCart} = useCart()
    const {url} = useApp()
    const {user} = useUser()
    const navigate = useNavigate()
    useEffect(() => {
        if(user === null)
            navigate("/")
    }, [user])
    if(!cartItems)
        return <Spinner/>
    return (
        <div className="cart">
            <div className="cart-items">
                <div className="cart-items-title">
                    <p>Items</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p>Remove</p>
                </div>
                <br />
                <hr />
                {   cartItems.length > 0
                    ? cartItems.map((item, index) => {
                        const {frame, quantity} = item
                        console.log(frame)
                        return (
                            <div key = {index}>
                                <div className="cart-items-title cart-items-item">
                                    <img src={frame.images[0].url} alt="Frame"/>
                                    <p>{frame.title}</p>
                                    <p>&#x20B9;{frame.price}</p>
                                    <p>{quantity}</p>
                                    <p>&#x20B9;{frame.price*quantity}</p>
                                    <p onClick={()=>removeFromCart(frame)} className="X" ><X/></p>
                                </div>
                                <hr />
                            </div>
                        )
                    })
                    : <><p className="d-flex justify-content-center align-items-center opacity-75">Nothing in Cart for now :(</p><hr /></>
                }
            </div>
            <div className="cart-bottom">
                <CartTotals title="Proceed to buy" pathname="/order"/>
                <div className="cart-promocode">
                    <div>
                        <p>If you have a promo code, Enter it here</p>
                        <div className="cart-promocode-input">
                            <DarkInput type="text" placeholder="promo code"/>
                            <WhiteButton style={{width: 'max(10vw, 150px)', border: 'none'}} className="px-4 py-2 px-sm-5 py-sm-3" title="Submit"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}