const Payment = require('../models/payment');

module.exports.getTreasurerPayments = async (req, res) => {
    const payments = await Payment.find().populate('payer');

    const filteredPayments = payments.filter(payment => payment.payer.role === 'treasurer');

    res.json(filteredPayments);
}

module.exports.makePayment = async (req, res) => {

    const payment = new Payment(req.body);
    
    await payment.save(); 

    res.status(202).send('Payment accepted');
}