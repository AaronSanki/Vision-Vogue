import React, {useState, useEffect } from "react"
import './Order.css'
import axios from "axios"
import {toast} from "react-toastify"
import {ChevronDown, ChevronUp} from "lucide-react"
import orderImage from "../../assets/Order.png"
import Spinner from "../../components/Spinner/Spinner.jsx"
import DarkSelect from "../../components/Elements/DarkSelect.jsx"
export default function Order({url, toastStyle}) {
    const [orders, setOrders] = useState([])
    const [down, setDown] = useState([])
    const [loading, setLoading] = useState(false)
    async function fetchOrders() {
        setLoading(true)
        const response = await axios.get(url+"/api/order/list")
        setLoading(false)
        console.log(response.data.data)
        if(response.data.success)
            setOrders(response.data.data)
        else
            toast.error("Couldn't Fetch orders", toastStyle)
    }
    async function handleChange(event, orderId) {
        const response = await axios.post(url+"/api/order/status", {orderId, status: event.target.value})
        if(response.data.success)
            await fetchOrders()
        else
            toast.error("Couldn't update status", toastStyle)
    }
    useEffect(() => {
        fetchOrders()
    }, [])
    if(loading)
        return <Spinner/>
    return (
        <div className="order">
            <h2>Orders</h2>
            <div className="order-list">
                {orders.map((order, index) =>{
                    return (
                        <div key = {index}>
                            <div className="order-frames">
                                <img src={orderImage} alt="Order" />
                                <div>
                                    <p className="order-frame">
                                        {order.frames.map((frame, index) => {
                                            if(index === order.frames.length-1)
                                                return frame.frame.title + " X " + frame.quantity
                                            else
                                                return frame.frame.title + " X " + frame.quantity + ", "
                                        })}
                                    </p>
                                    <p className="order-frame-name">{order.address.firstName+" "+order.address.lastName}</p>
                                    <div className="order-frame-address">
                                        <p>{order.address.street+", "}</p>
                                        <p>{order.address.city+", "+order.address.state+", "+order.address.pincode}</p>
                                    </div>
                                </div>
                                <p>Frames: {order.frames.length}</p>
                                <p>&#x20B9;{order.amount}.00</p>
                                <DarkSelect onChange={(e)=>handleChange(e, order._id)} name="status" value = {order.status} data = {["Frame Processing", "Frame Dispatched", "Out for delivery", "Delivered"]}/>
                                <a data-bs-toggle="collapse" href={`#order-collapse-${order._id}`} role="button" aria-expanded="false" aria-controls="collapseExample" onClick={() => setDown(prev =>{const updated = [...prev]; updated[index] = !updated[index]; return updated})}>{down[index] ? <ChevronUp/> : <ChevronDown/>}</a>
                            </div>
                            <div className="collapse" id={`order-collapse-${order._id}`}>
                                <div className="order-card card card-body">
                                    <div className="eye-side prescription-data">
                                        <p>Eye</p>
                                        <p>Left</p>
                                        <p>Right</p>
                                    </div>
                                    <div className="spherical prescription-data">
                                        <p>Spherical(SPH)</p>
                                        <p className="o-7">{order.prescription.leftEye.spherical}</p>
                                        <p className="o-7">{order.prescription.rightEye.spherical}</p>
                                    </div>
                                    <div className="cylindrical prescription-data">
                                        <p>Cylindrical(CYL)</p>
                                        <p className="o-7">{order.prescription.leftEye.cylindrical}</p>
                                        <p className="o-7">{order.prescription.rightEye.cylindrical}</p>
                                    </div>
                                    <div className="axis prescription-data">
                                        <p>Axis(0-180)</p>
                                        <p className="o-7">{order.prescription?.leftEye?.axis ?? "-"}</p>
                                        <p className="o-7">{order.prescription?.rightEye?.axis ?? "-"}</p>
                                    </div>
                                    <div className="pupil-distance prescription-data">
                                        <p>Pupil Distance(PD)</p>
                                        <p className="o-7">{order.prescription?.leftEye?.pd ?? "-"}</p>
                                        <p className="o-7">{order.prescription?.rightEye?.pd ?? "-"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}