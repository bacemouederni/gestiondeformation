const mongoose = require('mongoose');
const Joi = require("joi");

const userSchema=mongoose.Schema({
    cin:{
        type:Number,
    },
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        index: true,
        unique: true,
        sparse: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'admin'
    },
    profil: {
        type:String,
   },
    telephone: {
        type: Number
    },
  

},{
    versionKey: false,
    timestamps: true
})
const User = mongoose.model("user", userSchema, 'user');
const validate = (user) => {
    const schema = Joi.object({
        cin: Joi.number().required(),
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        role: Joi.string().default('admin'),
        profil: Joi.string(),
        telephone: Joi.number().required(),
    });
    return schema.validate(user);
};

module.exports = { User, validate };