import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import "./Frame.css"
import axios from "axios"
import {useApp, useCart} from "../../store/index"
import {ChevronRight, ChevronLeft, Star, StarHalf, Plus, Minus} from "lucide-react"
import Spinner from "../../components/Spinner/Spinner"
import OrangeButton from "../../components/Buttons/OrangeButton"
import {toast} from "react-toastify"
export default function Frame() {
    const [loading, setLoading] = useState(false)
    const {url, toastStyle, setShowSignIn} = useApp()
    const {cartItems, addToCart} = useCart()
    const {id} = useParams()
    const [frame, setFrame] = useState({})
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [quantity, setQuantity] = useState(1)
    const cartItem = cartItems.find(item => item.frame._id === frame._id)
    useEffect(() => {
        async function fetchFrame() {
            const res = await axios.get(`${url}/api/frame/${id}`)
            if(res.data.success) {
                setFrame(res.data.data)
            }
        }
        fetchFrame()
    }, [])

    function nextImage() {
        if (!frame) return;
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % frame.images.length);
    }

    function prevImage() {
        if (!frame) return;
        setCurrentImageIndex((prevIndex) =>
            (prevIndex - 1 + frame.images.length) % frame.images.length
        )
    }

    function renderStars() {
        if(frame && frame.count > 0) {
            let rating = (frame.rating / frame.count).toFixed(1)
            let stars = []
            for(let i = 0; i < Math.floor(rating); i++)
                stars.push(<Star key = {i} />)
            if(rating % 1 >= 0.5)
                stars.push(<StarHalf key = "half" />)
            return stars
        }
        return null
    }
    
    async function handleCart() {
        setLoading(true)
        const res = await axios.post(`${url}/api/cart/add`, {frameId: frame._id, quantity, price: quantity*frame.price}, {withCredentials: true})
        if(res.data.success) {
            try {
                addToCart(frame, quantity)
                toast.success("Added to Cart Successfully", toastStyle)
                setQuantity(1)
            }
            catch(err) {
                console.log(err)
                toast.error("Error Adding to Cart", toastStyle)
            }
        }
        else {
            setShowSignIn(true)
            toast.info("Login to perform this action", toastStyle)
        }
        setLoading(false)
    }
    if(loading || !frame || !frame.images)
        return <Spinner/>
    return (
        <div className="details">
            <div className="img-container mt-3">
                <div className="move">
                    <button className="btn-container" onClick={prevImage}>
                        <ChevronLeft/>
                    </button>
                </div>
                <div className="images">
                    <img src={frame.images[currentImageIndex].url} alt="Frame"/>
                    <p>{currentImageIndex + 1} / {frame.images.length}</p>
                </div>
                <div className="move">
                    <button className="btn-container" onClick={nextImage}>
                        <ChevronRight/>
                    </button>
                </div>
            </div>
            <div className="frame-details">
                <div className="info">
                    <h2>{frame.title}</h2>
                    <p className="stars"> {renderStars()} {frame.count > 0 && `(${frame.count})`}</p>
                    <h3 style={{color: "azure"}}>&#x20B9;{frame.price}</h3>
                    <p className="o-7">{frame.info}</p>
                    <div className="additional-details">
                        <p>Company: <span className="o-7">{frame.company}</span></p>
                        <p>Shape: <span className="o-7">{frame.shape}</span></p>
                        <p>Type: <span className="o-7">{frame.type}</span></p>
                    </div>
                </div>
                <div className="add-to-cart">
                    <div className="quantity">
                        <p className="d-flex align-items-center gap-2">Quantity: 
                            <span className="quantity-manager">
                                <button className="minus" onClick={() => {
                                    if ((cartItem ? cartItem.quantity : 0)+quantity > 1) setQuantity(prev => prev - 1)
                                }}>
                                    <Minus size={15}/>
                                </button>
                                <span>{(cartItem ? cartItem.quantity : 0)+quantity}</span>
                                <button className="plus" onClick={() => setQuantity(prev => prev + 1)}><Plus size={15}/></button>
                            </span>
                        </p>
                    </div>
                    <OrangeButton onClick={handleCart} title="Add to Cart"/>
                </div>
            </div>
        </div>
    )
}