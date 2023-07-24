const express = require('express');

const passport = require('passport');
const router = express.Router()
const {Session, validate} = require("../model/sessionFormationModel.js");
const { User } = require('../model/userModel');
const {Formation} = require("../model/formationModel.js");
// Get All session from database
router.get('/session', passport.authenticate("bearer", { session: false }), async (req, res) => {
    let formations= await Formation.find();
    let users=  await User.find();
     let sessions= await Session.find();
     console.log(sessions);
     res.json({sessions:sessions,formations:formations,users:users});
});


// Get Single session from by ID from database
router.get('/session/:id', passport.authenticate("bearer", { session: false }),  async (req, res) => {
    const sessionId= { _id: (req.params.id) };
    const session= await Session.findById(sessionId);
   res.json(session)
   
});

// add session
router.post('/session', passport.authenticate("bearer", { session: false }), async (req, res) => {
console.log(req.body);
    const  session= new Session({
        formateur:req.body.formateur,
        formation:req.body.formation,
        organisme:req.body.organisme,
        lieu:req.body.lieu,
        date_debut:req.body.date_debut,
        date_fin:req.body.date_fin,
       
 })
    await session.save();
    res.json(session)
});

//delete session
router.delete('/session/:id', passport.authenticate("bearer", { session: false }), async (req, res) => {
    const sessionId= { _id: (req.params.id) };
   const session=await Session.findByIdAndDelete(sessionId);

   res.json(session)
});

// update session

router.put('/session/:id', passport.authenticate("bearer", { session: false }), async (req, res) => {
    const sessionId= { _id: (req.params.id) };
    const session={
        formateur:req.body.formateur,
        formation:req.body.formation,
        organisme:req.body.organisme,
        lieu:req.body.lieu,
        date_Debut:req.body.date_Debut,
        date_Fin:req.body.date_Debut,
        nb_participant:req.body.nb_participant  
    }
    await Session.findByIdAndUpdate(sessionId,session)
    res.json(session)
 });

 module.exports = router;