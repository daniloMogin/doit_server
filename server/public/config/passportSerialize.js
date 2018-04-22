"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport = require("passport");
let models = require('./../models');
module.exports = () => {
    passport.serializeUser((user, done) => {
        console.log('=================================================');
        console.log('Serialising user... (passport.ts 10)');
        console.log('=================================================');
        done(null, user.id);
    });
    passport.deserializeUser((id, done) => {
        console.log('=================================================');
        console.log('Deserialising user... (passport.ts 18)');
        console.log('=================================================');
        models.User.findOne({ id: id }).then((err, user) => {
            done(err, user);
        });
    });
};
