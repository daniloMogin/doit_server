"use strict";
const express = require("express");
const UserController = require("./../controllers/user.server.controller");
const API_URI_ROOT = '/Users/';
const AUTH_URI_ROOT = '/Auth/';
const router = express.Router();
class UserRoutes {
    constructor() {
        this._userController = new UserController();
    }
    get routes() {
        let controller = this._userController;
        router.get(`${API_URI_ROOT}render`, controller.renderUsers);
        router.get(`${API_URI_ROOT}`, controller.getUsers);
        router.get(`${API_URI_ROOT}:userId`, controller.getUserById);
        router.get(`${API_URI_ROOT}byCompany/:userId`, controller.getUserByCompany);
        router.get(`${API_URI_ROOT}byRole/:userId`, controller.getUserByRole);
        router.post(`${API_URI_ROOT}`, controller.createUser);
        router.put(`${API_URI_ROOT}:userId`, controller.updateUser);
        router.post(`${AUTH_URI_ROOT}Login`, controller.authenticate);
        router.get(`${AUTH_URI_ROOT}Register`, controller.renderRegister);
        router.post(`${AUTH_URI_ROOT}Register`, controller.register);
        return router;
    }
}
Object.seal(UserRoutes);
module.exports = UserRoutes;
