import * as mongoose from 'mongoose';

export interface IUserCompany extends mongoose.Document {
    userId: number,
    companyId: number
}