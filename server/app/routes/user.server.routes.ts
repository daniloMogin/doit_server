import * as express from 'express';

import UserController = require('./../controllers/user.server.controller');

const router = express.Router();

class UserRoutes {
  private _userController: UserController;

  constructor() {
    this._userController = new UserController();
  }

  get routes(): express.Router {
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
export = UserRoutes;
