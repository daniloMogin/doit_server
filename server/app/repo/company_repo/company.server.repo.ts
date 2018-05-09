import { Request, Response, NextFunction } from 'express';
import CompanyModel from '../../models/company.server.model';
import { ICompany } from '../../models/interfaces/company.server.interface';

export default class CompanyDBCalls {
    public findCompany = (req: Request, res: Response) => {
        return new Promise(resolve => {
            try {
                CompanyModel.find()
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
    };
    public findCompanyById = (req: Request, res: Response) => {
        return new Promise(resolve => {
            try {
                CompanyModel.findById(req.params.id)
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
    };
    public createCompany = (company, req: Request, res: Response) => {
        return new Promise(resolve => {
            try {
                const result = new CompanyModel({
                    name: company.name,
                    description: company.description,
                    city: company.city,
                    country: company.country,
                    phone: company.phone,
                    email: company.email,
                    website: company.website
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
    };
    public updateCompany = (company, req: Request, res: Response) => {
        return new Promise(resolve => {
            try {
                const result = {
                    name: company.name,
                    description: company.description,
                    city: company.city,
                    country: company.country,
                    phone: company.phone,
                    email: company.email,
                    website: company.website
                };

                CompanyModel.findByIdAndUpdate(req.params.id, result, {
                    new: true
                })
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
    };
    public deleteCompany = (req: Request, res: Response) => {
        return new Promise(resolve => {
            try {
                CompanyModel.findByIdAndRemove(req.params.id)
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
    };

    public findCompanyByName = (req: Request, res: Response) => {
        return new Promise(resolve => {
            try {
                CompanyModel.find({ name: req.params.name })
                    .then(data => {
                        resolve(data);
                    })
                    .catch(error => {
                        resolve(error);
                    });
            } catch (err) {
                console.error(err);
            }
        })
    }
}
