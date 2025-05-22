import React, {useState, useEffect} from "react"
import './List.css'
import {toast} from 'react-toastify'
import axios from 'axios'
import {X, Pencil} from 'lucide-react'
import { useNavigate } from "react-router-dom"
import Spinner from "../../components/Spinner/Spinner"
export default function List({url, toastStyle}) {
    const navigate = useNavigate()
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(false)
    async function fetchList() {
        setLoading(true)
        const res = await axios.get(`${url}/api/frame/list`)
        setLoading(false)
        if(res.data.success) {
            setList(res.data.data.sort((a, b) => b.rating - a.rating))
        }
        else {
            toast.error(res.data.error, toastStyle)
        }
    }
    async function removeFrame(frameId) {
        setLoading(true)
        const res = await axios.delete(`${url}/api/frame/list`, {data: { _id: frameId }})
        setLoading(false)
        fetchList()
        if(res.data.success) {
            toast.success('Frame deleted Successfully', toastStyle)
        }
        else {
            toast.error(res.data.message, toastStyle)
        }
    }
    useEffect(() => {
        fetchList()
    }, [])
    if(loading)
        return <Spinner/>
    return (
        <div className="list add flex-col">
            <h2>Frames</h2>
            <div className="list-table">
                <div className="list-table-format title">
                    <b>Image</b>
                    <b>Title</b>
                    {/* <b>Shape</b>
                    <b>Type</b> */}
                    <b>Company</b>
                    <b>Price</b>
                    <b>Action</b>
                </div>
                {
                    list.map((frame, index) => {
                    return (
                        <div key = {index} className="list-table-format">
                            <img src={`${url}/images/${frame.images[0]}`} alt="" />
                            <p>{frame.title}</p>
                            <p>{frame.company}</p>
                            <p>&#x20B9;{frame.price}</p>
                            <div className="action-container">
                                <p onClick={() => removeFrame(frame._id)} className="action"><X/></p>
                                <p onClick={() => navigate(`/edit/${frame._id}`)} className="action"><Pencil/></p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}