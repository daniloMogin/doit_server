import { Request, Response, NextFunction } from 'express';
import JobModel from '../models/job.server.model';
import JobDBCalls from '../repo/job_repo/job.server.repo';
import { IJob } from '../models/interfaces/job.server.interface';

const job_db = new JobDBCalls();

export default class JobController {
    public async getJobs(req: Request, res: Response) {
        try {
            const findJobs: any = await job_db.findJob(req, res);
            console.log(findJobs);
            if (findJobs.length > 0) {
                res.status(200).json({
                    findJobs
                });
            } else {
                res.status(500).json({
                    error: findJobs
                });
            }
        } catch (err) {
            console.error('Unable to fetch Jobs database, Error: ', err);
        }
    }

    public async getJobById(req: Request, res: Response) {
        try {
            const findJobs = await job_db.findJobById(req, res);
            console.log(findJobs);
            if (findJobs !== null) {
                res.status(200).json({
                    findJobs
                });
            } else {
                res.status(500).json({
                    error: findJobs
                });
            }
        } catch (err) {
            console.error('Unable to fetch Jobs database, Error: ', err);
        }
    }

    public async getJobsByName(req: Request, res: Response) {
        try {
            const findJobs: any = await job_db.findJobByName(req, res);
            console.log(findJobs);
            if (findJobs.length > 0) {
                res.status(200).json({
                    findJobs
                });
            } else {
                res.status(500).json({
                    error: findJobs
                });
            }
        } catch (err) {
            console.error('Unable to fetch Jobs database, Error: ', err);
        }
    }

    public async getJobsByCity(req: Request, res: Response) {
        try {
            const findJobs: any = await job_db.findJobByCity(req, res);
            console.log(findJobs);
            if (findJobs.length > 0) {
                res.status(200).json({
                    findJobs
                });
            } else {
                res.status(500).json({
                    error: findJobs
                });
            }
        } catch (err) {
            console.error('Unable to fetch Jobs database, Error: ', err);
        }
    }

    public async getJobsByCountry(req: Request, res: Response) {
        try {
            const findJobs: any = await job_db.findJobByCountry(req, res);
            console.log(findJobs);
            if (findJobs.length > 0) {
                res.status(200).json({
                    findJobs
                });
            } else {
                res.status(500).json({
                    error: findJobs
                });
            }
        } catch (err) {
            console.error('Unable to fetch Jobs database, Error: ', err);
        }
    }

    public async getJobsByKeyword(req: Request, res: Response) {
        try {
            const findJobs: any = await job_db.findJobByKeyword(req, res);
            console.log(findJobs);
            if (findJobs.length > 0) {
                res.status(200).json({
                    findJobs
                });
            } else {
                res.status(500).json({
                    error: findJobs
                });
            }
        } catch (err) {
            console.error('Unable to fetch Jobs database, Error: ', err);
        }
    }

    public async getJobsByType(req: Request, res: Response) {
        try {
            const findJobs: any = await job_db.findJobByType(req, res);
            console.log(findJobs);
            if (findJobs.length > 0) {
                res.status(200).json({
                    findJobs
                });
            } else {
                res.status(500).json({
                    error: findJobs
                });
            }
        } catch (err) {
            console.error('Unable to fetch Jobs database, Error: ', err);
        }
    }

    public async createJob(req: Request, res: Response) {
        const job = {
            name: req.body.name,
            description: req.body.description,
            city: req.body.city,
            country: req.body.country,
            type: req.body.type,
            keywords: req.body.keywords,
            categories: req.body.categories,
            experience: req.body.experience,
            salary: req.body.salary
        };
        try {
            const createJob: any = await job_db.createJob(job, req, res);
            console.log(
                `createCompany: 
                ${createJob}`
            );
            if (createJob.errors === undefined) {
                res.status(200).json({
                    message: 'Job Created Successufully!',
                    createInfo: createJob
                });
            } else {
                res.status(500).json({ createJob });
            }
        } catch (err) {
            console.error(
                'Unable to connect to db and fetch all jobs. Error is ',
                err
            );
        }
    }

    public async updateJob(req: Request, res: Response) {
        const job = {
            jobId: req.body.id,
            name: req.body.name,
            description: req.body.description,
            city: req.body.city,
            country: req.body.country,
            type: req.body.type,
            keywords: req.body.keywords,
            categories: req.body.categories,
            experience: req.body.experience,
            salary: req.body.salary
        };
        try {
            const updateJob: any = await job_db.updateJob(job, req, res);
            console.log(updateJob);
            if (updateJob !== null) {
                res.status(200).json({
                    message: 'Successfully Updated Job Info',
                    updateInfo: updateJob
                });
            } else {
                res.status(500).json({
                    error: updateJob
                });
            }
        } catch (err) {
            console.error(
                'Unable to connect to db and fetch all jobs. Error is ',
                err
            );
        }
    }

    public async deleteJob(req: Request, res: Response) {
        const job = {
            jobId: req.body.id
        };
        try {
            const deleteJob = await job_db.deleteJob(job, req, res);
            console.log(deleteJob);
            if (deleteJob !== null) {
                res.status(200).json({
                    message: 'Successfully Delete Company',
                    deleteInfo: deleteJob
                });
            } else {
                res.status(500).json({
                    error: deleteJob
                });
            }
        } catch (err) {
            console.error('Unable to fetch Jobs database, Error: ', err);
        }
    }
}
