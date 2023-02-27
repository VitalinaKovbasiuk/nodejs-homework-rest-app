const Joi = require("joi");
const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const contactsSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean().default(false),
});

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
     owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

const Contact = model("contact", contactSchema);

const contactsUpdateSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
  favorite: Joi.boolean(),
});

const favoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const userSchema = Schema(
  {
  password: {
    type: String,
    required: [true, 'Set password for user'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter"
  },
    token: {
      type: String,
      default: null,
  },
    avatarURL: {
    type: String,
  },
    verify: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    required: [true, 'Verify token is required'],
  },
},
  { versionKey: false, timestamps: true }
);

userSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password)
}

const User = model("user", userSchema);

const joiRegisterSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().required(),
  subscription: Joi.string().required(),
});

const verifyEmailSchema = Joi.object({
  email: Joi.string().required(),
});

const joiLoginSchema = Joi.object({
  password: Joi.string(),
  email: Joi.string().min(6),
  subscription: Joi.string(),

});



module.exports = {
  contactsSchema,
  contactsUpdateSchema,
  favoriteSchema,
  Contact,
  User,
  joiRegisterSchema,
  joiLoginSchema,
  verifyEmailSchema,
};