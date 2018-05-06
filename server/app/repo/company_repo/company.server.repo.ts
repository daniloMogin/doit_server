import { Request, Response, NextFunction } from 'express';
import CompanyModel from '../../models/company.server.model';
import ICompany from '../../models/interfaces/company.server.interface';

export default class CompanyDBCalls {
    public findCompany = (req: Request, res: Response) => {
        return new Promise(resolve => {
            try {
                CompanyModel.find({}, '-_id')
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
    public findCompanyById = (req: Request, res: Response) => {
        return new Promise(resolve => {
            try {
                const query = { companyId: req.params.id }
                CompanyModel.findOne(query, '-_id')
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

                result.save()
                    .then(data => {
                        resolve(data);
                    })
                    .catch(error => {
                        resolve(error);
                    })
            } catch (err) {
                console.error(err);
            }
        });
    }
    public updateCompany = (company, req: Request, res: Response) => {
        return new Promise(resolve => {
            try {
                const query = { companyId: company.companyId }
                const result = new CompanyModel({
                    name: company.name,
                    description: company.description,
                    city: company.city,
                    country: company.country,
                    phone: company.phone,
                    email: company.email,
                    website: company.website
                });

                CompanyModel.findOneAndUpdate(query, result)
                    .then(data => {
                        resolve(data);
                    })
                    .catch(error => {
                        resolve(error);
                    })
            } catch (err) {
                console.error(err);
            }
        });
    }
    public deleteCompany = (company, req: Request, res: Response) => {
        return new Promise(resolve => {
            try {
                const query = { companyId: company.companyId }

                CompanyModel.findOneAndRemove(query)
                    .then(data => {
                        resolve(data);
                    })
                    .catch(error => {
                        resolve(error);
                    })
            } catch (err) {
                console.error(err);
            }
        });
    }
}