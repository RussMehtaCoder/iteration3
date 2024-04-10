const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/Users');
const Payment = require('../models/Payments');
const backendAuth = require('../middlewares/auth');

// Register a new user
const register = async (req, res, next) => {
  const { firstName, lastName, email, password: password, role } = req.body;
  console.log(req.body);

  try {
    // const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ firstName, lastName, email, password: password, role});
    await user.save();
    var memberEntry; 
    var coachEntry;
    var hallEntry;

    if (role == "member") {
      memberEntry = new Payment({ firstName, lastName, paid: false, paymentTitle: "Practice" });
    } else if (role == "treasurer") {
      coachEntry = new Payment({ firstName, lastName, paid: false, paymentTitle: "Coach" });
      hallEntry = new Payment({ firstName: firstName, lastName, paid: false, paymentTitle: "Hall" });
    } 

    if (memberEntry) {
      await memberEntry.save();
    }

    if (coachEntry) {
      await coachEntry.save();
    }

    if (hallEntry) {
      await hallEntry.save();
    }
    // const paymentUser = new Payment({ firstName, lastName, paid: false, paymentTitle: "Practice" });
    // await paymentUser.save();
    

    res.json({ message: 'Registration successful' });
  } catch (error) {
    next(error);
  }
};

// Login with an existing user
const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    console.log(`The password is ${password}`);
    const passwordMatch = await user.comparePassword(password);

    console.log
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: '1 hour'
    });
    res.json({ token });
  } catch (error) {
    next(error);
  }
};



const makePayment = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    req.user = await backendAuth.authenticateToken(token);
   // payment title 
    const { paymentTitle } = req.body;



    var payment;
    // console.log(req.body);

    // if (req.user.role == "treasurer") {
    //   const payment = await Payment.findOne( { firstName: req.user.firstName, lastName: req.user.lastName , paymenTitle: ""}  );

    // }

    if(paymentTitle == "Practice") {
       payment = await Payment.findOne( { firstName: req.user.firstName, lastName: req.user.lastName }  );

      if (payment) {
        payment.paid = true;  
    
        await payment.save();
    
        console.log('Payment updated successfully.');
    } else {
        console.log('No payment found with the given first and last name.');
    }
  
    } else if (paymentTitle == "Coach") {
       payment = await Payment.findOne( { firstName: req.user.firstName, lastName: req.user.lastName , paymentTitle: "Coach" }  );

      if (payment) {
        payment.paid = true;  
        await payment.save();
    
        console.log('Payment updated successfully.');
    } else {
        console.log('No payment found with the given first and last name.');
    } 

    } else if (paymentTitle == "Hall") {

       payment = await Payment.findOne( { firstName: req.user.firstName, lastName: req.user.lastName , paymentTitle: "Hall" }  );

      if (payment) {
        payment.paid = true; 
    
        await payment.save();
    
        console.log('Payment updated successfully.');
    } else {
        console.log('No payment found with the given first and last name.');
    } 

    }
  

    // console.log(`HIII PAYMENT IS ${payment}`);

    var userStringObj = JSON.stringify(payment);

    req.payment = payment;
    next();

    // return res.json({  userStringObj});


    // res.status(401).json({ message: error.message });

  
    // try {
    //   // const hashedPassword = await bcrypt.hash(password, 10);
    //   const user = new User({ firstName, lastName, email, password: password, role});
    //   await user.save();
  
    //   const paymentUser = new Payment({ firstName, lastName});
    //   await paymentUser.save();
      
  
    //   res.json({ message: 'Registration successful' });
    // } catch (error) {
    //   next(error);
    // }
  
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};




const getUserInfo = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    req.user = await backendAuth.authenticateToken(token);
   // payment title 
    const { paymentTitle } = req.body;



    var payments;

    try {
       payments = await Payment.find({ firstName: req.user.firstName, lastName: req.user.lastName });
      // console.log(`the payments is ${payments}`);
    } catch (err) {
      payments = null;
      console.error(err);
    }

    req.user.paymentArr = payments;
    next();
  
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};



// const  makePayment = async (req, res, next) => {
//   const { firstName, lastName, role } = req.body;
//   console.log(req.body);

//   try {
//     // const hashedPassword = await bcrypt.hash(password, 10);
//     const user = new User({ firstName, lastName, email, password: password, role});
//     await user.save();

//     const paymentUser = new Payment({ firstName, lastName});
//     await paymentUser.save();
    

//     res.json({ message: 'Registration successful' });
//   } catch (error) {
//     next(error);
//   }
// };




module.exports = { register, login,makePayment, getUserInfo};
