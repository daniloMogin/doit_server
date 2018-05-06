import * as express from 'express';
import * as path from 'path';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as morgan from 'morgan';
import * as passport from 'passport';
import * as jwt from 'jwt-simple';
import * as mongoose from 'mongoose';
import flash = require('connect-flash');

import methodOverride = require('./../methodOverride');
import baseRoutes = require('./../../../routes/base/base.server.routes');

class MiddlewareBase {
  static get configuration() {
    const app = express();

    app.set('views', './views');
    app.set('view engine', 'pug');

    app.use(cors());
    require('./../../strategies/jwt')(passport);

    /* --- DB CONNECTION INFO --- */
    // Local TestDB
    // const MONGO_URI: string = 'mongodb://localhost:27017/doit_db'; 

    // Heroku LiveDB
    const MONGO_URI = 'mongodb://doitdb_user:doitdb123@ds259499.mlab.com:59499/doit_db';
    /* --- END DB INFO --- */

    mongoose.connect(MONGO_URI || process.env.MONGODB_URI);

    app.use(
      bodyParser.urlencoded({
        extended: true
      })
    );
    app.use(bodyParser.json());
    app.use(methodOverride.configuration());
    app.use(morgan('dev'));

    app.use(flash());
    app.use(passport.initialize());
    app.use(passport.session());

    app.use('/api', new baseRoutes().routes);

    app.use(express.static('./public'));

    // catch 404 and forward to error handler
    app.use((req: express.Request, res: express.Response, next) => {
      res.status(404);
      res.render('404.pug', { title: '404: File not found' });
    });

    // error handler
    app.use((err, req: express.Request, res: express.Response, next) => {
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
export = MiddlewareBase;
