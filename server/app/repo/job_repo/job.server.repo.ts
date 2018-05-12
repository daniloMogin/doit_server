import { Request, Response, NextFunction } from 'express';
import JobModel from '../../models/job.server.model';
import { IJob } from '../../models/interfaces/job.server.interface';

export default class JobDBCalls {
    public findJob(req: Request, res: Response) {
        return new Promise(resolve => {
            try {
                JobModel.find()
                    .populate('createdBy company', '-password -__v')
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
                JobModel.findById(req.params.id)
                    .populate('createdBy company', '-password -__v')
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
                JobModel.find({ name: req.params.name })
                    .populate('createdBy company', '-password -__v')
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
                JobModel.find({ city: req.params.city })
                    .populate('createdBy company', '-password -__v')
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
                JobModel.find({ country: req.params.country })
                    .populate('createdBy company', '-password -__v')
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
            const keyword: any = req.params.keyword;
            try {
                JobModel.find()
                    .populate('createdBy company', '-password -__v')
                    .then((data: any) => {
                        let newData: any[] = [];
                        for (let i: number = 0; i < data.length; i++) {

                            if (!(data[i].keywords === null)) {
                                for (let j: number = 0; j < data[i].keywords.length; j++) {
                                    if (keyword === data[i].keywords[j]) {
                                        newData.push(data[i]);
                                    }
                                }
                            }
                        }
                        resolve(newData);
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
                JobModel.find({ type: req.params.type })
                    .populate('createdBy company', '-password -__v')
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

    public findJobByCompany(req: Request, res: Response) {
        return new Promise(resolve => {
            try {
                JobModel.findOne({ company: req.params.companyId })
                    .populate('createdBy company', '-__v')
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
                    salary: job.salary,
                    company: job.company,
                    active: job.active,
                    createdBy: job.createdBy
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
                const result = {
                    name: job.name,
                    description: job.description,
                    city: job.city,
                    country: job.country,
                    type: job.type,
                    keywords: job.keywords,
                    categories: job.categories,
                    experience: job.experience,
                    salary: job.salary,
                    company: job.company,
                    active: job.active
                    // Not modifying created by ID,
                    // Maybe add another field to monitor this?
                    // createdBy: job.createdBy
                };

                JobModel.findByIdAndUpdate(req.params.id, result)
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

    public deleteJob(req: Request, res: Response) {
        return new Promise(resolve => {
            try {
                JobModel.findByIdAndRemove(req.params.id)
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
