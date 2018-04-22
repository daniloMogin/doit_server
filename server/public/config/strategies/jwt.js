"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants = require("./../constants/constants");
const user_server_model_1 = require("../../models/user.server.model");
let JwtStrategy = require('passport-jwt').Strategy;
let ExtractJwt = require('passport-jwt').ExtractJwt;
module.exports = passport => {
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = constants.secret;
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        console.log('=================================================');
        console.log('JWT... (jwt.ts)');
        console.log('=================================================');
        try {
            user_server_model_1.default.findOne({ id: jwt_payload.id }).then(user => {
                if (user) {
                    console.log(`JWT user... jwt.ts 27 ${JSON.stringify(user)}`);
                    done(null, user);
                }
                else {
                    done(null, false, 'User found in token not found');
                }
            });
        }
        catch (e) {
            console.log(e);
        }
    }));
};
