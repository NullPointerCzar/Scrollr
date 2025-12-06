import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

export const registerUser = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    // Check email exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Check username exists
    const userNameExists = await User.findOne({ username });
    if (userNameExists) {
      return res.status(400).json({ message: "Username already taken" });
    }

    // Create user
    const user = await User.create({ username, email, password});

    if (user) {
      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const authUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.findOne({ username, email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        token: generateToken(user._id),
      });
      console.log("Logged in")
    } else {
      console.log("Invalid username or password")
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
