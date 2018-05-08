import * as express from 'express';

import RoleController = require('./../controllers/role.server.controller');

const API_URI_ROOT = '/Role/';
const router = express.Router();

class RoleRoutes {
  private _roleController: RoleController;

  constructor() {
    this._roleController = new RoleController();
  }

  get routes(): express.Router {
    let controller = this._roleController;

    router.get(`${API_URI_ROOT}GetRoles`, controller.getRole);
    router.get(`${API_URI_ROOT}GetRoleById/:roleId`, controller.getRolebyId);

    router.put(`${API_URI_ROOT}Update/:roleId`, controller.updateRole);
    router.post(`${API_URI_ROOT}Create`, controller.createRole);

    return router;
  }
}

Object.seal(RoleRoutes);
export = RoleRoutes;
