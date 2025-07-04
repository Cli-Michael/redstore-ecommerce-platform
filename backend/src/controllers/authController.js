const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const sendEmail = require('../utils/mailer');

const tempUsers = {};

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

const initiateRegistration = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    if (!email || !username || !password) {
      return res.status(400).json({ error: 'Email, username, and password are required.' });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ error: 'Email already registered.' });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already taken. Please choose a different one.' });
    }

    const otp = generateOTP();
    const otpExpires = Date.now() + 10 * 60 * 1000;
    const hashedPassword = await bcrypt.hash(password, 10);

    tempUsers[email] = {
      username,
      hashedPassword,
      otp,
      otpExpires,
    };

    await sendEmail(email, 'Email Verification OTP', `Your OTP is: ${otp}`);

    res.status(200).json({ message: 'OTP sent to your email. Complete registration to proceed.' });
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
};

const completeRegistration = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ error: 'Email and OTP are required.' });
    }

    const tempUserData = tempUsers[email];
    if (!tempUserData) {
      return res.status(400).json({ error: 'No registration found for this email or OTP expired.' });
    }

    const { username, hashedPassword, otp: savedOtp, otpExpires } = tempUserData;

    if (otp !== savedOtp || Date.now() > otpExpires) {
      return res.status(400).json({ error: 'Invalid or expired OTP.' });
    }

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      isEmailVerified: true,
    });

    await newUser.save();
    delete tempUsers[email];

    res.status(201).json({ message: 'User registered successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required.' });
    }

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials.' });
    }

    if (!user.isEmailVerified) {
      return res.status(400).json({ error: 'Email is not verified.' });
    }

    if (!user.password) {
      return res.status(500).json({ error: 'User password is missing.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid credentials.' });
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ error: 'Server configuration error.' });
    }

    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    if (!req.session) {
      return res.status(200).json({
        message: 'Login successful.',
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
        },
      });
    }

    req.session.userId = user._id.toString();
    req.session.save(err => {
      if (err) {
        return res.status(500).json({ error: 'Session save failed.' });
      }

      return res.status(200).json({
        message: 'Login successful.',
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
        },
      });
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
};

const checkUsernameAvailability = async (req, res) => {
  try {
    const { username } = req.body;
    const user = await User.findOne({ username });
    return res.json({ available: !user });
  } catch (error) {
    return res.status(500).json({ available: false });
  }
};

const checkEmailAvailability = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    return res.json({ available: !user });
  } catch (error) {
    return res.status(500).json({ available: false });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    const otp = generateOTP();
    user.otp = otp;
    user.otpExpires = Date.now() + 10 * 60 * 1000;
    await user.save();

    await sendEmail(email, "Reset your password", `Your OTP is: ${otp}`);

    res.status(200).json({ message: "OTP sent to your email" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || user.otp !== otp || Date.now() > user.otpExpires) {
      return res.status(400).json({ error: "Invalid or expired OTP" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    res.status(200).json({ message: "Password reset successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  initiateRegistration,
  completeRegistration,
  login,
  forgotPassword,
  resetPassword,
  checkUsernameAvailability,
  checkEmailAvailability,
};
