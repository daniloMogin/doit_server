"use strict";
const express = require("express");
const IndexRoutes = require("./../index.server.routes");
const UserRoutes = require("./../user.server.routes");
const RoleRoutes = require("./../role.server.routes");
let app = express();
class BaseRoutes {
    get routes() {
        app.use('/', new IndexRoutes().routes);
        app.use('/', new UserRoutes().routes);
        app.use('/', new RoleRoutes().routes);
        return app;
    }
}
module.exports = BaseRoutes;
