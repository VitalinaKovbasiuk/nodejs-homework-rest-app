const path = require("path");
const fs = require("fs/promises");
const { User } = require("../../schemas/schemas");
const { v4: uuidv4 } = require("uuid");

const avatarDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
    const { path: tempUpload, originalname } = req.file;
    const { _id: id } = req.user;
    const imageName = `${id}_${originalname}+${uuidv4()}`;
    try {
        const resultUpload = path.join(avatarDir, imageName);  
        await fs.rename(tempUpload, resultUpload); 
        const avatarURL = path.join("public", "avatars", imageName);
        await User.findByIdAndUpdate(req.user._id, { avatarURL });
        res.json({avatarURL});
    } catch (error) {
        await fs.unlink(tempUpload); 
        throw error;
    }
}

module.exports = updateAvatar;