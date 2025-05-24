import React, { useEffect, useState } from "react"
import './Edit.css'
import { useParams, useNavigate } from "react-router-dom"
import Upload from '../../assets/Upload.jpg'
import DarkInput from "../../components/Elements/DarkInput"
import DarkSelect from "../../components/Elements/DarkSelect"
import DarkTextArea from "../../components/Elements/DarkTextArea"
import WhiteButton from "../../components/Elements/WhiteButton"
import axios from 'axios'
import { toast } from "react-toastify"
import Spinner from "../../components/Spinner/Spinner"
export default function Edit({url, toastStyle}) {
    const shape = ["Rectangle", "Square", "Round", "Geometric", "Aviator", "Cat Eye", "Club Master", "Oval"]
    const type = ["Full Rim", "Half Rim", "Rimless"]
    const [loading, setLoading] = useState(false)
    const [hasClearedOldImages, setHasClearedOldImages] = useState(false)
    const {id} = useParams()
    const [frame, setFrame] = useState({
        title: "",
        company: "",
        info: "",
        price: "",
        type: "",
        shape: "",
        images: [],
    })
    const [images, setImages] = useState([])
    const navigate = useNavigate()
    async function fetchFrame(id) {
        setLoading(true)
        const res = await axios.get(`${url}/api/frame/${id}`)
        setLoading(false)
        if(res.data.success)
            setFrame(res.data.data)
    }
    useEffect(() => {
        fetchFrame(id)
    }, [id])
    function handleChange(e) {
        const { name, value } = e.target
        setFrame({
            ...frame,
            [name]: value
        })
    }
    function handleFileChange(event) {
        const selectedFiles = Array.from(event.target.files)
        if (!hasClearedOldImages) {
            setImages(selectedFiles)
            setHasClearedOldImages(true)
            setFrame(prev => ({ ...prev, images: [] }))
        }
        else
            setImages(prev => [...prev, ...selectedFiles])
    }
    async function handleSubmit(e) {
        e.preventDefault()
        const formData = new FormData()
        const {title, info, company, price, shape, type} = frame
        formData.append("title", title)
        formData.append("info", info)
        formData.append("company", company)
        formData.append("price", price)
        formData.append("shape", shape)
        formData.append("type", type)
        images.forEach((image) => {
            formData.append("images", image)
        })
        setLoading(true)
        const res = await axios.post(`${url}/api/frame/${id}`, formData)
        setLoading(false)
        if(res.data.success) {
            navigate("/list")
            toast.success('Frame updated Successfully', toastStyle)
        }
        else {
            toast.error(res.data.message, toastStyle)
        }
    }
    if(loading)
        return <Spinner/>
    return (
        <div className="edit">
            <form className="flex-col" onSubmit={handleSubmit}>
                <div className="edit-img-upload flex-col">
                    <p>Update Image</p>
                    <label htmlFor="images">
                        {images.length > 0 || (frame.images && frame.images.length > 0) ? (
                            images.length > 0 ? (
                                images.map((img, i) => (
                                    <img key={i} src={URL.createObjectURL(img)} alt="preview" style={{ width: "15rem", borderRadius: "1rem", marginRight: '1rem' }} />
                                ))
                            ) : (
                                frame.images.map((img, i) => (
                                    <img key={i} src={`${url}/images/${img}`} alt="uploaded" style={{ width: "15rem", borderRadius: "1rem", marginRight: '1rem' }} />
                                ))
                            )
                        ) : (
                            <img src={Upload} alt="Upload Placeholder" />
                        )}
                    </label>
                    <input onChange={handleFileChange} type="file" id="images" name="images" required/>
                </div>
                <div className="edit-frame-title flex-col">
                    <label htmlFor="title">Frame Title</label>
                    <DarkInput onChange={handleChange} type="text" id="title" name="title" placeholder="Type here..." value = {frame.title} required = {true} />
                </div>
                <div className="edit-frame-Info flex-col">
                    <label htmlFor="info">Frame Info</label>
                    <DarkTextArea onChange={handleChange} name="info" rows="6" placeholder="Write content here" id="info" value = {frame.info} required = {true}></DarkTextArea>
                </div>
                <div className="edit-category-price">
                    <div className="edit-category flex-col">
                        <p>Frame Category</p>
                        <div className="categories">
                            <DarkSelect onChange={(e) => handleChange(e)} title="--Select a Shape--" placeholder="Shape" name="shape" value={frame.shape} id="shape" data = {shape} required = {true}/>
                            <DarkSelect onChange={(e) => handleChange(e)} title="--Select a Type--" placeholder="Type" name="type" value={frame.type} id="type" data = {type} required = {true}/>
                        </div>
                    </div>
                    <div className="edit-company flex-col">
                        <label htmlFor="company">Company</label>
                        <DarkInput onChange={handleChange} id="company" type="text" name = "company" placeholder="Enter Company" value={frame.company} required = {true} style={{width: "10rem"}}/>
                    </div>
                    <div className="edit-price flex-col">
                        <label htmlFor="price">Price</label>
                        <DarkInput onChange={handleChange} id="price" type="number" name = "price" placeholder="Enter Price" value={frame.price} required = {true}/>
                    </div>
                </div>
                <WhiteButton style={{width: "9rem"}} type = "submit" title="edit Frame" />
            </form>
        </div>
    )
}