"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const UserModel = require("./user.server.model");
const JobModel = require("./job.server.model");
const CompanyModel = require("./company.server.model");
const RoleModel = require("./role.server.model");
const UserCompanyModel = require("./user-company.server.model");
const UserRoleModel = require("./user-role.server.model");
exports.models = [
    UserModel,
    JobModel,
    CompanyModel,
    RoleModel,
    UserCompanyModel,
    UserRoleModel
];
__export(require("./user.server.model"));
__export(require("./job.server.model"));
__export(require("./company.server.model"));
__export(require("./role.server.model"));
__export(require("./user-company.server.model"));
__export(require("./user-role.server.model"));
