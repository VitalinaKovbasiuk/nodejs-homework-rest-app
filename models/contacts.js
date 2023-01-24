const fs = require("fs/promises");
const path = require("path");

const { v4 } = require("uuid");

 const contactsPath = path.join(__dirname, "contacts.json");

const updateContacts = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, "\t"));
};

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
  } catch (err) {
    console.log(err.message);
  }
}

const getContactById = async (contactId) => {
   try {
    const contacts = await listContacts();
    const result = contacts.find((item) => item.id === contactId);
    if (!result) {
      return null;
    }
    return result;
  } catch (err) {
    console.log(err.message);
  }
}

const removeContact = async (contactId) => {
   try {
   const contacts = await listContacts();
  const item = contacts.findIndex((contact) => contact.id === contactId);
  if (item === -1) {
    return null;
  }
  const [removeContact] = contacts.splice(item, 1);
  await updateContacts(contacts);
  return removeContact;
  } catch (error) {
    console.log("removeContact", error);
  }
}

const addContact = async ({ name, email, phone }) => {
  try {
    const contacts = await listContacts();
    const newContacts = { name, email, phone, id: v4() };
    contacts.push(newContacts);
    await updateContacts(contacts);
    return newContacts;
  } catch (err) {
    console.log(err.message);
  }
};

const updateContact = async (id, body) => {
   const contacts = await listContacts();
  const item = contacts.findIndex((contact) => contact.id === id);

  if (item === -1) {
    return null;
  }

  contacts[item] = { ...contacts[item], ...body };
  await updateContacts(contacts);
  return contacts[item];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
