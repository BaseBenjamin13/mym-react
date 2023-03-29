const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');


function initialize(passport, getUserByUserName, getUserById) {
    const authenticateUser = async (userName, password, done) => {
        const user = getUserByUserName(userName)
        if (user == null) {
            return done(null, false, { message: 'No user with that username' })
        }

        try {
            if ( await bcrypt.compare(password, user.password)) {
                return done(null, user)
            } else {
                return done(null, false, { message: 'Password incorrect '})
            }
        } catch (e) {
            return done(e);
        }
    }
    passport.use(new LocalStrategy({ usernameField: 'userName' }, authenticateUser));
    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser((id, done) => {
        return done(null, getUserById(id))
    })
}


module.exports = initialize;

module.exports = initialize;