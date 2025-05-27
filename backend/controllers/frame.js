import { Frame } from '../models/index.js'
import { cloudinary } from '../config/index.js'

//Create Frame
export async function addFrame(req, res) {
    let images = req.files.map(file => ({url: file.path, filename: file.filename}))
    const {title, price, company, info, type, shape} = req.body
    const frame = new Frame({
        title,
        images,
        price,
        company,
        info,
        type,
        shape,
        rating: 0,
        count: 0,
    })
    await frame.save()
    res.status(201).json({success: true, message: "Frame Added"})
}

//Retrieve Frame
export async function fetchFrame(req, res) {
    const {id} = req.params
    const frame = await Frame.findById(id)
    res.status(200).json({success: true, data: frame})
}

//Retrieve all Frames
export async function listFrames(req, res) {
    const frames = await Frame.find({})
    res.status(200).json({success: true, data: frames})
}

//Update Frame
export async function editFrame(req, res) {
    const {id} = req.params
    const {title, price, company, info, type, shape} = req.body
    const images = req.files ? req.files.map(file => ({url: file.path, filename: file.filename})) : []
    const frame = await Frame.findById(id)
    if (!frame)
        return res.status(404).json({ success: false, message: "Frame not found" })
    frame.title = title || frame.title
    frame.price = price || frame.price
    frame.company = company || frame.company
    frame.info = info || frame.info
    frame.type = type || frame.type
    frame.shape = shape || frame.shape
    if(images.length > 0) {
        await Promise.all(
            frame.images.map(async (image) => {
                try {
                    await cloudinary.uploader.destroy(image.filename)
                }
                catch{
                    console.log("Couldn't delete image")
                }
            })
        )
        frame.images = images
    }
    await frame.save()
    res.status(200).json({success: true, message: "Frame updated successfully"})
}

//Destroy Frame
export async function removeFrame(req, res) {
    const frame = await Frame.findById(req.body._id)
    if (!frame)
        return res.status(404).json({ success: false, message: "Frame not found" })
    await Promise.all(
        frame.images.map(async (image) => {
            try {
                await cloudinary.uploader.destroy(image.filename)
            }
            catch{
                console.log("Couldn't delete image")
            }
        })
    )
    await Frame.findByIdAndDelete(req.body._id)
    res.status(200).json({ success: true, message: "Frame removed successfully" })
}