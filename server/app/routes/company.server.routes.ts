import * as express from 'express';
import CompanyController from './../controllers/company.server.controller';

const API_URI_ROOT = '/Company/';
const router = express.Router();

class CompanyRoutes {
    constructor(private _companyController = new CompanyController()) {}

    get routes(): express.Router {
        const controller = this._companyController;
        router.get(`${API_URI_ROOT}`, controller.renderCompany);
        router.get(`${API_URI_ROOT}GetCompanies`, controller.getCompanies);
        router.get(`${API_URI_ROOT}GetCompanyById/:companyId`, controller.getCompanyById);
        router.post(`${API_URI_ROOT}Create`, controller.createCompany);
        router.put(`${API_URI_ROOT}Edit`, controller.updateCompany);
        router.delete(`${API_URI_ROOT}Delete`, controller.deleteCompany);

        return router;
    }
}

Object.seal(CompanyRoutes);
export default CompanyRoutes;