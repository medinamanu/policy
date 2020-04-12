import express from 'express';

const HealthCheckRouter = {
    getRouter() {
        const router = express.Router();
        router.get('/health', (request, response) => response.sendStatus("OK"));
        return router;
    }
};

export default HealthCheckRouter;
