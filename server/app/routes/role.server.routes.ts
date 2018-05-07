import * as express from 'express';

import RoleController = require('./../controllers/role.server.controller');

const API_URI_ROOT = '/Roles/';
const router = express.Router();

class RoleRoutes {
  private _roleController: RoleController;

  constructor() {
    this._roleController = new RoleController();
  }

  get routes(): express.Router {
    let controller = this._roleController;

    router.get(`${API_URI_ROOT}`, controller.getRole);
    router.get(`${API_URI_ROOT}:roleId`, controller.getRolebyId);
    router.put(`${API_URI_ROOT}:roleId`, controller.updateRole);
    router.post(`${API_URI_ROOT}`, controller.createRole);

    return router;
  }
}

Object.seal(RoleRoutes);
export = RoleRoutes;
