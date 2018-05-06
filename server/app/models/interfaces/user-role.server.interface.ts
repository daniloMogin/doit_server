import * as mongoose from 'mongoose';

export interface IUserRole extends mongoose.Document {
    userId: number,
    roleId: number
}