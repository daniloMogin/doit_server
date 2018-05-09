import * as mongoose from 'mongoose';

export interface IJob extends mongoose.Document {
    name: string;
    description: string;
    city: string;
    country: string;
    type: string;
    keywords: string;
    categories: string;
    experience: string;
    salary: string;
    active: string;
}