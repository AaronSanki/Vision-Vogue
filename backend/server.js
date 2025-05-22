import express from "express"
import cors from "cors"
import {connectDB} from './config/db.js'
import {frameRouter, userRouter, cartRouter, orderRouter} from "./routes/index.js"
import passport from "passport"
import localStrategy from "passport-local"
import User from "./models/user.js"
import session from "express-session"
import dotenv from "dotenv"
//App config
const app = express()
const port = process.env.PORT || 3000
const corsOptions = {
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, DELETE",
    credentials: true
}
if(process.env.NODE_ENV !== "production")
    dotenv.config()

//Middleware
app.use(express.json())
app.use(cors(corsOptions))

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    }
}))

app.use(passport.initialize())
app.use(passport.session())
passport.use(new localStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use((err, req, res, next) => {
    const { status = 500, message = "Something went wrong" } = err;
    res.status(status).json({ error: message });
})

//DB connection
connectDB()

//API end points
app.use("/images", express.static('uploads'))
app.use("/api/frame", frameRouter)
app.use("/api/user", userRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)

app.get("/", (req, res) => {
    res.send("API server working")
})

app.listen(port, () => {
    console.log(`Server started on: http://localhost:${port}`)
})