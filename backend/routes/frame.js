import express from 'express'
import { addFrame, listFrames, removeFrame, editFrame, fetchFrame } from '../controllers/frame.js'
import {upload, validateFrame} from '../middleware/index.js'
import wrapAsync from '../utils/wrapAsync.js'
const router = express.Router()

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
    .post(upload.array("images"), validateFrame, wrapAsync(editFrame))

export default router