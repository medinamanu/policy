import {describe} from "mocha";
import chai, {expect} from "chai";
import Chance from "chance";
import PolicyService from "../../../src/services/policyService";
import sinon from "sinon";
import moxios from "moxios";
import restService from "../../../src/services/restService";

const chance = new Chance();

describe('PolicyService', () => {
    let requestStub;
    let restServiceStub;
    const appSandbox = sinon.createSandbox();
    const expectedPolicyParameters = { message: '', policy: { workers: [{ age: 21, childs: 3 }]}};

    beforeEach(() => {
        moxios.install();
        restServiceStub = appSandbox.stub(restService, 'send').resolves(expectedPolicyParameters);
    });
    
    afterEach(() => {
        appSandbox.restore();
        moxios.uninstall();
    });

    it('should get policy in successfully response', async () => {
        const policyParameters = await PolicyService.getPolicy();

        expect(policyParameters).equal(expectedPolicyParameters);
    });
});
