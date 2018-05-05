import * as express from 'express';
import JobController from './../controllers/job.server.controller';

const API_URI_ROOT = '/Job/';
const router = express.Router();

class JobRoutes {
    constructor(private _jobController = new JobController()) {}

    get routes(): express.Router {
        const controller = this._jobController;
        // router.get(`${API_URI_ROOT}`, controller.renderCompany);
        router.get(`${API_URI_ROOT}GetJobs`, controller.getJobs);
        router.get(`${API_URI_ROOT}GetJobById/:jobId`, controller.getJobById);
        router.get(`${API_URI_ROOT}GetJobsByName`, controller.getJobsByName);
        router.get(`${API_URI_ROOT}GetJobsByCity`, controller.getJobsByCity);
        router.get(`${API_URI_ROOT}GetJobsByCountry`, controller.getJobsByCountry);
        router.get(`${API_URI_ROOT}GetJobsByKeyword`, controller.getJobsByKeyword);
        router.get(`${API_URI_ROOT}GetJobsByType`, controller.getJobsByType);
        router.post(`${API_URI_ROOT}Create`, controller.createJob);
        router.put(`${API_URI_ROOT}Edit`,controller.updateJob);
        router.delete(`${API_URI_ROOT}Delete`, controller.deleteJob);

        return router;
    }
}

Object.seal(JobRoutes);
export default JobRoutes;