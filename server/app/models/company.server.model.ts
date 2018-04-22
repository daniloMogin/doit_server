import { Schema, model } from 'mongoose';

import { ICompany } from './interfaces/company.server.interface';

export const CompanySchema: Schema = new Schema({
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

export default model<ICompany>('Company', CompanySchema);
