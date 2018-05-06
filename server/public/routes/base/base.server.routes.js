"use strict";
const express = require("express");
const IndexRoutes = require("./../index.server.routes");
const UserRoutes = require("./../user.server.routes");
const RoleRoutes = require("./../role.server.routes");
const company_server_routes_1 = require("../company.server.routes");
const job_server_routes_1 = require("../job.server.routes");
let app = express();
class BaseRoutes {
    get routes() {
        app.use('/', new IndexRoutes().routes);
        app.use('/', new UserRoutes().routes);
        app.use('/', new RoleRoutes().routes);
        app.use('/', new company_server_routes_1.default().routes);
        app.use('/', new job_server_routes_1.default().routes);
        return app;
    }
}
module.exports = BaseRoutes;
