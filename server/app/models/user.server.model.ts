import { Schema, model } from 'mongoose';
import * as mongoose from 'mongoose';

import { IUser } from './interfaces/user.server.interface';

export const UserSchema: Schema = new Schema({
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
            type: Schema.Types.ObjectId,
            ref: 'Role',
            required: true
        }
    ],
    company: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Company'
        }
    ],
    job: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Job'
        }
    ]
});

// const User = mongoose.model<IUser>('User', UserSchema);
export default model<IUser>('User', UserSchema);
