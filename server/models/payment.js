const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema(
  {
    // firstName: {
    //   type: String,
    //   required: true,
    //   unique: false,
    //   sparse: true
    // },
    // lastName: {
    //   type: String,
    //   required: true,
    //   unique: false,
    //   sparse: true
    // },
    // paid: {
    //   type: Boolean,
    //   required: true,
    //   default: false,
    //   sparse: true
    // },

    // paymentTitle: {
    //   type: String,
    //   required: true,
    //   default: false,
    //   sparse: true
    // },

    payer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    paysFor: {
      type: String,
      enum: ['session', 'coach', 'hall', 'lateFee'],
      required: true
    },

    amount: {
      type: Number,
      default: 10,
    },

    status: {
      type: String,
      enum: ['paid', 'unpaid'],
      default: 'unpaid',
    },

    date: {
      type: Date,
      default: Date.now,
    },

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