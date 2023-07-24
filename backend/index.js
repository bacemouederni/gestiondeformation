const bodyparser = require("body-parser");
const express = require('express');
const cors = require('cors');
const path = require('path');
//const connectDB = require('./config/db.js');
require('dotenv').config({path:"config.env"});

const app = express()
const port= 3001;

app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.json())
app.use(bodyparser.json())

// passport strategy
require('./config/passport/passport');

//connect to database
require('./config/db');
require('./config/seed/seed');

const authApi = require('./controller/authentificationController');
const formation = require('./controller/formationController');
const session = require('./controller/sessionController');


app.listen(port, function () {
    console.log(`server running in http://localhost:${port}`);
});

app.use(cors({origin:'*'}))
app.use(bodyparser.json());
app.use(cors()) 
app.use('/api/v1', authApi);
app.use('/api/v1', formation);
app.use('/api/v1', session);