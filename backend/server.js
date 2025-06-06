import express from "express"
import cors from "cors"
import {connectDB} from './config/index.js'
import {frameRouter, userRouter, cartRouter, orderRouter} from "./routes/index.js"
import passport from "passport"
import localStrategy from "passport-local"
import User from "./models/user.js"
import session from "express-session"
import MongoStore from "connect-mongo"

//App config
const app = express()
app.set('trust proxy', 1)
const port = process.env.PORT || 3000
const corsOptions = {
    origin: [process.env.FRONTEND_URL, process.env.ADMIN_URL],
    methods: "GET, POST, PUT, DELETE, OPTIONS",
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    exposedHeaders: ['Authorization'],
    optionsSuccessStatus: 204
}
const store = MongoStore.create({
    mongoUrl: process.env.MONGO_ATLAS_URL,
    crypto: {
        secret: process.env.SECRET
    },
    touchAfter: 24 * 60 * 60
})
store.on("error", (err)=>{
    console("ERROR IN MONGO SESSION STORE", err);
})

//Middleware
app.use(cors(corsOptions))
app.options('/api/{*any}', cors(corsOptions))
app.use(express.json())
app.use(session({
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        secure: process.env.NODE_ENV === "production"    
    },
}))

app.use(passport.initialize())
app.use(passport.session())
passport.use(new localStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())


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
    console.log(`Server started`)
})

app.use((err, req, res, next) => {
    const { status = 500, message = "Something went wrong" } = err;
    res.status(status).json({ error: message });
})