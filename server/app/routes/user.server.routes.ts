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

        router.post(`${API_URI_ROOT}`, controller.createUser);
        router.get(`${API_URI_ROOT}`, controller.getUsers);
        router.put(`${API_URI_ROOT}:userId`, controller.updateUser);
        router.get(`${API_URI_ROOT}:userId`, controller.getUserById);
        // router.get(`${API_URI_ROOT}byCompany/:company`, controller.getUserByCompany);
        // router.get(`${API_URI_ROOT}byRole/:role`, controller.getUserByRole);
        router.get(`${API_URI_ROOT}render`, controller.renderUsers);


        router.post(`${AUTH_URI_ROOT}Login`, controller.authenticate);
        router.get(`${AUTH_URI_ROOT}Register`, controller.renderRegister);
        router.post(`${AUTH_URI_ROOT}Register`, controller.register);

        return router;
    }
}

Object.seal(UserRoutes);
export = UserRoutes;
