const { Contact } = require("../../schemas/schemas");
const ObjectId = require('mongodb').ObjectId

const add = async (req, res) => {
  const { _id } = ObjectId(req.user);
  
  const result = await Contact.create({...req.body, owner: _id});
  res.status(201).json(result);
};

module.exports = add;