const express = require("express");
const router = express.Router();

const { auth, upload, ctrlWrapper } = require("../../middlewares");
const { user: ctrl } = require("../../controlers");

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));
router.patch("/avatars", auth, upload.single("avatar"), ctrlWrapper(ctrl.updateAvatar));  

module.exports = router;
