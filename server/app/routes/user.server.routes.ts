import * as express from 'express';

import UserController = require('./../controllers/user.server.controller');

const API_URI_ROOT = '/Users/';
const AUTH_URI_ROOT = '/Auth/';
const router = express.Router();

class UserRoutes {
    private _userController: UserController;

    constructor() {
        this._userController = new UserController();
    }

    get routes(): express.Router {
        let controller = this._userController;

        router.get(`/User/GetUsers`, controller.renderUsers);
        router.get(`${API_URI_ROOT}GetUsers`, controller.getUsers);
        router.get(`${API_URI_ROOT}GetUserById/:userId`, controller.getUserById);
        router.get(`${API_URI_ROOT}GetUsersByCompany`, controller.getUserByCompany);
        router.get(`${API_URI_ROOT}GetUsersByRole`, controller.getUserByRole);

        router.post(`${API_URI_ROOT}Create`, controller.createUser);
        router.put(`${API_URI_ROOT}Update/:userId`, controller.updateUser);

        router.post(`${AUTH_URI_ROOT}Login`, controller.authenticate);
        router.get(`${AUTH_URI_ROOT}Register`, controller.renderRegister);
        router.post(`${AUTH_URI_ROOT}Register`, controller.register);

        return router;
    }
}

Object.seal(UserRoutes);
export = UserRoutes;
