const { NotFound } = require("http-errors");

const { Contact } = require("../../schemas/schemas");
const ObjectId = require("mongodb").ObjectId;

const deleteById = async (req, res) => {
  const owner = req.user._id;
  const id = ObjectId(req.params.contactId);

  const result = await Contact.findOneAndRemove({owner, _id });
  if (!result) {
    throw new NotFound(`Contact with id=${_id} not found`);
  }
  res.json(result);
};

module.exports = deleteById;