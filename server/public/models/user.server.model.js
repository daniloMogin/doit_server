"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.UserSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    locationChange: {
        type: Boolean,
        required: true
    },
    jobType: {
        type: String,
        required: true
    },
    experience: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    DoB: {
        type: String,
        required: true
    },
    additionalInfo: {
        type: String,
        required: true
    },
    role: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Role'
        }]
});
exports.default = mongoose_1.model('User', exports.UserSchema);
