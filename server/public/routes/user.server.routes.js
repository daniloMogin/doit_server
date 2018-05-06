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
        router.get('/Users/GetUsers', controller.renderUsers);
        router.get('/User/GetUsers', controller.getUsers);
        router.get('/User/GetUserById/:userId', controller.getUserById);
        router.get('/User/GetUsersByCompany', controller.getUserByCompany);
        router.get('/User/GetUsersByRole', controller.getUserByRole);
        router.put('/User/Update/:userId', controller.updateUser);
        router.post('/User/Login', controller.authenticate);
        router.get('/User/Register', controller.renderRegister);
        router.post('/User/Register', controller.register);
        return router;
    }
}
Object.seal(UserRoutes);
module.exports = UserRoutes;
