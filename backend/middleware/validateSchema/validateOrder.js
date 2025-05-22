import orderSchema from "../../Schema/order.js";
import ExpressError from "../../utils/ExpressError.js";

export default function validateOrder(req, res, next) {
    req.body.userId = req.userId.toString()
    const { error } = orderSchema.validate(req.body, { abortEarly: false });
    if (error) {
    const message = error.details.map(el => el.message).join(", ");
    throw new ExpressError(400, message);
    } else {
    next();
    }
}