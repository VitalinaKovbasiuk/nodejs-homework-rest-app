const express = require("express");

const router = express.Router();
const createError = require("http-errors");
const contactOperations = require("../../models/contacts");
const Joi = require('joi');

const contactsSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
})

const contactsUpdateSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
})

router.get("/", async (req, res, next) => {
  try {
    const contacts = await contactOperations.listContacts();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactOperations.getContactById(contactId);
    if (!result) {
      throw createError(404, `Contact with id=${contactId} not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      throw createError(400, `Missing required name field`);
    }
    const { name, phone, email } = req.body;
  const dataId = { id: uuidv4(), name, email, phone  }
    const result = await contactOperations.addContact(dataId);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactOperations.removeContact(contactId);
    if (!result) {
      throw createError(404, `Contact with id=${contactId} not found`);
    }
    res.json({
      status: "success",
      code: 200,
      message: "contact deleted",
      data: {
        result
      }
    });
  } catch (error) {
    next(error);
  }
});


router.put("/:contactId", async (req, res, next) => {
  try {
     const { error } = contactsUpdateSchema.validate(req.body);
    if (error) {
      throw createError(400, `Missing fields`);
    }
    const { contactId } = req.params;
    const data = req.body;
    const result = await contactOperations.updateContact(contactId, data);
    if (!result) {
      throw createError(404, `Not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
