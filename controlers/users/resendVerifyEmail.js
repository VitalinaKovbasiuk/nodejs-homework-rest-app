const { User } = require("../../schemas/schemas");
const { NotFound } = require("http-errors");
const { sendEmail } = require("../../helpers");

const resendVerifyEmail  = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throw NotFound();
    }
    if (user.verify) {
        throw NotFound("User already verify");
    }
    const mail = {
    to: email,
    from: "Kovbasiukvitalina@gmail.com",
    subject: "Verification email",
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${user.verificationToken}">Confirm email</a>`
    }
    await sendEmail(mail);

    res.json({
        "message": "Verification email sent"
    })
}

module.exports = resendVerifyEmail;