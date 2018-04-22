"use strict";
const express = require("express");
const UserController = require("./../controllers/user.server.controller");
const router = express.Router();
class UserRoutes {
    constructor() {
        this._userController = new UserController();
    }
    get routes() {
        let controller = this._userController;
        router.get('/User/GetUsers', controller.getUsers);
        router.get('/User/GetUserById/:userId', controller.getUserByUserId);
        router.get('/User/GetUsersByCompany', controller.getUserByUserCompany);
        router.put('/User/Update/:userId', controller.updateUser);
        router.get('/User/Register', controller.renderRegister);
        router.post('/User/Register', controller.createUser);
        return router;
    }
}
Object.seal(UserRoutes);
module.exports = UserRoutes;
