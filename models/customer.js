const mongoose = require("mongoose");
const Joy = require("joi");

const Customer = mongoose.model(
  "Customer",
  new mongoose.Schema({
    isGold: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
    phone: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
      match: /[0-9]/,
    },
    _id: {
      type: String,
      default: mongoose.Types.ObjectId,
    },
  })
);

function validateCustomer(customer) {
  const schema = Joy.object({
    name: Joy.string().min(5).max(50).required(),
    phone: Joy.string().min(5).max(50).pattern(/[0-9]/).required(),
    isGold: Joy.boolean(),
  });
  return schema.validate(customer);
}

exports.Customer = Customer;
exports.validate = validateCustomer;