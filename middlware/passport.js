const  JwtStrategy = require("passport-jwt").Strategy;
const User = require("../Models/User");

const  ExtractJwt = require("passport-jwt").ExtractJwt;
const  passport = require("passport");
const opts = {
jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
secretOrKey : process.env.SectretOrKey,
};
passport.use(
    new JwtStrategy(opts, async(jwt_payload, done) => {
        try {
            const user = await User.findOne({ _id: jwt_payload._id})
            user ? done(null,user) : done(null, false);
        } catch (error) {
            console.log(error);
        }
    }));



    module.exports = isAuth = () => 
    passport.authenticate("jwt",{ session: false });