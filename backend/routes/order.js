import express from "express"
import {placeOrder, verifyOrder, userOrders, listOrders, updateStatus, updatePrescription} from "../controllers/order.js"
import {isLoggedIn, validateOrder} from "../middleware/index.js"
import wrapAsync from "../utils/wrapAsync.js"
const router = express.Router()

router
    .route("/place")
    .post(isLoggedIn, validateOrder, wrapAsync(placeOrder))
    .put(isLoggedIn, wrapAsync(updatePrescription))

router
    .route("/verify")
    .post(isLoggedIn, wrapAsync(verifyOrder))

router
    .route("/user")
    .get(isLoggedIn, wrapAsync(userOrders))

router
    .route("/list")
    .get(wrapAsync(listOrders))

router
    .route("/status")
    .post(wrapAsync(updateStatus))

export default router