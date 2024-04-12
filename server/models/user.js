const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },

    lastName: {
      type: String,
    },

    fireBaseId: { type: String, required: true },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    role: {
      type: String,
      enum: ["member", "coach", "treasurer"],
      default: "member",
    },

    lateStatus: {
      type: Boolean,
      default: false,
    },

    classesPaidFor: {
      type: Number,
      default: 0,
    },

    classesAttended: {
      type: Number,
      default: 0,
    },

    address: String,
    phoneNumber: String,
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

// Compare the given password with the hashed password in the database
// userSchema.methods.comparePassword = async function (password) {
//   return password == this.password;
//   // return bcrypt.compare(password, this.password);
// };

const User = mongoose.model("User", userSchema);

module.exports = User;
