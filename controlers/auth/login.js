const { User } = require("../../schemas/schemas");
const { Unauthorized } = require("http-errors");
const { SECRET_KEY } = process.env;
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !user.verify || !user.comparePassword(password)) {
    throw new Unauthorized("Email is wrong or not verify, or password is wrong");
  }

  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    token,
    user: {
      email,
      subscription: "starter",
    },
  });
};

module.exports = login;