"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.UserCompanySchema = new mongoose_1.Schema({
    userId: {
        type: String,
        required: true
    },
    comapnyId: {
        type: String,
        required: true
    },
});
exports.default = mongoose_1.model('User', exports.UserCompanySchema);
