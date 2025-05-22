import mongoose from 'mongoose'
const Schema = mongoose.Schema
import passportLocalMongoose from 'passport-local-mongoose'

const userModel = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    cartItems: [{
        frame: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Frame"
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    cartSubtotal: {
        type: Number,
        default: 0
    }
}, {minimize: false})

userModel.plugin(passportLocalMongoose)
const User = mongoose.model.User || mongoose.model("User", userModel)
export default User