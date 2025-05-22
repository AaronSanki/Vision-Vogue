import mongoose from "mongoose"
const Schema = mongoose.Schema

function generateDiopters(min, max) {
  const diopters = []
  for(let i = min; i <= max; i += 0.25)
    diopters.push(i > 0 ? "+"+i.toFixed(2) : i.toFixed(2))
  return diopters
}

const sphericalEnum = generateDiopters(-12, 12);
const cylindricalEnum = generateDiopters(-6, 6);

const lensSchema = new Schema({
  spherical: {
    type: String,
    enum: sphericalEnum,
    default: "0.00"
  },
  cylindrical: {
    type: String,
    enum: cylindricalEnum,
    default: "0.00"
  },
  axis: {
    type: Number,
    min: 1,
    max: 180,
    validate: {
      validator() {
        return this.cylindrical !== "0.00"
      }
    }
  },
  pd: {
    type: Number,
    min: 50,
    max: 80,
    required: true
  }
}, { _id: false });

const prescriptionSchema = new Schema({
  leftEye: lensSchema,
  rightEye: lensSchema,
  submitted: {
    type: Boolean,
    default: false
  }
}, { _id: false });

const orderModel = new Schema({
  userId: {
    type: Schema.Types.ObjectId, 
    ref: "User",
    required: true
  },
  frames: [{
    frame: {
      type: Schema.Types.ObjectId,
      ref: "Frame",
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
  }, {_id: false}],
  amount: {
    type: Number,
    required: true
  },
  prescription: {
    type: prescriptionSchema,
    default: {
      leftEye: {
      spherical: "0.00",
      cylindrical: "0.00"
      },
      rightEye: {
        spherical: "0.00",
        cylindrical: "0.00"
      },
      pd: 63
    }
  },
  address: {
    type: Object,
    required: true
  },
  status: {
    type: String,
    default: "Frame Processing"
  },
  date: {
    type: Date,
    default: Date.now
  },
  payment: {
    type: Boolean,
    default: false
  }
})

const Order = mongoose.models.Order || mongoose.model("Order", orderModel)
export default Order