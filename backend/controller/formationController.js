
const express = require('express')

const passport = require('passport');
const router = express.Router()
const {Formation, validate} = require("../model/formationModel.js");



// Get All formation from database
router.get('/formation', passport.authenticate("bearer", { session: false }),async (req, res) => {

    console.log('controller');
    const formation = await Formation.find();
    res.json(formation);
});

// Get All formation from database
router.get('/nombreformation', passport.authenticate("bearer", { session: false }),async (req, res) => {
    var query = Formation.find();
query.count(function (err, count) {
    if (err) console.log(err)
    else  res.json(count);
});
   
});
// Get Single formation from by ID from database
router.get('/formation/:id', passport.authenticate("bearer", { session: false }), async (req, res) => {
    const formation = await Formation.findById(req.params.id);
    res.json(formation);
});

// add formation
router.post('/formation', passport.authenticate("bearer", { session: false }), async (req, res) => {

    const formation= await new Formation({
        title:req.body.title,
        type_formation:req.body.type_formation,
        nb_session:req.body.nb_session,
        duree:req.body.duree,
        domaine:req.body.domaine,
        budget:req.body.budget 
    }).save();
    
    res.json(formation)
    });

//delete formation
router.delete('/formation/:id', passport.authenticate("bearer", { session: false }), async (req, res) => {
    const formationId= { _id: (req.params.id) };
   const formation=await Formation.findByIdAndDelete(formationId);

   res.json(formation)
});

// update formation

router.put('/formation/:id', passport.authenticate("bearer", { session: false }), async (req, res) => {
    const formationId= { _id: (req.params.id) };
    const formation={
        title:req.body.title,
        type_formation:req.body.type_formation,
        nb_session:req.body.nb_session,
        duree:req.body.duree,
        domaine:req.body.domaine,
        budget:req.body.budget 
    }
    await Formation.findByIdAndUpdate(formationId,formation)
    res.json(formation)
 });

 module.exports = router;