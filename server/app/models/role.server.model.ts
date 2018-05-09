import { Schema, model } from 'mongoose';

import { IRole } from './interfaces/role.server.interface';

export const RoleSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, { timestamps: true });

export default model<IRole>('Role', RoleSchema);
