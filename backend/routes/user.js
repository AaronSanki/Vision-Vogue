import express from "express"
import { loginUser, createAccount, logout, userLoggedIn } from "../controllers/user.js"
import { isLoggedIn } from "../middleware/index.js"
import wrapAsync from "../utils/wrapAsync.js"
import passport from "passport"

const router = express.Router()

router
    .route("/signup")
    .post(wrapAsync(createAccount))

router
    .route("/login")
    .post(passport.authenticate("local"), wrapAsync(loginUser))
    .get(isLoggedIn, wrapAsync(userLoggedIn))

router
    .route("/logout")
    .get(wrapAsync(logout))

export default router