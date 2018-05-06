import { Request, Response, NextFunction } from 'express';
import JobModel from '../../models/job.server.model';
import { IJob } from '../../models/interfaces/job.server.interface';

export default class JobDBCalls {
    public findJob(req: Request, res: Response) {
        return new Promise(resolve => {
            try {
                JobModel.find({}, '-_id')
                    .then(data => {
                        resolve(data);
                    })
                    .catch(error => {
                        resolve(error);
                    });
            } catch (err) {
                console.error(err);
            }
        });
    }

    public findJobById(req: Request, res: Response) {
        return new Promise(resolve => {
            try {
                JobModel.findOne({ jobId: req.body.id }, '-_id')
                    .then(data => {
                        resolve(data);
                    })
                    .catch(error => {
                        resolve(error);
                    });
            } catch (err) {
                console.error(err);
            }
        });
    }

    public findJobByName(req: Request, res: Response) {
        return new Promise(resolve => {
            try {
                JobModel.find({ name: req.body.name }, '-_id')
                    .then(data => {
                        resolve(data);
                    })
                    .catch(error => {
                        resolve(error);
                    });
            } catch (err) {
                console.error(err);
            }
        });
    }

    public findJobByCity(req: Request, res: Response) {
        return new Promise(resolve => {
            try {
                JobModel.find({ city: req.body.city }, '-_id')
                    .then(data => {
                        resolve(data);
                    })
                    .catch(error => {
                        resolve(error);
                    });
            } catch (err) {
                console.error(err);
            }
        });
    }

    public findJobByCountry(req: Request, res: Response) {
        return new Promise(resolve => {
            try {
                JobModel.find({ country: req.body.country }, '-_id')
                    .then(data => {
                        resolve(data);
                    })
                    .catch(error => {
                        resolve(error);
                    });
            } catch (err) {
                console.error(err);
            }
        });
    }

    public findJobByKeyword(req: Request, res: Response) {
        return new Promise(resolve => {
            try {
                JobModel.find({ keyword: req.body.keyword }, '-_id')
                    .then(data => {
                        resolve(data);
                    })
                    .catch(error => {
                        resolve(error);
                    });
            } catch (err) {
                console.error(err);
            }
        });
    }

    public findJobByType(req: Request, res: Response) {
        return new Promise(resolve => {
            try {
                JobModel.find({ type: req.body.type }, '-_id')
                    .then(data => {
                        resolve(data);
                    })
                    .catch(error => {
                        resolve(error);
                    });
            } catch (err) {
                console.error(err);
            }
        });
    }

    public createJob(job, req: Request, res: Response) {
        return new Promise(resolve => {
            try {
                const result = new JobModel({
                    name: job.name,
                    description: job.description,
                    city: job.city,
                    country: job.country,
                    type: job.type,
                    keywords: job.keywords,
                    categories: job.categories,
                    experience: job.experience,
                    salary: job.salary
                });

                result
                    .save()
                    .then(data => {
                        resolve(data);
                    })
                    .catch(error => {
                        resolve(error);
                    });
            } catch (err) {
                console.error(err);
            }
        });
    }

    public updateJob(job, req: Request, res: Response) {
        return new Promise(resolve => {
            try {
                const query = { jobId: job.jobId };
                const result = new JobModel({
                    name: job.name,
                    description: job.description,
                    city: job.city,
                    country: job.country,
                    type: job.type,
                    keywords: job.keywords,
                    categories: job.categories,
                    experience: job.experience,
                    salary: job.salary
                });

                JobModel.findOneAndUpdate(query, result)
                    .then(data => {
                        resolve(data);
                    })
                    .catch(error => {
                        resolve(error);
                    });
            } catch (err) {
                console.error(err);
            }
        });
    }

    public deleteJob(job, req: Request, res: Response) {
        return new Promise(resolve => {
            try {
                const query = { jobId: job.jobId };

                JobModel.findOneAndRemove(query)
                    .then(data => {
                        resolve(data);
                    })
                    .catch(error => {
                        resolve(error);
                    });
            } catch (err) {
                console.error(err);
            }
        });
    }
}
