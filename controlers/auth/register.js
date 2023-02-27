const {User} = require("../../schemas/schemas");
const {Conflict} = require("http-errors");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");
const { sendEmail } = require("../../helpers");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`User with ${email} already exist`);
  }
  const avatarURL = gravatar.url(email);
  const verificationToken = nanoid();
  const newUser = new User({ email, avatarURL, verificationToken});

  newUser.setPassword(password);

  await newUser.save();
  
  const mail = {
    to: email,
    from: "Kovbasiukvitalina@gmail.com",
    subject: "Verification email",
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Confirm email</a>`
  }

  await sendEmail(mail);

  res.status(201).json({
    RequestBody: {
      email,
      subscription: "starter",
      avatarURL,
      verificationToken,
    },
  });
  console.log(`user ${email}, successfully created!`);
};

module.exports = register;