import {expect} from 'chai';
import sinon from 'sinon';
import Chance from 'chance';
import HealthCheckRouter from '../../src/healthCheck/healthCheckRouter';
import PolicyRouter from '../../src/policy/policyRouter';
import App from '../../src/app';

describe('App', () => {
    const appSandbox = sinon.createSandbox();
    const chance = new Chance();

    afterEach(() => {
        appSandbox.restore()
    });

    it('should get the routers correctly when getPublicRoutes is called', () => {
        const healthCheckRouter = chance.word();
        const policyRouter = chance.word();
        appSandbox.stub(HealthCheckRouter, 'getRouter').returns(healthCheckRouter);
        appSandbox.stub(PolicyRouter, 'getRouter').returns(policyRouter);

        const publicRoutes = App.getPublicRoutes();

        expect(publicRoutes).to.eql([healthCheckRouter, policyRouter]);
    });
});
