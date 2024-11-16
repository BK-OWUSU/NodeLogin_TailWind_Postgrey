// passport-config.js
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const userService = require('./service/user.service');

function initialize(passport) {
    const authenticateUser = async (email, password, done) => {
        const user = await userService.getUserByEmail(email);
        if (!user) {
            return done(null, false, { message: 'No user with that email' });
        }

        try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'Password incorrect' });
            }
        } catch (err) {
            return done(err);
        }
    };

    passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser));
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport.deserializeUser(async (id, done) => {
        const user = await userService.findById(id); // Modify to fetch user by ID
        done(null, user);
    });
}
module.exports = initialize;