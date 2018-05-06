import { Schema, model } from 'mongoose';

import { IUserRole } from './interfaces/user-role.server.interface';

export const UserRoleSchema: Schema = new Schema({
  userId: {
    type: Number,
    required: true
  },
  roleId: {
    type: Number,
    required: true
  },
});

export default model<IUserRole>('User', UserRoleSchema);
