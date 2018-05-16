import * as express from 'express';
import JobController from './../controllers/job.server.controller';
import UserController = require('./../controllers/user.server.controller');

const API_URI_ROOT = '/Jobs/';
const router = express.Router();

class JobRoutes {
    constructor(
        private _jobController = new JobController(),
        private _userController = new UserController()
    ) { }

    get routes(): express.Router {
        const controller = this._jobController;
        const userController = this._userController;

        router.post(`${API_URI_ROOT}`, controller.createJob);
        router.get(`${API_URI_ROOT}`, controller.getJobs);
        router.get(`${API_URI_ROOT}:id`, controller.getJobById);
        router.get(`${API_URI_ROOT}byName/:name`, controller.getJobsByName);
        router.get(`${API_URI_ROOT}byCity/:city`, controller.getJobsByCity);
        router.get(`${API_URI_ROOT}byCountry/:country`, controller.getJobsByCountry);
        router.get(`${API_URI_ROOT}byKeyword/:keyword`, controller.getJobsByKeyword);
        router.get(`${API_URI_ROOT}byType/:type`, controller.getJobsByType);
        router.get(`${API_URI_ROOT}byCompany/:companyId`, controller.getJobsByCompany);
        router.put(`${API_URI_ROOT}:id`, controller.updateJob);
        router.delete(`${API_URI_ROOT}:id`, controller.deleteJob);

        router.get(`${API_URI_ROOT}:jobId/Apply`, userController.jobApply);
        router.get(`${API_URI_ROOT}:jobId/Remove`, userController.jobRemove);
        router.get(`${API_URI_ROOT}:jobId/Accept/:userId`, userController.jobAccept);
        router.get(`${API_URI_ROOT}:jobId/Decline/:userId`, userController.jobDecline);

        return router;
    }
}

Object.seal(JobRoutes);
export default JobRoutes;