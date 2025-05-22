import mongoose from "mongoose"
const Schema = mongoose.Schema
const frameModel = new Schema({
    title: {
        type: String,
        required: true,
    },
    images: {
        type: [String],
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 1,
    },
    company: {
        type: String,
        required: true,
    },
    info: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ["Full Rim", "Half Rim", "Rimless"],
        required: true,
    },
    shape: {
        type: String,
        enum: ["Rectangle", "Square", "Round", "Geometric", "Aviator", "Cat Eye", "Club Master", "Oval"],
        required: true,
    },
    rating: {
        type: Number,
        required: false,
        min: 0,
    },
    count: {
        type: Number,
        required: false,
        min: 0,
    },
})
const Frame = mongoose.models.Frame || mongoose.model("Frame", frameModel)
export default Frame