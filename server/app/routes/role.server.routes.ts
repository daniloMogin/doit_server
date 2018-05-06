import * as express from 'express';

import RoleController = require('./../controllers/role.server.controller');

const router = express.Router();

class RoleRoutes {
  private _roleController: RoleController;

  constructor() {
    this._roleController = new RoleController();
  }

  get routes(): express.Router {
    let controller = this._roleController;

    router.get('/Role/GetRoles', controller.getRole);
    router.get('/Role/GetRoleById/:roleId', controller.getRolebyId);

    router.put('/Role/Update/:roleId', controller.updateRole);
    router.post('/Role/Create', controller.createRole);

    return router;
  }
}

Object.seal(RoleRoutes);
export = RoleRoutes;
