import express from 'express'
import { addFrame, listFrames, removeFrame, editFrame, fetchFrame } from '../controllers/frame.js'
import {upload, validateFrame} from '../middleware/index.js'
import wrapAsync from '../utils/wrapAsync.js'
import cors from "cors"

const router = express.Router()
const corsOptions = {
    origin: [process.env.FRONTEND_URL, process.env.ADMIN_URL],
    methods: "GET, POST, PUT, DELETE, OPTIONS",
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    exposedHeaders: ['Authorization'],
    optionsSuccessStatus: 204
}

router.use(cors(corsOptions))

router
    .route("/add")
    .post(upload.array("images"), validateFrame, wrapAsync(addFrame))

router
    .route("/list")
    .get(wrapAsync(listFrames))
    .delete(wrapAsync(removeFrame))

router
    .route("/:id")
    .get(wrapAsync(fetchFrame))
    .put(upload.array("images"), validateFrame, wrapAsync(editFrame))

export default router