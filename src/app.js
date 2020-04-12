import HealthCheckRouter from './healthCheck/healthCheckRouter';

const App = {
    getPublicRoutes() {
        return [
            HealthCheckRouter.getRouter()
        ]
    }
};

export default App;
