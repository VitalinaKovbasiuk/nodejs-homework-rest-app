const { NotFound } = require("http-errors");

const { Contact } = require("../../schemas/schemas");
const ObjectId = require("mongodb").ObjectId;

const getById = async (req, res) => {
  const owner = req.user._id;
  const _id = ObjectId(req.params.contactId);

  const result = await Contact.findOne({ owner, _id });

  if (!result) {
    throw NotFound(`Contact with id=${_id} not found`);
  }
  res.json(result);
};

module.exports = getById;