const passport = require("passport");
const BearerStrategy = require("passport-http-bearer").Strategy;
 const { User, validate } = require("../../model/userModel");
const jwt = require("jsonwebtoken");


// 2ème manière ( en utilisant les callback functions)
// méthode utilisé dans la documentation : https://www.npmjs.com/package/passport-http-bearer
passport.use(new BearerStrategy(async (token, done) => {
  try {
    const decodedData = await jwt.verify(token, 'secret');
    const user = await User.findById(decodedData.userId)
    //if (err) { return done(err); }
    if (!user) { return done(null, false); }
    return done(null, user, { scope: 'all' });

  }
  catch (error) {
    console.log(error);
    return done(null, false);
  }
}
));