import {useState} from "react";
import styled from "styled-components";
import { Star } from 'lucide-react';
import { Plus, Minus } from 'lucide-react';
import { useApp, useCart, useUser } from "../../../store/index";
import {useNavigate} from "react-router-dom"
import Spinner from "../../Spinner/Spinner";
import axios from "axios"
export default function Frame({frame}) {
    const {_id, title, images, price} = frame;
    const {url} = useApp()
    const {addToCart, removeFromCart, cartItems} = useCart();
    const {user} = useUser()
    const [image, setImage] = useState(images && images[0]);
    const [loading, setLoading] = useState(false)
    const cartItem = cartItems.find(item => item.frame._id === _id);
    const navigate = useNavigate()
    async function handleCart(mode) {
        if(loading)
            return
        setLoading(true)
        if(mode === "add")
            addToCart(frame)
        else
            removeFromCart(frame)
        const res = await axios.post(`${url}/api/cart/${mode}`, {frameId: frame._id, quantity: 1, price: frame.price}, {withCredentials: true})
        setLoading(false)
    }
    return (
        <FrameCard className="mx-auto">
            <div onClick = {() => navigate(`/frame/${_id}`)} className="card">
                <div className = {`img-container p-2 d-flex flex-column justify-content-center align-items-center ${images && images.length == 1 ? "zoom" : ""}`} onMouseEnter={()=>images.length > 1 && setImage(images[1])} onMouseLeave={()=>setImage(images[0])} style={{textAlign: 'right'}}>
                    {frame.rating !== 0 && (
                        <span className="rating-badge">
                            {((frame.rating)/(frame.count)).toFixed(1)}
                            <Star size={16} style={{ marginLeft: "0.3rem" }} />
                        </span>
                    )}
                    <img src={url+"/images/"+image} alt="Frame" className="card-img-top"/>
                    {
                    !cartItem
                        ? user && <div className="add d-flex justify-content-end" onClick={(e)=>{e.stopPropagation(); handleCart("add")}}><Plus /></div>
                        : user && <span onClick = {(e) => e.stopPropagation()} className="frame-item-counter">
                            <button className="remove-red" onClick={()=>handleCart("remove")}><Minus size={20}/></button>
                            <span>{loading ? <Spinner spinStyle = {{height: "1rem"}} style={{height: "1rem", width: "1rem"}}/> : cartItem.quantity}</span>
                            <button className="add-green" onClick={()=>handleCart("add")}><Plus size={20}/></button>
                        </span>
                    }
                </div>
                <div className="card-footer d-flex justify-content-between" style={{backgroundColor: "#0D1117", height: "3.5rem"}}> 
                    <p className="align-self-center mb-0" style={{ fontFamily: "Playfair Display, serif", color: "azure" }}>{title}</p>
                    <h5 className="font-italic mb-0" style={{color: "darkgray"}}>
                    &#x20B9;{price.toLocaleString('en-IN')}
                    </h5>
                </div>
            </div>
        </FrameCard>
    )
}
const FrameCard = styled.div`
    height: 25rem;
    width: 20rem;
    margin: 1rem;
    cursor: pointer;
    .card{
        border-color: transparent;
        transition: all 1s linear;
    }
    .card-footer{
        background: transparent;
        border-top: transparent;
        transition: all 1s linear;
    }
    &:hover{
        .card{
            border: 0.04rem solid rgba(0, 0, 0, 0.2);
            box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
        }
        .card-footer{
            background: rgba(247, 247, 247);
        }
    }
    .img-container{
        position: relative;
        overflow: hidden;
    }
    .rating-badge {
        position: absolute;
        top: 0.2rem;
        right: 0.2rem;
        background-color: black;
        color: white;
        padding: 0.3rem 0.6rem;
        border-radius: 1rem;
        font-weight: bold;
        font-size: 1rem;
        z-index: 1;
        display: flex;
        align-items: center;
    }
    .frame-item-counter {
        position: absolute;
        bottom: 0.5rem;
        right: 0.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        border: 2px solid black;
        border-radius: 2rem;
        padding: 2px;
        margin-bottom: 3px;
        background-color: black;
        color: white
    }
    .add {
        position: absolute;
        bottom: 0.5rem;
        right: 0.5rem;
        z-index: 2;
    }      
    .add-green {
        background-color: rgba(19, 202, 19, 0.3);
        border-radius: 50%;
        padding: 0.4rem;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.3rem;
        color: #198754;
        font-weight: bold;
        color: rgb(0, 200, 0);
        font-size: 1rem;
        border: none;
    }
    .remove-red {
        background-color: rgba(224, 17, 17, 0.3);
        border-radius: 50%;
        padding: 0.4rem;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.3rem;
        color: #198754;
        font-weight: bold;
        color: rgb(207, 0, 0);
        font-size: 1rem;
        border: none;
    }
    .zoom:hover .card-img-top{
        transform: scale(1.2);
    }
    .img-container {
        position: relative;
        overflow: hidden;
        height: 20rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .card-img-top {
        max-height: 100%;
        max-width: 100%;
        object-fit: cover;
    }
`;