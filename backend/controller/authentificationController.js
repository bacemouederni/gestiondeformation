const express = require('express')
const jwt = require("jsonwebtoken")
const bcrypt = require('bcryptjs')
const passport = require('passport');
// model users
const { User, validate } = require('../model/userModel')
const router = express.Router()

// Register new User
router.post('/user', passport.authenticate("bearer", { session: false }),
async (req, res) => {
    // verify validation format
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    else {
        // 0. verify if is unique mail in the database
        const userFound = await User.findOne({ email: req.body.email });
        if (userFound !== null) {
            return res.status(400).json({ message: 'E-mail address is already used!' });
        }
        // 1. Hash the password 
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        // 2. save the hash in the password
        const userData = req.body;
        userData.password = hash;
        // 3. save in the mongodb database
        const createdUser = await User.create(userData);
        //4. send response
        res.json(createdUser);
    }
});

// add new Formateur
router.post('/addFormateur',passport.authenticate("bearer", { session: false }),
 async (req, res) => {
    // verify validation format
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    else {
        // 0. verify if is unique mail in the database
        const userFound = await User.findOne({ email: req.body.email });
        if (userFound !== null) {
            return res.status(400).json({ message: 'E-mail address is already used!' });
        }
        // 1. Hash the password 
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        // 2. save the hash in the password
        const userData = req.body;
        userData.password = hash;
        userData.role = "formateur";
        // 3. save in the mongodb database
        const createdUser = await User.create(userData);
        //4. send response
        res.json(createdUser);
    }
});

// add new Participant
router.post('/addParticipant', passport.authenticate("bearer", { session: false }),
async (req, res) => {
    // verify validation format
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    else {
        // 0. verify if is unique mail in the database
        const userFound = await User.findOne({ email: req.body.email });
        if (userFound !== null) {
            return res.status(400).json({ message: 'E-mail address is already used!' });
        }
        // 1. Hash the password 
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        // 2. save the hash in the password
        const userData = req.body;
        userData.password = hash;
        userData.role = "participant";
        // 3. save in the mongodb database
        const createdUser = await User.create(userData);
        //4. send response
        res.json(createdUser);
    }
});

// Login user
router.post('/login', async (req, res) => {
    const connectedUser = await User.findOne({ email: req.body.email });
    if (connectedUser === null) {
        return res.status(404).json({ message: 'email or password is invalid!' });
    }
    else {
        // 0. verify if the same password
        if (!bcrypt.compareSync(req.body.password, connectedUser.password)) {
            return res.status(404).json({ message: 'email or password is invalid!' });
        }
        else {
            // 1. create a jwt token
            const data = {
                email: connectedUser.email,
                userId: connectedUser._id,
                role: connectedUser.role,
            };
            const createdToken = jwt.sign(data, 'secret', { expiresIn: "1d" });
            // 2. send response
            return res.status(201).json({ message: 'login successfully!', token: createdToken });
        }
    }
});

router.get('/user', passport.authenticate("bearer", { session: false }),
async (req, res) => {
    const users = await User.find();
    res.json(users);
});


// Get Single user from by ID from database
router.get('/user/:id', async (req, res) => {
    const user = await User.findById(req.params.id);
    res.json(user);
});


// Update user by ID in the database
router.put('/user/:id',passport.authenticate("bearer", { session: false }),
async (req, res) => {
    try {
       
        if (req.body.password != null) {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(req.body.password, salt);
            // 2. save the hash in the password
            const userData = req.body;
            userData.password = hash;
            const updateduser = await User.findByIdAndUpdate(req.params.id, userData, { new: true });
            res.json(updateduser);
        }
        else {
            const updateduser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.json(updateduser);
        }
    } catch (err) {
        console.log(err);
    }



});

// Delete user By ID from the database
router.delete('/user/:id',passport.authenticate("bearer", { session: false }),
async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'user deleted successfully!' });
});

// Get Single user from by ID from database
router.get('/user/:id',passport.authenticate("bearer", { session: false }),
async (req, res) => {
    const user = await User.findById(req.params.id);
    res.json(user);
});
// get formateur
router.get('/getFormateur',passport.authenticate("bearer", { session: false }),
async (req, res) => {
    const user = await User.find({ role: 'formateur'}).exec();
    res.json(user);
});

// get nombre formateur
router.get('/nombreFormateur',passport.authenticate("bearer", { session: false }),
async (req, res) => {
    const user = await User.find({ role: 'formateur'}).exec();
    res.json(user.count());
});
// get nombre participant
router.get('/getParticipant',passport.authenticate("bearer", { session: false }),
async (req, res) => {
    const user = await User.find({ role: 'participant'}).exec();
    res.json(user);
});
// get nombre participant
router.get('/nombreParticipant',passport.authenticate("bearer", { session: false }),
async (req, res) => {
    const user = await User.find({ role: 'participant'}).exec();
    res.json(user.count());
});
module.exports = router;