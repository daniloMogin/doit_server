import * as express from 'express';
import IndexRoutes = require('./../index.server.routes');
import UserRoutes = require('./../user.server.routes');
import RoleRoutes = require('./../role.server.routes');

let app = express();

class BaseRoutes {
  get routes(): express.Router {
    app.use('/', new IndexRoutes().routes);
    app.use('/', new UserRoutes().routes);
    app.use('/', new RoleRoutes().routes);

    return app;
  }
}

export = BaseRoutes;
