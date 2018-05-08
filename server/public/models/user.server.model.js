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
        required: true,
        enum: ['available', 'assigned', 'frozen']
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
        required: true,
        default: false
    },
    jobType: {
        type: String,
        enum: ['fullTime', 'partTime']
    },
    experience: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female']
    },
    DoB: {
        type: String,
        required: true
    },
    additionalInfo: {
        type: String
    },
    role: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Role',
            required: true
        }
    ],
    company: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Company'
        }
    ],
    job: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Job'
        }
    ]
});
exports.default = mongoose_1.model('User', exports.UserSchema);
