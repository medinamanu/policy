import HealthCheckRouter from './healthCheck/healthCheckRouter';
import PolicyRouter from './policy/policyRouter';

const App = {
    getPublicRoutes() {
        return [
            HealthCheckRouter.getRouter(),
            PolicyRouter.getRouter()
        ]
    }
};

export default App;
