const { Contact } = require("../../schemas/schemas");

const { NotFound } = require("http-errors");
const ObjectId = require("mongodb").ObjectId;

const updateById = async (req, res) => {
   const owner = req.user._id;
  const _id = ObjectId(req.params.contactId);

  const result = await Contact.findOneAndUpdate({ owner, _id },  { $set: req.body }, {
    new: true,
  });
  if (!result) {
    throw new NotFound(`Product with id=${_id} not found`);
  }
  res.json(result);
};

module.exports = updateById;