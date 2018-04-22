import * as mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
    name: string;
    lastname: string;
    username: string;
    password: string;
    email: string;
    status: string;
    city: string;
    country: string;
    locationChange: boolean;
    jobType: string;
    experience: string;
    gender: string;
    DoB: string;
    additionalInfo: string;
}