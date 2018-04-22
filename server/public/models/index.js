"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const user_server_model_1 = require("./user.server.model");
const job_server_model_1 = require("./job.server.model");
const company_server_model_1 = require("./company.server.model");
exports.mdoels = [user_server_model_1.UserSchema, job_server_model_1.JobSchema, company_server_model_1.CompanySchema];
__export(require("./user.server.model"));
__export(require("./job.server.model"));
__export(require("./company.server.model"));
