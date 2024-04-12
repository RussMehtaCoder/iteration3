const User = require("../models/user");
const admin = require("../utils/firebaseAdmin");

const createUserInFirebase = async ({ email, password }) => {
  try {
    const userRecord = await admin.auth().createUser({
      email,
      password,
    });
    return userRecord;
  } catch (error) {
    console.error("Error creating user in Firebase", error);
    throw error;
  }
};

const createUserInMongo = async ({
  firstName,
  lastName,
  email,
  role,
  fireBaseId,
}) => {
  try {
    const user = new User({
      firstName,
      lastName,
      email,
      role,
      fireBaseId,
    });
    return await user.save();
  } catch (error) {
    console.error("Error creating user in MongoDB", error);
    throw error;
  }
};

module.exports.createUser = async (req, res) => {
  console.log(req.body);
  const { firstName, lastName, password, email, role } = req.body;

  try {
    const userSaved = await createUserInFirebase({ email, password });
    const userRecord = await createUserInMongo({
      firstName,
      lastName,
      email,
      role,
      fireBaseId: userSaved.uid,
    });
    res.status(201).json(userRecord);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "An error occurred while creating your account. Please try again.",
    });
  }
};

module.exports.getUserFirebaseUID = async (req, res) => {
  res.status(200).json(req.user);
};

module.exports.getMembers = async (req, res) => {
  //fetch all users with role member
  const members = await User.find({ role: "member" }).select(
    "firstName lastName email lateStatus"
  );
  res.json(members);
};

module.exports.getCoaches = async (req, res) => {
  //fetch all users with role coach
  const members = await User.find({ role: "coach" }).select(
    "firstName lastName email"
  );
  res.json(members);
};
