const express = require("express");
const router = express.Router();

const { auth, ctrlWrapper } = require("../../middlewares");
const { user: ctrl } = require("../../controlers");

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));
    
module.exports = router;
