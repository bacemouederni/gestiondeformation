const mongoose = require('mongoose');

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

mongoose.connect(process.env.MONGO_URI, options)
.then((success) => {
    console.log("=> Successfully connection to database")
}).catch((error) => {
    console.log(process.env.MONGO_URI);
     console.log("=> Connect with error",error) 
});
