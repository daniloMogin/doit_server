import * as express from 'express';

import UserController = require('./../controllers/user.server.controller');

const API_URI_ROOT = '/User/';
const router = express.Router();

class UserRoutes {
    private _userController: UserController;

    constructor() {
        this._userController = new UserController();
    }

    get routes(): express.Router {
        let controller = this._userController;

        router.get(`/Users/GetUsers`, controller.renderUsers);
        router.get(`${API_URI_ROOT}GetUsers`, controller.getUsers);
        router.get(`${API_URI_ROOT}GetUserById/:userId`, controller.getUserById);
        router.get(`${API_URI_ROOT}GetUsersByCompany`, controller.getUserByCompany);
        router.get(`${API_URI_ROOT}GetUsersByRole`, controller.getUserByRole);

        router.put(`${API_URI_ROOT}Update/:userId`, controller.updateUser);

        router.post(`${API_URI_ROOT}Login`, controller.authenticate);
        router.get(`${API_URI_ROOT}Register`, controller.renderRegister);
        router.post(`${API_URI_ROOT}Register`, controller.register);

        return router;
    }
}

Object.seal(UserRoutes);
export = UserRoutes;
