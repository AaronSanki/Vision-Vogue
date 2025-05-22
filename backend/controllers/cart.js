import {User} from "../models/index.js"

//Add to Cart
export async function addToCart(req, res) {
    const userData = await User.findById(req.userId)
    if (!userData)
        return res.status(404).json({ success: false, message: "User not found" });
    let {cartItems, cartSubtotal} = userData
    const {frameId, price, quantity} = req.body
    const index = cartItems.findIndex((item) => item.frame._id.toString() === frameId)
    if(index === -1)
        cartItems.push({frame: frameId, quantity})
    else
        cartItems[index].quantity += quantity
    cartSubtotal += price
    await User.findByIdAndUpdate(req.userId, {cartItems, cartSubtotal})
    res.status(200).json({success: true, message: "Added to Cart"})
}

//Remove from Cart
export async function removeFromCart(req, res) {
    let userData = await User.findById(req.userId).populate("cartItems.frame")
    let {cartItems, cartSubtotal} = userData
    const {frameId, quantity, price} = req.body
    const index = cartItems.findIndex(item => item.frame._id.toString() === frameId)
    if (index === -1)
        return res.status(400).json({ success: false, message: "Item not found in cart" });
    if(cartItems[index].quantity > 0)
        cartItems[index].quantity -= quantity
    cartSubtotal = Math.max(0, cartSubtotal - price)
    cartItems = cartItems.filter(item => item.quantity > 0)
    await User.findByIdAndUpdate(req.userId, {cartItems, cartSubtotal})
    res.status(200).json({success: true, message: "Removed from cart"})
}

//Retrieve Cart Data
// export async function getCart(req, res) {
//     const userData = await User.findById(req.userId).populate("cartItems.frame")
//     const {cartItems, cartSubtotal} = userData
//     res.json({success: true, data: {cartItems, cartSubtotal}})
// }