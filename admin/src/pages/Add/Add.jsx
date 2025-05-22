import React, { useState, useRef } from "react"
import './Add.css'
import Upload from '../../assets/Upload.jpg'
import DarkInput from "../../components/Elements/DarkInput"
import DarkSelect from "../../components/Elements/DarkSelect"
import DarkTextArea from "../../components/Elements/DarkTextArea"
import WhiteButton from "../../components/Elements/WhiteButton"
import axios from 'axios'
import Spinner from "../../components/Spinner/Spinner"
import { toast } from "react-toastify"
export default function Add({url, toastStyle}) {
    const shape = ["Rectangle", "Square", "Round", "Geometric", "Aviator", "Cat Eye", "Club Master", "Oval"]
    const type = ["Full Rim", "Half Rim", "Rimless"]
    const [loading, setLoading] = useState(false)
    const [images, setImages] = useState([])
    const fileInputRef = useRef(null)
    const [data, setData] = useState({
        title: "",
        info: "",
        price: "",
        type: "",
        shape: "",
        company: "",
    })
    async function handleSubmit(event) {
        event.preventDefault()
        if (images.length === 0) {
            toast.error("Please upload at least one image", toastStyle)
            return
        }
        const formData = new FormData()
        const {title, info, price, type, shape, company} = data
        formData.append("title", title)
        formData.append("info", info)
        formData.append("price", price)
        formData.append("type", type)
        formData.append("shape", shape)
        formData.append("company", company)
        images.forEach((img) => {
            formData.append("images", img)
        })
        setLoading(true)
        const res = await axios.post(`${url}/api/frame/add`, formData)
        setLoading(false)
        if(res.data.success) {
            setData({
                title: "",
                info: "",
                price: "",
                type: "",
                shape: "",
                company: "",
            })
            setImages([])
            if(fileInputRef.current) {
                fileInputRef.current.value = ""
            }
            toast.success('Frame added Successfully', toastStyle)
        }
        else {
            toast.error(res.data.message, toastStyle);
        }
    }
    function handleChange(event) {
        const {name, value} = event.target
        setData(data => ({...data, [name]:value}))
    }
    function handleFileChange(event) {
        const file = event.target.files[0];
        if (file) {
            setImages(prev => [...prev, file])
        }
    }
    if(loading)
        return <Spinner/>
    return (
        <div className="add">
            <form className="flex-col" onSubmit={handleSubmit}>
                <div className="add-img-upload">
                    <p>Upload Image</p>
                    <label htmlFor="images">
                        <div className="img-preview">
                            {images.length > 0 ? (
                                images.map((img, i) => (
                                    <img key={i} src={URL.createObjectURL(img)} alt="preview" style={{ width: "15rem", borderRadius: "1rem", marginRight: '1rem'}}/>
                                ))
                            ) : (
                                <img src={Upload} alt="Upload Placeholder" />
                            )}
                        </div>
                    </label>
                    <input onChange={handleFileChange} ref={fileInputRef} type="file" id="images" name="images" required/>
                </div>
                <div className="add-frame-title flex-col">
                    <label htmlFor="title">Frame Title</label>
                    <DarkInput onChange={handleChange} type="text" id="title" name="title" placeholder="Type here..." value = {data.title} required = {true} />
                </div>
                <div className="add-frame-Info flex-col">
                    <label htmlFor="info">Frame Info</label>
                    <DarkTextArea onChange={handleChange} name="info" rows="6" placeholder="Write content here" id="info" value = {data.info} required = {true}></DarkTextArea>
                </div>
                <div className="add-category-price">
                    <div className="add-category flex-col">
                        <p>Frame Category</p>
                        <div className="categories">
                            <DarkSelect onChange={(e) => handleChange(e)} title="--Select a Shape--" placeholder="Shape" name="shape" value={data.shape} id="shape" data = {shape} required = {true}/>
                            <DarkSelect onChange={(e) => handleChange(e)} title="--Select a Type--" placeholder="Type" name="type" value={data.type} id="type" data = {type} required = {true}/>
                        </div>
                    </div>
                    <div className="add-company flex-col">
                        <label htmlFor="company">Company</label>
                        <DarkInput onChange={handleChange} id="company" type="text" name = "company" placeholder="Enter Company" value={data.company} required = {true} style={{width: "10rem"}}/>
                    </div>
                    <div className="add-price flex-col">
                        <label htmlFor="price">Price</label>
                        <DarkInput onChange={handleChange} id="price" type="number" name = "price" placeholder="Enter Price" value={data.price} required = {true}/>
                    </div>
                </div>
                <WhiteButton style={{width: "9rem"}} type = "submit" title="Add Frame" />
            </form>
        </div>
    )
}