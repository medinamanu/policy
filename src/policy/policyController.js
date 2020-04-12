import policyService from "../services/policyService";
import { OK } from 'http-status';

const LIMIT_AGE = 65;
const CURRENCY = 'UF';

const dentalTaxWithoutChildrens = 0.12;
const dentalTaxWithOneChild = 0.1950;
const dentalTaxWithTwoOMoreChildrens = 0.2480;

const healthTaxWithoutChildrens = 0.279;
const healthTaxWithOneChild = 0.4396;
const healthTaxWithTwoOMoreChildrens = 0.5599;

const PolicyController = {
    async getPolicy(request, response) {
      let policyClientResponse;
      try {
          policyClientResponse = await policyService.getPolicy();
      } catch (err) {
          response.sendStatus(INTERNAL_SERVER_ERROR);
          return;
      };

      const workers = policyClientResponse.policy.workers;
      const workersUnderLimitAge = workers.filter( workers => workers.age <= LIMIT_AGE);
      const companyPercentage = policyClientResponse.policy.company_percentage;
      const hasDentalCare = policyClientResponse.policy.has_dental_care;
      const dentalTotalAmount = hasDentalCare ? this.getTotalDentalAmount(workersUnderLimitAge) : 0;
      const healthTotalAmount = this.getTotalHealthAmount(workersUnderLimitAge);
      const totalPolicyAmount = this.getTotalPolicyAmount(dentalTotalAmount, healthTotalAmount);
      const dentalCopagoByWorker = hasDentalCare ? this.getDentalCopagoByWorker(companyPercentage, workersUnderLimitAge) : 0;
      const healthCopagoByWorker = this.getHealthCopagoByWorker(companyPercentage, workersUnderLimitAge);
      const costToCompany = (companyPercentage*totalPolicyAmount)/100;

      response.json(OK, {
        totalPolicyAmount,
        dentalTotalAmount,
        healthTotalAmount,
        currency: CURRENCY,
        companyPercentage,
        costToCompany,
        dentalCopagoByWorker,
        healthCopagoByWorker,
        hasDentalCare
      });
    },

    getDentalCopagoByWorker(companyPercentage, workers) {
      return workers.map( worker => this.getDentalTaxByWorker(worker) * (100 - companyPercentage) / 100);
    },

    getDentalTaxByWorker(worker) {
      return this.getDentalTaxByChildren(worker.childs);
    },

    getDentalTaxByChildren(childs) {
      if (childs === 0) {
        return dentalTaxWithoutChildrens;
      }
      if (childs === 1) {
        return dentalTaxWithOneChild;
      }
      if (childs >= 2) {
        return dentalTaxWithTwoOMoreChildrens;
      }
    },

    getHealthCopagoByWorker(companyPercentage, workers) {
      return workers.map( worker => this.getHealthTaxByWorker(worker) * (100 - companyPercentage) / 100);
    },

    getHealthTaxByWorker(worker) {
      return this.getHealthTaxByChildren(worker.childs);
    },

    getHealthTaxByChildren(childs) {
      if (childs === 0) {
        return healthTaxWithoutChildrens;
      }
      if (childs === 1) {
        return healthTaxWithOneChild;
      }
      if (childs >= 2) {
        return healthTaxWithTwoOMoreChildrens;
      }
    },

    getTotalDentalAmount(workers) {
      let dentalTax = 0;
      return workers.reduce( (accumulateDentalAmount, currentWorker) => {
        dentalTax = this.getDentalTaxByChildren(currentWorker.childs);
        return accumulateDentalAmount + dentalTax;
      }, 0);
    },

    getTotalHealthAmount(workers) {
      let healthTax = 0;
      return workers.reduce( (accumulateHealthAmount, currentWorker) => {
        healthTax = this.getHealthTaxByChildren(currentWorker.childs);
        return accumulateHealthAmount + healthTax;
        }, 0);
      },

      getTotalPolicyAmount(dentalTotalAmount, healthTotalAmount) {
        return dentalTotalAmount + healthTotalAmount;
      }
    }


export default PolicyController;
