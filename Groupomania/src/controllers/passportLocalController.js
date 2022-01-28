import passportLocal from "passport-local";
import {Strategy} from 'passport-jwt';
import passport from "passport";
import loginService from "../services/loginService";

let LocalStrategy = passportLocal.Strategy;
// -------------------token--------------------------------
let cookieExtractor = function(req) {
    var token = null;
    if (req && req.cookies)
    {
        token = req.cookies['jwt'];
    }
    return token;
};


// ---------------------------------------------------------
let initPassportLocal = () => {
    passport.use(new LocalStrategy({
            usernameField: 'u_email',
            passwordField: 'u_pwd',
            passReqToCallback: true
        },
        async (req, u_email, u_pwd, done) => {
            try {
                await loginService.findUserByEmail(u_email).then(async (user) => {
                    if (!user) {
                        return done(null, false, req.flash("errors", `This user email "${u_email}" doesn't exist`));
                    }
                    if (user) {
                        
                        let match = await loginService.comparePassword(u_pwd, user);
                        if (match === true) {
                            return done(null, user, null)
                        } else {
                            return done(null, false, req.flash("errors", match)
                            )
                        }
                    }
                });
            } catch (err) {
                console.log(err);
                return done(null, false, { message: err });
            }
        }));

};

passport.serializeUser((user, done) => {
    done(null, user.u_id);
});

passport.deserializeUser((u_id, done) => {
    loginService.findUserById(u_id).then((user) => {
        return done(null, user);
    }).catch(error => {
        return done(error, null)
    });
});

module.exports = initPassportLocal, cookieExtractor;