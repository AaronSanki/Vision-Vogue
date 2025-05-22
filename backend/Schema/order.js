import Joi from "joi";

function generateDiopters(min, max) {
  const diopters = [];
  for (let i = min; i <= max; i += 0.25) {
    diopters.push(i > 0 ? "+" + i.toFixed(2) : i.toFixed(2));
  }
  return diopters;
}

const sphericalEnum = generateDiopters(-12, 12);
const cylindricalEnum = generateDiopters(-6, 6);

const lensSchema = Joi.object({
  spherical: Joi.string()
    .valid(...sphericalEnum)
    .default("0.00"),
  cylindrical: Joi.string()
    .valid(...cylindricalEnum)
    .default("0.00"),
  axis: Joi.number()
    .min(1)
    .max(180)
    .when('cylindrical', {
      is: Joi.string().invalid("0.00"),
      then: Joi.required(),
      otherwise: Joi.forbidden()
    }),
  pd: Joi.number()
    .min(50)
    .max(80)
    .required()
});

const prescriptionSchema = Joi.object({
  leftEye: lensSchema.required(),
  rightEye: lensSchema.required(),
  submitted: Joi.boolean().default(false)
});

const orderSchema = Joi.object({
  userId: Joi.string().hex().length(24).required(),
  frames: Joi.array().items(
    Joi.object({
      frame: Joi.string().hex().length(24).required(),
      quantity: Joi.number().integer().min(1).required()
    }).unknown(false)
  ).required(),
  amount: Joi.number().required(),
  prescription: prescriptionSchema.default(() => ({
    leftEye: {
      spherical: "0.00",
      cylindrical: "0.00",
      pd: 63
    },
    rightEye: {
      spherical: "0.00",
      cylindrical: "0.00",
      pd: 63
    },
    submitted: false
  })),
  address: Joi.object().required(),
  status: Joi.string().default("Frame Processing"),
  date: Joi.date().default(() => new Date()),
  payment: Joi.boolean().default(false)
});

export default orderSchema;
