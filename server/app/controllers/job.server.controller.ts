import { Request, Response, NextFunction } from 'express';
import JobModel from '../models/job.server.model';
import JobDBCalls from '../repo/job_repo/job.server.repo';
import { IJob } from '../models/interfaces/job.server.interface';

const Functions = require('../share/functions.server');

const job_db = new JobDBCalls();

const func = new Functions();

export default class JobController {
    public async getJobs(req: Request, res: Response) {
        try {
            const findJobs: any = await job_db.findJob(req, res);
            console.log(findJobs);
            if (findJobs.length > 0) {
                res.status(200).json({
                    success: true, job: findJobs
                });
            } else {
                res.status(500).json({
                    success: false, msg: findJobs
                });
            }
        } catch (err) {
            console.error(
                'Unable to fetch Jobs database, Error: ',
                err
            );
        }
    }

    public async getJobById(req: Request, res: Response) {
        try {
            const findJobs = await job_db.findJobById(req, res);
            console.log(findJobs);
            if (findJobs !== null) {
                res.status(200).json({
                    success: true, job: findJobs
                });
            } else {
                res.status(500).json({
                    success: false, msg: findJobs
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
                    success: true, job: findJobs
                });
            } else {
                res.status(500).json({
                    success: false, msg: findJobs
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
                    success: true, job: findJobs
                });
            } else {
                res.status(500).json({
                    success: false, msg: findJobs
                });
            }
        } catch (err) {
            console.error(
                'Unable to fetch Jobs database, Error: ',
                err
            );
        }
    }

    public async getJobsByCountry(req: Request, res: Response) {
        try {
            const findJobs: any = await job_db.findJobByCountry(req, res);
            console.log(findJobs);
            if (findJobs.length > 0) {
                res.status(200).json({
                    success: true, job: findJobs
                });
            } else {
                res.status(500).json({
                    success: false, msg: findJobs
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
                    success: true, job: findJobs
                });
            } else {
                res.status(500).json({
                    success: false, msg: findJobs
                });
            }
        } catch (err) {
            console.error('Unable to fetch Jobs database, Error: ', err);
        }
    }

    public async getJobsByCompany(req: Request, res: Response) {
        try {
            const findJobs: any = await job_db.findJobByCompany(req, res);
            console.log(findJobs);
            if (findJobs.length !== null) {
                res.status(200).json({
                    success: true, job: findJobs
                });
            } else {
                res.status(500).json({
                    success: false, msg: findJobs
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
                    success: true, job: findJobs
                });
            } else {
                res.status(500).json({
                    success: false, msg: findJobs
                });
            }
        } catch (err) {
            console.error('Unable to fetch Jobs database, Error: ', err);
        }
    }

    public async createJob(req: Request, res: Response) {
        const token: string = func.getToken(req.headers);
        if (token) {
            const user = await func.decodeToken(token);
            const keywords: string[] = await req.body.keywords.split(',');
            let keywordsArr: string[] = [];
            for (let i: number = 0; i < keywords.length; i++) {
                keywordsArr.push(keywords[i].trim());
            }

            const job = {
                name: req.body.name,
                description: req.body.description,
                city: req.body.city,
                country: req.body.country,
                type: req.body.type,
                keywords: keywordsArr,
                categories: req.body.categories,
                experience: req.body.experience,
                salary: req.body.salary,
                company: req.body.company,
                active: req.body.active,
                createdBy: user._id
            };
            try {
                const createJob: any = await job_db.createJob(job, req, res);
                console.log(
                    `createJob: 
                    ${createJob}`
                );
                if (createJob.errors === undefined) {
                    res.status(200).json({
                        success: true, job: createJob
                    });
                } else {
                    res.status(500).json({ success: false, msg: createJob });
                }
            } catch (err) {
                console.error(
                    'Unable to connect to db and fetch all jobs. Error is ',
                    err
                );
            }
        } else {
            return res
                .status(403)
                .send({ success: false, msg: 'User is not authenticated!' });
        }
    }

    public async updateJob(req: Request, res: Response) {
        const token: string = func.getToken(req.headers);
        if (token) {
            const user = await func.decodeToken(token);
            const keywords: string[] = await req.body.keywords.split(',');
            let keywordsArr: string[] = [];
            for (let i: number = 0; i < keywords.length; i++) {
                keywordsArr.push(keywords[i].trim());
            }
            const job = {
                name: req.body.name,
                description: req.body.description,
                city: req.body.city,
                country: req.body.country,
                type: req.body.type,
                keywords: keywordsArr,
                categories: req.body.categories,
                experience: req.body.experience,
                salary: req.body.salary,
                company: req.body.company,
                active: req.body.active,
                createdBy: user._id
            };
            try {
                const updateJob: any = await job_db.updateJob(job, req, res);
                console.log(updateJob);
                if (updateJob !== null) {
                    res.status(200).json({
                        success: true, job: updateJob
                    });
                } else {
                    res.status(500).json({
                        success: false, msg: updateJob
                    });
                }
            } catch (err) {
                console.error(
                    'Unable to connect to db and fetch all jobs. Error is ',
                    err
                );
            }
        } else {
            return res
                .status(403)
                .send({ success: false, msg: 'User is not authenticated!' });
        }
    }

    public async deleteJob(req: Request, res: Response) {
        const token: string = func.getToken(req.headers);
        if (token) {
            try {
                const deleteJob = await job_db.deleteJob(req, res);
                console.log(deleteJob);
                if (deleteJob !== null) {
                    res.status(200).json({
                        success: true, job: deleteJob
                    });
                } else {
                    res.status(500).json({
                        success: false, msg: deleteJob
                    });
                }
            } catch (err) {
                console.error('Unable to fetch Jobs database, Error: ', err);
            }
        } else {
            return res
                .status(403)
                .send({ success: false, msg: 'User is not authenticated!' });
        }
    }

}
