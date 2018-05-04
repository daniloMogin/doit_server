import * as mongoose from 'mongoose';

export default interface ICompany extends mongoose.Document {
    name: string;
    description: string;
    city: string;
    country: string;
    phone: string;
    email: string;
    website: string;
}
