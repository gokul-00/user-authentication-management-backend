const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const User = require("../models/User");
const { encrypt, decrypt } = require("../utils/crypto");
const { secret } = require("../config/keys");
const {
  validateLogin,
  validateSignup,
  validateReset,
  validateUpdate,
} = require("../middlewares/validate");
const { checkAuth } = require("../middlewares/auth");

router.post("/signup", validateSignup, async (req, res) => {
  try {
    const { email, mobile, name, password } = req.body;
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Encrypt PII data
    let encryptedMobile = encrypt(mobile);
    let encryptedName = encrypt(name);

    // Create the new user
    const newUser = new User({
      email: email,
      mobile: encryptedMobile,
      name: encryptedName,
      password: hashedPassword,
    });
    await newUser.save();
    return res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Error creating user" });
  }
});

router.post("/reset-password", validateReset, async (req, res) => {
  try {
    const { email, oldPassword, newPassword } = req.body;
    // Find the user by email
    const user = await User.findOne({ email });
    // Compare the hashed old password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid old password" });
    }
    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    // Update the password in the database
    user.password = hashedPassword;
    await user.save();
    res.status(201).json({ message: "Password reset successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error resetting password" });
  }
});

router.post("/login", validateLogin, async (req, res) => {
  try {
    const { email, password } = req.body;
    // Find the user by email
    const user = await User.findOne({ email });

    console.log(user);
    // Compare the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    // Create the payload for the JWT
    const payload = {
      userId: user._id,
      email: user.email,
      mobile: user.mobile,
    };
    // Sign the JWT
    const token = jwt.sign(payload, secret);
    return res.status(200).json({ token });
  } catch (err) {
    return res.status(500).json({ message: "Error logging in" });
  }
});

router.put("/update-details", checkAuth, validateUpdate, async (req, res) => {
  try {
    const { mobile, name } = req.body;
    // Find the user by id
    const user = await User.findById(req.userId);
    // Encrypt the new PII data
    let encryptedMobile = encrypt(mobile);
    let encryptedName = encrypt(name);
    user.mobile = encryptedMobile;
    user.name = encryptedName;
    await user.save();
    return res
      .status(201)
      .json({ message: "User details updated successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Error updating user details" });
  }
});

router.get("/user-details", checkAuth, async (req, res) => {
  try {
    // Find the user by id
    const user = await User.findById(req.userId);

    const userDetails = {
      email: user.email,
      mobile: decrypt(user.mobile),
      name: decrypt(user.name)
    }
    return res
      .status(201)
      .json(userDetails);
  } catch (err) {
    return res.status(500).json({ message: "Error updating user details" });
  }
});

module.exports = router;
