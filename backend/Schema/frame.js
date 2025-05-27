import Joi from "joi"
const frameSchema = Joi.object ({
    title: Joi.string()
        .required(),

    info: Joi.string()
        .required(),

    company: Joi.string()
        .required(),

    images: Joi.array().items(Joi.object({
        url: Joi.string()
            .required(),
        filename: Joi.string()
            .required()
    })),

    price: Joi.number()
        .min(0)
        .required(),

    shape: Joi.string()
        .valid (
            "Rectangle",
            "Square",
            "Round",
            "Geometric",
            "Aviator",
            "Cat Eye",
            "Club Master",
            "Oval"
        )
        .required(),

    type: Joi.string()
        .valid("Full Rim", "Half Rim", "Rimless")
        .required(),

    rating: Joi.number()
        .min(0),

    count: Joi.number()
        .min(0),
})
export default frameSchema