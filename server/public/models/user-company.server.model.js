"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.UserCompanySchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId, ref: 'User',
        required: true
    },
    comapnyId: {
        type: mongoose_1.Schema.Types.ObjectId, ref: 'Company',
        required: true
    },
});
exports.default = mongoose_1.model('User', exports.UserCompanySchema);
