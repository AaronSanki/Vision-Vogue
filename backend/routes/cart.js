import express from "express"
import { addToCart, removeFromCart } from "../controllers/cart.js"
import {isLoggedIn} from "../middleware/index.js"
import wrapAsync from "../utils/wrapAsync.js"
const router = express.Router()

router
    .route("/add")
    .post(isLoggedIn, wrapAsync(addToCart))

router
    .route("/remove")
    .post(isLoggedIn, wrapAsync(removeFromCart))

// router
//     .route("/get")
//     .get(isLoggedIn, wrapAsync(getCart))

export default router