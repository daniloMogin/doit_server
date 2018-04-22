"use strict";
const express = require("express");
const IndexController = require("./../controllers/index.server.controller");
const router = express.Router();
class IndexRoutes {
    constructor() {
        this._indexController = new IndexController();
    }
    get routes() {
        let controller = this._indexController;
        router.get('/', controller.renderIndex);
        return router;
    }
}
Object.seal(IndexRoutes);
module.exports = IndexRoutes;
