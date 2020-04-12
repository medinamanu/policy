import RestService from './restService';

export default {
	getPolicy: () => new Promise((resolve, reject) => {
    const policyDataUri = 'https://dn8mlk7hdujby.cloudfront.net/interview/insurance/policy';
		const options = {
			url: policyDataUri,
			method: 'GET',
			header:{}
		};

		RestService.send(options)
			.then((response) => {
				resolve(response);
			})
			.catch((error) => {
        console.log("error response: ", error);
				reject(error);
			});
	})
};
