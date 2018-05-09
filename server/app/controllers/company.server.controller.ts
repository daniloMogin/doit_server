import { Request, Response, NextFunction } from 'express';
import CompanyModel from '../models/company.server.model';
import CompanyDBCalls from '../repo/company_repo/company.server.repo';
import { ICompany } from '../models/interfaces/company.server.interface';

const Functions = require('../share/functions.server');

const company_db = new CompanyDBCalls();

const func = new Functions();

export default class CompanyController {
    // renderCompany = (req: Request, res: Response) => {
    //     console.log('=================================================');
    //     console.log('Rendering company... (company.server.controller.ts 34)');
    //     console.log('=================================================');
    //     res.render('company', {
    //         title: 'Be a SMART Company',
    //         user: JSON.stringify(req.user)
    //     });
    // };
    public async getCompanies(req: Request, res: Response) {
        const token: string = func.getToken(req.headers);
        if (token) {
            try {
                const findCompany: any = await company_db.findCompany(req, res);

                if (findCompany.length > 0) {
                    res.status(200).json({ success: true, company: findCompany });
                } else {
                    res.status(500).json({ success: false, msg: findCompany });
                }
            } catch (err) {
                console.error(
                    'Unable to connect to db and fetch all companies. Error is ',
                    err
                );
            }
        } else {
            return res
                .status(403)
                .send({ success: false, msg: 'User is not authenticated!' });
        }

    }

    public async getCompanyById(req: Request, res: Response) {
        const token: string = func.getToken(req.headers);
        if (token) {
            try {
                const findCompanyById: any = await company_db.findCompanyById(
                    req,
                    res
                );
                if (findCompanyById != null) {
                    res.status(200).json({ success: true, company: findCompanyById });
                } else {
                    res.status(500).json({ success: false, msg: findCompanyById });
                }
            } catch (err) {
                console.error(
                    'Unable to connect to db and fetch all companies. Error is ',
                    err
                );
            }
        } else {
            return res
                .status(403)
                .send({ success: false, msg: 'User is not authenticated!' });
        }
    }

    public async createCompany(req: Request, res: Response) {
        const token: string = func.getToken(req.headers);
        if (token) {
            const company = {
                name: req.body.name,
                description: req.body.description,
                city: req.body.city,
                country: req.body.country,
                phone: req.body.phone,
                email: req.body.email,
                website: req.body.website
            };
            try {
                const createCompany: any = await company_db.createCompany(
                    company,
                    req,
                    res
                );
                console.log(
                    `createCompany: 
                ${createCompany}`
                );
                if (createCompany.errors === undefined) {
                    res.status(200).json({
                        success: true, msg: createCompany
                    });
                } else {
                    res.status(500).json({ success: false, msg: createCompany });
                }
            } catch (err) {
                console.error(
                    'Unable to connect to db and fetch all companies. Error is ',
                    err
                );
            }
        } else {
            return res
                .status(403)
                .send({ success: false, msg: 'User is not authenticated!' });
        }
    }

    public async updateCompany(req: Request, res: Response) {
        const token: string = func.getToken(req.headers);
        if (token) {
            const company = {
                name: req.body.name,
                description: req.body.description,
                city: req.body.city,
                country: req.body.country,
                phone: req.body.phone,
                email: req.body.email,
                website: req.body.website
            };
            try {
                const updateCompany: any = await company_db.updateCompany(
                    company,
                    req,
                    res
                );
                console.log(updateCompany);
                if (updateCompany !== null) {
                    res.status(200).json({
                        success: true, company: updateCompany
                    });
                } else {
                    res.status(500).json({
                        success: false, msg: updateCompany
                    });
                }
            } catch (err) {
                console.error(
                    'Unable to connect to db and fetch all companies. Error is ',
                    err
                );
            }
        } else {
            return res
                .status(403)
                .send({ success: false, msg: 'User is not authenticated!' });
        }
    }

    public async deleteCompany(req: Request, res: Response) {
        const token: string = func.getToken(req.headers);
        if (token) {
            try {
                const deleteCompany = await company_db.deleteCompany(
                    req,
                    res
                );
                if (deleteCompany !== null) {
                    res.status(200).json({
                        success: true, company: deleteCompany
                    });
                } else {
                    res.status(500).json({
                        success: false, msg: deleteCompany
                    });
                }
            } catch (err) {
                console.error(
                    'Unable to connect to db and fetch all companies. Error is ',
                    err
                );
            }
        } else {
            return res
                .status(403)
                .send({ success: false, msg: 'User is not authenticated!' });
        }
    }

    public async getCompanyByName(req: Request, res: Response) {
        const token: string = func.getToken(req.headers);
        if (token) {
            try {
                const findCompany: any = await company_db.findCompanyByName(req, res)
                if (findCompany.length > 0) {
                    res.status(200).json({ success: true, company: findCompany });
                } else {
                    res.status(500).json({ success: false, msg: findCompany });
                }
            } catch (err) {
                console.error(
                    'Unable to connect to db and fetch all companies. Error is ',
                    err
                );
            }
        } else {
            return res
                .status(403)
                .send({ success: false, msg: 'User is not authenticated!' });
        }
    }
}
