import frameSchema from "../../Schema/frame.js"
import ExpressError from "../../utils/ExpressError.js"
export default function validateFrame(req, res, next) {
    const {error} = frameSchema.validate(req.body)
    if(error) {
        let message = error.details.map((el) => el.message).join(", ")
        throw new ExpressError(400, message)
    }
    else
        next()
}