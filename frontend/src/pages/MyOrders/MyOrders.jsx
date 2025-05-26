import React, {useEffect, useState} from "react"
import {useApp, useUser} from "../../store/index.js"
import {useNavigate} from "react-router-dom"
import axios from "axios"
import OrderImage from "../../assets/Order/Order.png"
import OrangeButton from "../../components/Buttons/OrangeButton.jsx"
import WhiteButton from "../../components/Buttons/WhiteButton.jsx"
import DarkSelect from "../../components/Select/DarkSelect.jsx"
import DarkInput from "../../components/Inputs/DarkInput.jsx"
import { toast } from "react-toastify"
import { ChevronDown, ChevronUp } from 'lucide-react'
import "./MyOrders.css"
import Spinner from "../../components/Spinner/Spinner.jsx"
export default function MyOrders() {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const [down, setDown] = useState([])
    const [prescription, setPrescription] = useState([])
    const {url, toastStyle} = useApp()
    const {user} = useUser()
    const navigate = useNavigate()
    async function fetchOrders() {
        setLoading(true)
        const response = await axios.get(`${url}/api/order/user`, {withCredentials: true})
        setLoading(false)
        const orders = response.data.data.reverse()
        setData(orders)
        setPrescription(orders.map(order => ({...order.prescription})))
    }
    function handlePrescriptionChange(index, eye, field, value) {
        setPrescription(prev => {
          const updated = [...prev]
          updated[index] = {
            ...updated[index],
            [eye]: {
              ...updated[index][eye],
              [field]: value
            }
          }
          return updated
        })
    }
    function generateDiopters(min, max) {
        const diopters = []
        for(let i = 0; i >= min; i -= 0.25)
          diopters.push(i.toFixed(2))
        for(let i = 0.25; i <= max; i++)
          diopters.push("+"+i.toFixed(2))
        return diopters
    }
    const spherical = generateDiopters(-12, +12)
    const cylindrical = generateDiopters(-6, +6)
    useEffect(() => {
        if(user)
            fetchOrders()
        else
            navigate("/")
    }, [user])
    async function handleSubmit(e, index) {
        e.preventDefault()
        const updated = [...prescription]
        updated[index] = {
            ...updated[index],
            submitted: true,
        }
        setPrescription(updated)
        setLoading(true)
        let response = await axios.put(url+"/api/order/place", {prescription: updated[index], orderId: data[index]._id}, {withCredentials: true})
        setLoading(false)
        if(response.data.success)
            toast.success(response.data.message, toastStyle)
        else
            toast.error(response.data.message, toastStyle)
    }
    if(loading)
        return <Spinner/>
    return (
        <div className="my-orders">
            <h2>My Orders</h2>
            <div className="container">
                <hr />
                {
                data.length === 0 
                ? (<p className="text-center">No Orders yet :(</p>)
                : (data.map((order, index) => {
                    return (
                        <div key={index}>
                            <div className="my-order">
                                <img className="order-img" src={OrderImage} alt="Order"/>
                                <p>{order.frames.map((frameDetails, index) => {
                                    const {frame, quantity} = frameDetails
                                    if(index === order.frames.length-1)
                                        return frame.title+" X "+quantity
                                    else
                                        return frame.title+" X "+quantity+", "
                                })}</p>
                                <p>&#x20B9;{order.amount}.00</p>
                                <p>Frames: {order.frames.length}</p>
                                <p><span>&#x25cf;</span> <b>{order.status}</b></p>
                                <OrangeButton onClick={fetchOrders} title="Track Order"/>
                                <a data-bs-toggle="collapse" href={`#order-collapse-${order._id}`} role="button" aria-expanded="false" aria-controls="collapseExample" onClick={() => setDown(prev =>{const updated = [...prev]; updated[index] = !updated[index]; return updated})}>{down[index] ? <ChevronUp/> : <ChevronDown/>}</a>
                            </div>
                            <form onSubmit={(e)=>handleSubmit(e, index)} className="collapse" id={`order-collapse-${order._id}`}>
                                <div className="order-card card card-body">
                                    <div className="eye-side prescription-data">
                                        <p>Eye</p>
                                        <p>Left</p>
                                        <p>Right</p>
                                    </div>
                                    <div className="spherical prescription-data">
                                        <p>Spherical(SPH)</p>
                                        {prescription[index].submitted
                                            ? <>
                                                <p className="o-7">{prescription[index].leftEye.spherical}</p>
                                                <p className="o-7">{prescription[index].rightEye.spherical}</p>
                                            </>
                                            : <>
                                                <DarkSelect style={{backgroundColor: "#202020", width: "4.5rem"}} data={spherical} value = {prescription[index]?.leftEye?.spherical} onChange={(e) => handlePrescriptionChange(index, "leftEye", "spherical", e.target.value)}/>
                                                <DarkSelect style={{backgroundColor: "#202020", width: "4.5rem"}} data={spherical} value = {prescription[index]?.rightEye?.spherical} onChange={(e) => handlePrescriptionChange(index, "rightEye", "spherical", e.target.value)}/>
                                            </>
                                        }
                                    </div>
                                    <div className="cylindrical prescription-data">
                                        <p>Cylindrical(CYL)</p>
                                        {prescription[index].submitted
                                            ? <>
                                                <p className="o-7">{prescription[index].leftEye.cylindrical}</p>
                                                <p className="o-7">{prescription[index].rightEye.cylindrical}</p>
                                            </>
                                            : <>
                                                <DarkSelect style={{backgroundColor: "#202020", width: "4.5rem"}} data={cylindrical} value = {prescription[index]?.leftEye?.cylindrical} onChange={(e) => handlePrescriptionChange(index, "leftEye", "cylindrical", e.target.value)}/>
                                                <DarkSelect style={{backgroundColor: "#202020", width: "4.5rem"}} data={cylindrical} value = {prescription[index]?.rightEye?.cylindrical} onChange={(e) => handlePrescriptionChange(index, "rightEye", "cylindrical", e.target.value)}/>
                                            </>
                                        }
                                    </div>
                                    <div className="axis prescription-data">
                                        <p>Axis(0-180)</p>
                                        {prescription[index].submitted
                                            ? <>
                                                <p className="o-7">{prescription[index]?.leftEye?.axis ?? "-"}</p>
                                                <p className="o-7">{prescription[index]?.rightEye?.axis ?? "-"}</p>
                                            </>
                                            : <>
                                                <DarkInput type = "Number" style={{backgroundColor: "#202020", width: "4.25rem", height: "2.2rem", padding: "0.5rem"}} value = {prescription[index]?.leftEye?.axis ?? ""} onChange={(e) => handlePrescriptionChange(index, "leftEye", "axis", e.target.value)}/>
                                                <DarkInput type = "Number" style={{backgroundColor: "#202020", width: "4.25rem", height: "2.2rem", padding: "0.5rem"}} value = {prescription[index]?.rightEye?.axis ?? ""} onChange={(e) => handlePrescriptionChange(index, "rightEye", "axis", e.target.value)}/>
                                            </>
                                        }
                                    </div>
                                    <div className="pupil-distance prescription-data">
                                        <p>Pupil Distance(PD)</p>
                                        {prescription[index].submitted
                                            ? <>
                                                <p className="o-7">{prescription[index]?.leftEye?.pd ?? "-"}</p>
                                                <p className="o-7">{prescription[index]?.rightEye?.pd ?? "-"}</p>
                                            </>
                                            : <>
                                                <DarkInput type = "Number" style={{backgroundColor: "#202020", width: "4.25rem", height: "2.2rem", padding: "0.5rem"}} value = {prescription[index]?.leftEye?.pd ?? ""} onChange={(e) => handlePrescriptionChange(index, "leftEye", "pd", e.target.value)}/>
                                                <DarkInput type = "Number" style={{backgroundColor: "#202020", width: "4.25rem", height: "2.2rem", padding: "0.5rem"}} value = {prescription[index]?.rightEye?.pd ?? ""} onChange={(e) => handlePrescriptionChange(index, "rightEye", "pd", e.target.value)}/>
                                            </>
                                        }
                                    </div>
                                    {!prescription[index].submitted&&<WhiteButton className="submit" title = "submit" type = "submit" style = {{width: "4.5rem"}} />}
                                </div>
                            </form>
                        </div>
                    )
                }))}
            </div>
        </div>
    )
}