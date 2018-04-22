import * as mongoose from 'mongoose';

export interface IUserCompany extends mongoose.Document {
    userId: string,
    companyId: string
}