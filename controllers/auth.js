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

const getMemberList = async (req, res, next) => {


  const token = req.headers.authorization?.split(' ')[1];
  req.user = await backendAuth.authenticateToken(token);


  if (req.user.role == "treasurer") {
    var finalJson = [];

    const documents = await User.find({});

    
    for (let i = 0; i < documents.length; i++) {
      var tempJson = {};
      tempJson.userData = documents[i];

      var payment =  await Payment.find({ firstName: documents[i].firstName, lastName: documents[i].lastName });
      console.log( 'payment is' , payment)

      if (payment) {
        tempJson.paymentData = payment;
      } else {
        tempJson.paymentData = [];
      }

      finalJson.push(tempJson);
      // tempJson.paymentData

      // console.log(`Document ${i}:`, documents[i]); // Process each document
      // You can perform operations on each document here using documents[i]
    }

    res.finalReturn = finalJson;
    next();

    // console.log(`The final data struct is ${JSON.stringify(finalJson)}`);




  
  } else {
        res.status(401).json({ message: "Not a treasurer, cannot use" });

  }


};


const sendMessage = async (req, res, next) => {


  const token = req.headers.authorization?.split(' ')[1];
  req.user = await backendAuth.authenticateToken(token);


  if (req.user.role == "treasurer") {

    const {firstName, lastName, message} = req.body;


    var receipient = await User.findOne({ firstName: firstName, lastName: lastName });

    console.log(receipient)

    receipient.messages.push(message);

    receipient.save();

    req.messageData = {firstName: firstName, lastName: lastName, message: `${message} sent to ${firstName} ${lastName}`}

    // res.finalReturn = finalJson;
    next();
  
  } else if (req.user.role == "coach"){
    const {message} = req.body;

    var userResults = await User.find({});

    for (var user of userResults) {
      if (user.role == "coach") {
        continue;
      }
      user.messages.push(message);
      user.save();
    }

    req.messageData = {message: `${message} sent to all members`}

    // res.finalReturn = finalJson;
    next();
  
  
  // res.status(401).json({ message: "Not a treasurer, cannot use" });

} else {
    res.status(401).json({ message: "Not a treasurer or coach, cannot use" });

}




}



const getStatement = async (req, res, next) => {


  const token = req.headers.authorization?.split(' ')[1];
  req.user = await backendAuth.authenticateToken(token);


  if (req.user.role == "treasurer") {
    var finalJson = [];

    const documents = await Payment.find({});
    var paidCount = 0;
    var practicePrice = 20;
    var hallCost = 200;
    var coachCost = 50;
    var finalData = {};
    

    var revenueObj = {practiceCount: 0, price: 20, total: 0};
    
    var costObj = {hallCost: false, coachCost: false};

    var netIncome =0 ;
    // {
    //   // revenue:
    //       //  {
    //         // count: count 
    //         // price: 20
    //         // total: count*price
    //       //  },

    //       // cost: {
    //         // hallCost: true or false
    //         // coachCost: true or false
            
    //       // }

    // }
    for (let i = 0; i < documents.length; i++) {



      if (documents[i].paid) {
         if (documents[i].paymentTitle == "Coach") {
          costObj.coachCost = 50;
         }

         if (documents[i].paymentTitle == "Hall") {
          costObj.hallCost = 200;
         }

         if (documents[i].paymentTitle == "Practice") 
         {
          revenueObj.practiceCount = revenueObj.practiceCount + 1;
          revenueObj.total += 20;
         }
      }






      //  if (document[i].paymentTitle == "Coach") {

      //  } 
      // var tempJson = {};
      // tempJson.userData = documents[i];

      // var payment =  await Payment.find({ firstName: documents[i].firstName, lastName: documents[i].lastName });
      // console.log( 'payment is' , payment)

      // if (payment) {
      //   tempJson.paymentData = payment;
      // } else {
      //   tempJson.paymentData = [];
      // }

      // finalJson.push(tempJson);
      // // tempJson.paymentData

      // console.log(`Document ${i}:`, documents[i]); // Process each document
      // You can perform operations on each document here using documents[i]
    }


    netIncome = revenueObj.total;

    if (costObj.hallCost) {
      netIncome -=  200;


    }

    if (costObj.coachCost) {
      netIncome -=  50;
    }


    finalData.revenue = revenueObj;
    finalData.cost = costObj;
    finalData.netIncome = netIncome;

    req.finalData = finalData;


    // console.log(req.finalData);


    // res.finalReturn = finalJson;
    next();

    // console.log(`The final data struct is ${JSON.stringify(finalJson)}`);




  
  } else {
        res.status(401).json({ message: "Not a treasurer, cannot use" });

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




module.exports = { register, login,makePayment, getUserInfo, getMemberList, sendMessage, getStatement};
