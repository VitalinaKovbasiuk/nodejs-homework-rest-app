const { Contact } = require("../../schemas/schemas");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  const { _id } = ObjectId(req.user);
  
  const { page = 1, limit = 20 } = req.query;
   const skip = (page - 1) * limit;
  const contacts = await Contact.find({owner: _id}, "", {skip, limit: Number(limit)}).populate("owner", "_id name email");
  res.json({
    status: "success",
    code: 200,
    data: {
      result: contacts
    }
  });
};

module.exports = getAll;