import * as mongoose from 'mongoose';
import { ICompany } from './interfaces/company.server.interface';

export const CompanySchema: mongoose.Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        lowercase: true,
        required: [true, "Field is required"],
        match: [/\S+@\S+\.\S+/, 'is invalid'],
        index: true
    },
    website: {
        type: String,
        required: true
    }
}, { timestamps: true });

export default mongoose.model<ICompany>('Company', CompanySchema);
