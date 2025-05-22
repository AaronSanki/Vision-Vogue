import {User} from "../models/index.js"

//Retrieve Login Information
export async function userLoggedIn(req, res) {
    const user = await User.findById(req.userId).populate("cartItems.frame")
    const {salt, hash, ...data} = user.toObject()
    res.status(200).json({success: true, data})
}

//Login User
export async function loginUser(req, res) {
    const {salt, hash, ...safeUser} = req.user.toObject()
    res.status(200).json({success: true, data: "Successfully logged In", user: safeUser})
}

//Create new account
export async function createAccount(req, res) {
    let {username, email, password} = req.body
    const user = new User({email, username})
    const registered = await User.register(user, password)
    const {hash, salt, ...safeUser} = registered.toObject()
    req.login(registered, (err) => {
        if(err)
            return next(err)
    })
    res.status(201).json({ success: true, message: "Account created", user: safeUser })
}

//Logout User
export async function logout(req, res) {
    req.logout(err => {
        if (err)
            return res.status(500).json({ success: false, message: "Logout failed" })
        res.status(200).json({ success: true, message: "User logged out" })
    })
}