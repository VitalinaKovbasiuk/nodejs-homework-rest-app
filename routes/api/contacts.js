const express = require("express");
const { validation, ctrlWrapper, auth } = require("../../middlewares");
const router = express.Router();
const {
  contactsSchema,
  contactsUpdateSchema,
  favoriteSchema,
} = require("../../schemas/schemas");
const { contacts: ctrl } = require("../../controlers");

router.get("/", auth, ctrlWrapper(ctrl.getAll));

router.get("/:contactId", auth, ctrlWrapper(ctrl.getById));

router.post("/", auth, validation(contactsSchema), ctrlWrapper(ctrl.add));

router.delete("/:contactId", auth, ctrlWrapper(ctrl.deleteById));

router.put("/:contactId", auth, validation(contactsUpdateSchema), ctrlWrapper(ctrl.updateById));

router.patch("/:contactId/favorite", auth, validation(favoriteSchema), ctrlWrapper(ctrl.updateStatus));

module.exports = router;
