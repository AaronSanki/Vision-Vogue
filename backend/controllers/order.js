import {Order, User} from "../models/index.js"
import Razorpay from "razorpay"
import crypto from "crypto"

const id = process.env.RAZORPAY_API_KEY_ID
const secret = process.env.RAZORPAY_API_KEY_SECRET
const razorpay = new Razorpay({
    key_id: id,
    key_secret: secret
})

//Place User Order for frontend
export async function placeOrder(req, res) {
    const newOrder = new Order({
        userId: req.userId,
        frames: req.body.frames,
        amount: req.body.amount,
        address: req.body.address
    })
    await newOrder.save()
    const amount = req.body.amount * 100
    const options = {
        amount: amount,
        currency: "INR",
        receipt: `order_rcptid_${newOrder._id}`
    }
    const order = await razorpay.orders.create(options)
    res.status(201).json({success: true, order: {...order, mongo_order_id: newOrder._id}})
}

//Verify Payment
export async function verifyOrder(req, res) {
    const{razorpay_payment_id, razorpay_order_id, razorpay_signature, mongo_order_id} = req.body
    const body = razorpay_order_id + "|" + razorpay_payment_id
    const signature = crypto
    .createHmac("sha256", process.env.RAZORPAY_API_KEY_SECRET)
    .update(body.toString())
    .digest("hex")
    if(signature === razorpay_signature) {
        await Order.findByIdAndUpdate(mongo_order_id, {payment: true})
        await User.findByIdAndUpdate(req.userId, {cartItems: [], cartSubtotal: 0})
        res.status(200).json({success: true, message: "Payment verified successfully"})
    }
    else
        res.status(400).json({success: false, message: "Payment failed. Please try again"})
}

//Display User Orders
export async function userOrders(req, res) {
    const orders = await Order.find({userId: req.userId}).populate("frames.frame")
    res.status(200).json({success: true, data: orders})
}

//List All Orders
export async function listOrders(req, res) {
    const orders = await Order.find({}).populate("frames.frame")
    res.status(200).json({success: true, data: orders})
}

//API for upadating Order Status
export async function updateStatus(req, res) {
    await Order.findByIdAndUpdate(req.body.orderId, {status: req.body.status})
    res.status(200).json({success: true, message: "Status updated successfully"})
}

//Update Lens Prescription
export async function updatePrescription(req, res) {
    let order = await Order.findById(req.body.orderId)
    if(order.prescription.submitted)
        return res.status(400).json({success: false, message: "Prescription already submitted"})
    else {
        order.prescription = req.body.prescription
        await order.save()
        return res.status(200).json({success: true, message: "Prescription Updated Successfully"})
    }
}