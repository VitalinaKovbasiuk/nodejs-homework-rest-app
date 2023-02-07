const { NotFound } = require("http-errors");

const { Contact } = require("../../schemas/schemas");

const getById = async (req, res) => {
  const { contactId } = req.params;

  const result = await Contact.findById(contactId);

  if (!result) {
    throw NotFound(`Contact with id=${contactId} not found`);
  }
  res.json(result);
};

module.exports = getById;