const { NotFound } = require("http-errors");

const { Contact } = require("../../schemas/schemas");



const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  const result = await Contact.findByIdAndUpdate(contactId, {favorite}, {
    new: true,
  });

  if (!result) {
    throw new NotFound(`message": "missing field favorite`);
  }
  res.json(result);
};

module.exports = updateStatusContact;