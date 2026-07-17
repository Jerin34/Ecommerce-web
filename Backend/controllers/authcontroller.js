const bcrypt = require("bcrypt");
const User = require("../models/User");
const jsonwebtoken = require("jsonwebtoken");

const registerUser = async (req, res) => {
  console.log('logging')
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Please Provide All Required Fields" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User Already Exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    return res.status(201).json({ message: "User Registered SuccessFully" });
  } catch (error) {
    return res
      .status(500)
      .json({
        message: "An error occurred while registering the user",
        error: error.message,
      });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide all required Fields" }); //validation
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    const token = jsonwebtoken.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_TOKEN,
      { expiresIn: "7d" },
    );
    return res
      .status(200)
      .json({ message: "User Logged In Successfully", token });
  } catch (error) {
    return res
      .status(500)
      .json({
        message: "An error occurred while logging in the user",
        error: error.message,
      });
  }
};
module.exports = { registerUser, loginUser };
