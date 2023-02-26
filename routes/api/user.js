const express = require("express");
const router = express.Router();
const {verifyEmailSchema} = require("../../schemas/schemas");
const { auth, upload, ctrlWrapper, validation } = require("../../middlewares");
const { user: ctrl } = require("../../controlers");

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));
router.patch("/avatars", auth, upload.single("avatar"), ctrlWrapper(ctrl.updateAvatar));  
router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verifyEmail));
router.post("/verify", validation(verifyEmailSchema), ctrlWrapper(ctrl.resendVerifyEmail));

module.exports = router;
