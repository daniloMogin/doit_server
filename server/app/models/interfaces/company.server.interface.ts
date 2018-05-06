import * as mongoose from 'mongoose';

export interface ICompany extends mongoose.Document {
    name: string;
    description: string;
    city: string;
    country: string;
    phone: string;
    email: string;
    website: string;
}
