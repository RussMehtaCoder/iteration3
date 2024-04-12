const Payment = require('../models/payment');

module.exports.getTreasurerPayments = async (req, res) => {
    //get treasurer payments based on paid/unpaid status to be sent in the req query string
    //e.g. GET request to /payments?status=unpaid
    const { status } = req.query;
    let config;
    if (status) config = { status: status };

    const payments = await Payment.find(config).populate('payer').sort({ date: -1 });
    
    const treasurerPayments = payments.filter(payment => payment.payer.role === 'treasurer');

    const hallPayments = treasurerPayments.filter(payment => payment.paysFor === 'hall').map(payment => {
        const { payer, ...paymentObject } = payment.toObject();
        return paymentObject;
    });

    const coachPayments = treasurerPayments.filter(payment => payment.paysFor === 'coach').map(payment => {
        const { payer, ...paymentObject } = payment.toObject();
        return paymentObject;
    });

    res.json([hallPayments, coachPayments]);

}

module.exports.getTreasurerIncome = async (req, res) => {
    //get treasurer income = sum of paid payments by members
    const start = new Date(2024, 0, 1); // Start of 2024
    const end = new Date(2025, 0, 1); // Start of 2025

    const payments = await Payment.find({
        status: "paid",
        date: {
            $gte: start,
            $lt: end
        }
    }).populate('payer').sort({ date: -1 });

    const incomeList = payments.filter(payment => payment.payer.role === 'member');

    res.json(incomeList);
}

//need user id to fetch those unpaid that belong to this user
module.exports.getMemberPayments = async (req, res) => {}


//need to add functionality. not always create payment but also need to update existing
module.exports.createPayment = async (req, res) => {

    const payment = new Payment(req.body);

    await payment.save();

    res.status(201).send('Payment accepted');
}