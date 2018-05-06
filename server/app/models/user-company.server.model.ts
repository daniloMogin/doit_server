import { Schema, model } from 'mongoose';

import { IUserCompany } from './interfaces/user-company.server.interface';

export const UserCompanySchema: Schema = new Schema({
  userId: {
    type: Number,
    required: true
  },
  comapnyId: {
    type: Number,
    required: true
  },
});

// const User = mongoose.model<IUser>('User', UserSchema);
export default model<IUserCompany>('User', UserCompanySchema);
