const User = require("../models/user");

module.exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const user = new User({ name, email, role });
    const registeredUser = await User.register(user, password);

    req.login(registeredUser, (err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Login after signup failed",
        });
      }

      return res.status(201).json({
        success: true,
        message: "Signup successful",
        user: {
          id: registeredUser._id,
          name: registeredUser.name,
          email: registeredUser.email,
          role: registeredUser.role,
        },
      });
    });
  } catch (e) {
    return res.status(400).json({
      success: false,
      message: e.message || "Signup failed",
    });
  }
};
