import { Schema, model } from 'mongoose';

import { IJob } from './interfaces/job.server.interface';

export const JobSchema: Schema = new Schema({
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
  type: {
    type: String,
    required: true
  },
  keywords: {
    type: String,
    required: true
  },
  categories: {
    type: String,
    required: true
  },
  experience: {
    type: String,
    required: true
  },
  salary: {
    type: String,
    required: true
  }
});

export default model<IJob>('Job', JobSchema);
