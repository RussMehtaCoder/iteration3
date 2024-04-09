const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      unique: true
    },
    lastName: {
      type: String,
      required: true,
      unique: true
    },
    paid: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  { timestamps: true }
);

// // Hash the password before saving it to the database
// userSchema.pre('save', async function (next) {
//   const user = this;
//   if (!user.isModified('password')) return next();

//   try {
//     const salt = await bcrypt.genSalt();
//     user.password = await bcrypt.hash(user.password, salt);
//     next();
//   } catch (error) {
//     return next(error);
//   }
// });

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
exports = Payment;
