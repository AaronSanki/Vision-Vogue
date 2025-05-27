import {cloudinary} from "../config/index.js"
import {CloudinaryStorage} from "multer-storage-cloudinary"
import multer from "multer"

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'vision-vogue_PROD',
        allowedFormats: ["png", "jpg", "jpeg", "webp"]
    }
})

export default multer({storage})