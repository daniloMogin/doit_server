import * as express from 'express';
import CompanyController from './../controllers/company.server.controller';

const API_URI_ROOT = '/Companies/';
const router = express.Router();

class CompanyRoutes {
    constructor(private _companyController = new CompanyController()) {}

    get routes(): express.Router {
        const controller = this._companyController;
        // router.get(`${API_URI_ROOT}`, controller.renderCompany);
        router.get(`${API_URI_ROOT}`, controller.getCompanies);
        router.get(`${API_URI_ROOT}:id`, controller.getCompanyById);
        router.post(`${API_URI_ROOT}`, controller.createCompany);
        router.put(`${API_URI_ROOT}:id`, controller.updateCompany);
        router.delete(`${API_URI_ROOT}:id`, controller.deleteCompany);
        router.get(`${API_URI_ROOT}byName/:name`, controller.getCompanyByName);

        return router;
    }
}

Object.seal(CompanyRoutes);
export default CompanyRoutes;