const User = require("../models/User");
const bcrypt = require("bcrypt");
const createError = require("../utils/error");
const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
  try {
    const hashedpassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      ...req.body,
      password: hashedpassword,
    });
    await newUser.save();
    res.status(200).send("User has been created");
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {

    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return next(createError("404", "User not found!"));
    }
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) {
      return next(createError("400", "Wrong password or username"));
    }

    const access_token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "3d" }
    );

    const { password, ...otherDetails } = user._doc;

    res.status(200).json({ ...otherDetails, access_token });
  } catch (error) {
    next(err);
  }
};

module.exports = { register, login };
