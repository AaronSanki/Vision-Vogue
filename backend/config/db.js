import mongoose from "mongoose"

const connectDB = async() => {
    await mongoose.connect(process.env.MONGO_ATLAS_URL).then(() => console.log("DB connected"))
}

export default connectDB