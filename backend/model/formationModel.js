const mongoose = require('mongoose');

const formationSchema=mongoose.Schema({
    title:{
       type: String,
    },
    type_formation:{
        type: String,
     },
    nb_session:{
        type: Number,
     },
    duree:{
        type: String,
     },
     annee:{
        type: String,
     },
    domaine:{
        type: String,
     },
    budget:{
        type: Number,
     }},
     {
        versionKey: false,
        timestamps: true
    });
const  Formation=mongoose.model('formation',formationSchema,'formation')
const validate = (Formation) => {
    const formationSchema = Joi.object({
        title: Joi.string().required(),
        nb_session: Joi.number().required(),
        duree: Joi.string().required(),
        budget: Joi.number().required(),
        annee: Joi.number().required(),
        domaine: Joi.string().required(),
        type_formation: Joi.string().required(),
    });
    return formationSchema.validate(Formation);
};

module.exports = { Formation, validate };
