const Payment = require("../models/payment");
const User = require("../models/user");

module.exports.getTreasurerPayments = async (req, res) => {
  //get treasurer payments based on paid/unpaid status to be sent in the req query string
  //e.g. GET request to /payments/treasurer?status=unpaid
  const { status, paysFor } = req.query;

  //ideally should validate

  let config = {};

  if (status) config = { ...config, status };
  if (paysFor) config = { ...config, paysFor };

  const payments = await Payment.find(config)
    .populate("payer")
    .sort({ date: -1 });

  const treasurerPayments = payments.filter(
    (payment) => payment.payer.role === "treasurer"
  );

  res.json(treasurerPayments);
};

module.exports.getTreasurerIncome = async (req, res) => {
  //get treasurer income = sum of paid payments by members
  const start = new Date(2024, 0, 1); // Start of 2024
  const end = new Date(2025, 0, 1); // Start of 2025

  const payments = await Payment.find({
    status: "paid",
    date: {
      $gte: start,
      $lt: end,
    },
  })
    .populate("payer")
    .sort({ date: -1 });

  const incomeList = payments.filter(
    (payment) => payment.payer.role === "member"
  );

  res.json(incomeList);
};

//need user id to fetch unpaid that belong to this user
module.exports.getMemberPayments = async (req, res) => {
  const payments = await Payment.find({
    payer: req.user._id,
    status: "unpaid",
  });

  res.json(payments);
};

// to set the status of payment from paid to unpaid
module.exports.pay = async (req, res) => {
  console.log("hit");

  const { id } = req.params;

  const payment = await Payment.findByIdAndUpdate(
    id,
    { status: "paid" },
    { new: true }
  );

  //increment timespaid if member
  const userToUpdate = await User.findById(req.user._id);
  if (userToUpdate.role === "member") {
    userToUpdate.classesPaidFor = userToUpdate.classesPaidFor + 1;
    await userToUpdate.save();
  }

  res.json(payment);
};

module.exports.createPayment = async (req, res) => {
  const payment = new Payment(req.body);

  await payment.save();

  res.json(payment);
};
