import * as mongoose from 'mongoose';
import { ICompany } from './interfaces/company.server.interface';
const AutoIncrement = require('mongoose-sequence')(mongoose);

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
        required: true
    },
    website: {
        type: String,
        required: true
    }
});
CompanySchema.plugin(AutoIncrement, { inc_field: 'companyId' });

export default mongoose.model<ICompany>('Company', CompanySchema);
