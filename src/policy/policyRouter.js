import express from 'express';
import PolicyController from './policyController';

const PolicyRouter = {
    getRouter() {
        const router = express.Router();
        router.get('/policy', (request, response) => PolicyController.getPolicy(request, response));
        return router;
    }
};

export default PolicyRouter;
