import { Request, Response, NextFunction } from 'express';
import CompanyModel from '../models/company.server.model';
import CompanyDBCalls from '../repo/company_repo/company.server.repo';
import { ICompany } from '../models/interfaces/company.server.interface';

const company_db = new CompanyDBCalls();

export default class CompanyController {
    renderCompany = (req: Request, res: Response) => {
        console.log('=================================================');
        console.log('Rendering company... (company.server.controller.ts 34)');
        console.log('=================================================');
        res.render('company', {
            title: 'Be a SMART Company',
            user: JSON.stringify(req.user)
        });
    };
    public async getCompanies(req: Request, res: Response) {
        try {
            const findCompany: any = await company_db.findCompany(req, res);

            if (findCompany.length > 0) {
                res.status(200).json({ findCompany });
            } else {
                res.status(500).json({ error: findCompany });
            }
        } catch (err) {
            console.error(
                'Unable to connect to db and fetch all companies. Error is ',
                err
            );
        }
    }

    public async getCompanyById(req: Request, res: Response) {
        try {
            const findCompanyById: any = await company_db.findCompanyById(
                req,
                res
            );
            if (findCompanyById != null) {
                res.status(200).json({ findCompanyById });
            } else {
                res.status(500).json({ error: findCompanyById });
            }
        } catch (err) {
            console.error(
                'Unable to connect to db and fetch all companies. Error is ',
                err
            );
        }
    }

    public async createCompany(req: Request, res: Response) {
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
                    message: 'Company Created Successufully!',
                    createInfo: createCompany
                });
            } else {
                res.status(500).json({ createCompany });
            }
        } catch (err) {
            console.error(
                'Unable to connect to db and fetch all companies. Error is ',
                err
            );
        }
    }

    public async updateCompany(req: Request, res: Response) {
        const company = {
            companyId: req.body.id,
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
                    message: 'Successfully Updated Company Info',
                    updateInfo: updateCompany
                });
            } else {
                res.status(500).json({
                    error: updateCompany
                });
            }
        } catch (err) {
            console.error(
                'Unable to connect to db and fetch all companies. Error is ',
                err
            );
        }
    }

    public async deleteCompany(req: Request, res: Response) {
        const company = {
            companyId: req.body.id
        };
        try {
            const deleteCompany = await company_db.deleteCompany(
                company,
                req,
                res
            );
            console.log(deleteCompany);
            if (deleteCompany !== null) {
                res.status(200).json({
                    message: 'Successfully Delete Company',
                    deleteInfo: deleteCompany
                });
            } else {
                res.status(500).json({
                    error: deleteCompany
                });
            }
        } catch (err) {
            console.error(
                'Unable to connect to db and fetch all companies. Error is ',
                err
            );
        }
    }
}
