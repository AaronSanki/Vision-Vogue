import React, { useEffect, useState } from "react"
import './PlaceOrder.css'
import DarkInput from '../../components/Inputs/DarkInput'
import DarkSelect from "../../components/Select/DarkSelect"
import CartTotals from '../../components/CartTotals/CartTotals'
import { useNavigate } from "react-router-dom"
import { useApp, useUser, useCart} from "../../store/index"
import axios from "axios"
import { toast } from "react-toastify"
import Spinner from "../../components/Spinner/Spinner.jsx"
export default function PlaceOrder() {
    const {url, toastStyle} = useApp()
    const{user} = useUser()
    const[loading, setLoading] = useState(false)
    const {cartItems, cartSubtotal, setCart} = useCart()
    const navigate = useNavigate()
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        street: "",
        city: "",
        state: "",
        pincode: "",
    })
    function onChangeHandler(event) {
        const name = event.target.name
        const value = event.target.value
        setData(data => ({...data, [name]: value}))
    }
    async function placeOrder(event) {
        event.preventDefault()
        let orderFrames = cartItems.map(item => ({frame: item.frame._id, quantity: item.quantity}))
        console.log(orderFrames)
        let orderData = {
            address: data,
            frames: orderFrames,
            amount: cartSubtotal * 1.2
        }
        setLoading(true)
        let res = await axios.post(`${url}/api/order/place`, orderData, {withCredentials: true})
        setLoading(false)
        if(res.data.success) {
            const {id, amount, currency, mongo_order_id} = res.data.order
            const options = {
                key: import.meta.env.VITE_RAZORPAY_API_KEY_ID,
                amount: amount,
                currency: currency,
                name: "Vision Vogue",
                description: "Payment for Eyewear",
                image: "/Logo.png",
                order_id: id,
                handler: async function (response) {
                    const {razorpay_order_id, razorpay_payment_id, razorpay_signature} = response
                    const paymentDetails = {
                        razorpay_payment_id,
                        razorpay_order_id,
                        razorpay_signature,
                        mongo_order_id
                    }
                    const res = await axios.post(`${url}/api/order/verify`, paymentDetails, {withCredentials: true})
                    if(res.data.success) {
                        toast.success(res.data.message, toastStyle)
                        navigate("/myorders")
                        setCart([], 0)
                    }
                    else {
                        toast.error(res.data.message, toastStyle)
                        navigate("/cart")
                    }
                },
                modal: {
                    ondismiss: function () {
                        navigate("/")
                    },
                },
                prefill: {
                    name: user.username,
                    email: user.email,
                },
                theme: {
                    color: "#151515",
                },
            }
            const razorpay = new window.Razorpay(options)
            razorpay.open()
        }
        else {
            toast.error("Couldn't place order", toastStyle)
        }
    }
    useEffect(() => {
        if(user === null)
            navigate('/')
    })
    const states = [
        "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
        "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
        "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
        "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
        "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
        "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands",
        "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi",
        "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
    ]
    const inputStyle = {
        marginBottom: '2rem',
        width: '100%',
        fontFamily: '"Libre Baskerville", serif',
        fontWeight: '400',
        fontStyle: 'normal',
    }
    return (
        <>
            {loading &&
                <Spinner style={{backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: "10"}} />
            }
            <form onSubmit={placeOrder} className="place-order p-2">
                <div className="place-order-left">
                    <p className="title">Delivery Information</p>
                    <div className="multi-fields">
                        <DarkInput onChange={onChangeHandler} name="firstName" value = {data.firstName} style={inputStyle} type="text" placeholder="First name" required = {true} />
                        <DarkInput onChange={onChangeHandler} name="lastName" value = {data.lastName} style={inputStyle} type="text" placeholder="Last name" required = {true}/>
                    </div>
                    <DarkInput onChange={onChangeHandler} name="street" value = {data.street} style={inputStyle} type="text" placeholder="Street" required = {true}/>
                    <div className="multi-fields">
                        <DarkInput onChange={onChangeHandler} name="city" value = {data.city} style={inputStyle} type="text" placeholder="City" required = {true}/>
                        <DarkSelect name="state" onChange={onChangeHandler} style={inputStyle} title="--Select a State/UT--" placeholder="State" data = {states} required = {true}/>
                    </div>
                    <DarkInput onChange={onChangeHandler} name="pincode" value = {data.pincode} style={inputStyle} type="number" placeholder="Pin code" required = {true}/>
                </div>
                <div className="place-order-right p-2">
                    <CartTotals title = "Proceed to Payment" />
                </div>
            </form>
        </>
    )
}