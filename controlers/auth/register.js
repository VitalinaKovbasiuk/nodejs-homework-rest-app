const {User} = require("../../schemas/schemas");
const {Conflict} = require("http-errors");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`User with ${email} already exist`);
  }
  const newUser = new User({ email });
  newUser.setPassword(password);
  newUser.save();
  res.status(201).json({
    RequestBody: {
      email,
      subscription: "starter",
    },
  });
  console.log(`user ${email}, successfully created!`);
};

module.exports = register;