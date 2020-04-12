import { OK } from 'http-status';
import chai, {expect} from 'chai';
import sinon from "sinon";
import sinonChai from 'sinon-chai'
import chaiAsPromised from 'chai-as-promised'
import {describe} from "mocha";
import Chance from 'chance';
import moxios from 'moxios';
import PolicyController from "../../../src/policy/policyController";
import policyService from "../../../src/services/policyService";

chai.use(chaiAsPromised)
chai.use(sinonChai)

describe('PolicyController', () => {
    const FIRST_COMPANY_PERCENTAGE = 70;
    const SECOND_COMPANY_PERCENTAGE = 60;
    const CURRENCY = 'UF';
    const chance = new Chance();
    let request, response, policyServiceStub;
    const firstPolicyData = {policy:
                          { workers: [{age: 20, childs: 1},
                                      {age: 45, childs: 0},
                                      {age: 70, childs: 2},
                                      {age: 33, childs: 4}],
                            company_percentage: FIRST_COMPANY_PERCENTAGE,
                            has_dental_care: true
                          }
                        };

    const secondPolicyData = {policy:
                          { workers: [{age: 24, childs: 0},
                                      {age: 45, childs: 1},
                                      {age: 34, childs: 2},
                                      {age: 68, childs: 2},
                                      {age: 22, childs: 1},
                                      {age: 30, childs: 7}],
                            company_percentage: SECOND_COMPANY_PERCENTAGE,
                            has_dental_care: true
                          }
                        };

    const secondPolicyDataWithoutDentalCare = {policy:
                          { workers: [{age: 24, childs: 0},
                                      {age: 45, childs: 1},
                                      {age: 34, childs: 2},
                                      {age: 68, childs: 2},
                                      {age: 22, childs: 1},
                                      {age: 30, childs: 7}],
                            company_percentage: SECOND_COMPANY_PERCENTAGE,
                            has_dental_care: false
                          }
                        };

    beforeEach(() => {
        response = {
          json: sinon.spy()
        };
        policyServiceStub = sinon.stub(policyService, 'getPolicy');

    });

    afterEach(() => {
        policyServiceStub.restore();
    });

    it('should call json in response', () => {
      policyServiceStub.resolves(firstPolicyData);
      return PolicyController.getPolicy(request, response)
        .then(() => {
          expect(response.json).to.have.been.called;
        })
    });

    it('should return expected response with first data' , async () => {
      policyServiceStub.resolves(firstPolicyData);
      const expectedDentalTotalAmount = 0.563;
      const expectedHealthTotalAmount = 1.2785;
      const expectedPolicyTotalAmount = expectedDentalTotalAmount + expectedHealthTotalAmount;
      const expectedCostToCompany = expectedPolicyTotalAmount * FIRST_COMPANY_PERCENTAGE / 100;
      const expectedDentalCopagoByWorker = [0.0585, 0.036, 0.0744];
      const expectedHealthCopagoByWorker = [0.13188, 0.08370000000000001, 0.16796999999999998];
      const expectedDentalCare = firstPolicyData.policy.has_dental_care;

      return PolicyController.getPolicy(request, response)
        .then(() => {
          expect(response.json).to.have.been.calledWith(OK, {
                costToCompany: expectedCostToCompany,
                companyPercentage: FIRST_COMPANY_PERCENTAGE,
                currency: CURRENCY,
                dentalTotalAmount: expectedDentalTotalAmount,
                healthTotalAmount: expectedHealthTotalAmount,
                dentalCopagoByWorker: expectedDentalCopagoByWorker,
                healthCopagoByWorker: expectedHealthCopagoByWorker,
                totalPolicyAmount: expectedPolicyTotalAmount,
                hasDentalCare: expectedDentalCare
              });
        })
    });

    it('should return expected response with second data' , async () => {
      policyServiceStub.resolves(secondPolicyData);
      const expectedDentalTotalAmount = 1.006;
      const expectedHealthTotalAmount = 2.278;
      const expectedPolicyTotalAmount = expectedDentalTotalAmount + expectedHealthTotalAmount;
      const expectedCostToCompany = expectedPolicyTotalAmount * SECOND_COMPANY_PERCENTAGE / 100;
      const expectedDentalCopagoByWorker = [0.048, 0.07800000000000001, 0.0992, 0.07800000000000001, 0.0992];
      const expectedHealthCopagoByWorker = [0.1116, 0.17584, 0.22395999999999996, 0.17584, 0.22395999999999996];
      const expectedDentalCare = secondPolicyData.policy.has_dental_care;

      return PolicyController.getPolicy(request, response)
        .then(() => {
          expect(response.json).to.have.been.calledWith(OK, {
                costToCompany: expectedCostToCompany,
                companyPercentage: SECOND_COMPANY_PERCENTAGE,
                currency: CURRENCY,
                dentalTotalAmount: expectedDentalTotalAmount,
                healthTotalAmount: expectedHealthTotalAmount,
                dentalCopagoByWorker: expectedDentalCopagoByWorker,
                healthCopagoByWorker: expectedHealthCopagoByWorker,
                totalPolicyAmount: expectedPolicyTotalAmount,
                hasDentalCare: expectedDentalCare
              });
        })
    });

    it('should return expected response without dental cost when has_dental_care is false' , async () => {
      policyServiceStub.resolves(secondPolicyDataWithoutDentalCare);
      const expectedDentalTotalAmount = 0;
      const expectedHealthTotalAmount = 2.278;
      const expectedPolicyTotalAmount = expectedDentalTotalAmount + expectedHealthTotalAmount;
      const expectedCostToCompany = expectedPolicyTotalAmount * SECOND_COMPANY_PERCENTAGE / 100;
      const expectedDentalCopagoByWorker = 0;
      const expectedHealthCopagoByWorker = [0.1116, 0.17584, 0.22395999999999996, 0.17584, 0.22395999999999996];
      const expectedDentalCare = secondPolicyDataWithoutDentalCare.policy.has_dental_care;

      return PolicyController.getPolicy(request, response)
        .then(() => {
          expect(response.json).to.have.been.calledWith(OK, {
                costToCompany: expectedCostToCompany,
                companyPercentage: SECOND_COMPANY_PERCENTAGE,
                currency: CURRENCY,
                dentalTotalAmount: expectedDentalTotalAmount,
                healthTotalAmount: expectedHealthTotalAmount,
                dentalCopagoByWorker: expectedDentalCopagoByWorker,
                healthCopagoByWorker: expectedHealthCopagoByWorker,
                totalPolicyAmount: expectedPolicyTotalAmount,
                hasDentalCare: expectedDentalCare
              });
        })
    });

});
