const mongoose = require('mongoose');


const sessionFormation=mongoose.Schema({
    formateur:{type: mongoose.Schema.Types.ObjectId, ref:'User'},
    formation:{type: mongoose.Schema.Types.ObjectId, ref:'Formation'},
    organisme:{
        type: String,
     },
    lieu:{
        type: String,
     },
     date_debut:{
        type: String,
     },
     date_fin:{
        type: String,
     },
    

     
})
const  Session=mongoose.model('session',sessionFormation,'session')
const validate = (Session) => {
    const sessionFormation = Joi.object({
        formateur: Joi.required(),
        formation: Joi.required(),
        organisme: Joi.string().required(),
        lieu: Joi.number().required(),
        date_debut: Joi.string().required(),
        date_fin: Joi.string().required(),
       
        
    });
    return sessionFormation.validate(Session);
};

module.exports = Session;validate;
