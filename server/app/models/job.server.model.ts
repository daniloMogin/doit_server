import * as mongoose from 'mongoose';
import { IJob } from './interfaces/job.server.interface';

export const JobSchema: mongoose.Schema = new mongoose.Schema({
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
        required: true,
        enum: ['partTime', 'fullTime']
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

export default mongoose.model<IJob>('Job', JobSchema);
