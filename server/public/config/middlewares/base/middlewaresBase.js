"use strict";
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const passport = require("passport");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const methodOverride = require("./../methodOverride");
const baseRoutes = require("./../../../routes/base/base.server.routes");
class MiddlewareBase {
    static get configuration() {
        const app = express();
        app.set('views', './views');
        app.set('view engine', 'pug');
        app.use(cors());
        require('./../../strategies/jwt')(passport);
        const MONGO_URI = 'mongodb://localhost:27017/doit_db';
        mongoose.connect(MONGO_URI || process.env.MONGODB_URI);
        app.use(bodyParser.urlencoded({
            extended: true
        }));
        app.use(bodyParser.json());
        app.use(methodOverride.configuration());
        app.use(morgan('dev'));
        app.use(flash());
        app.use(passport.initialize());
        app.use(passport.session());
        app.use('/api', new baseRoutes().routes);
        app.use(express.static('./public'));
        app.use((req, res, next) => {
            res.status(404);
            res.render('404.pug', { title: '404: File not found' });
        });
        app.use((err, req, res, next) => {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: app.get('env') === 'development' ? err : {}
            });
        });
        return app;
    }
}
Object.seal(MiddlewareBase);
module.exports = MiddlewareBase;
