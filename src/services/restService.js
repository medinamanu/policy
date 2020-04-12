import axios from 'axios';

export default {
	send: (options, timeOut=3000) => new Promise((resolve, reject) => {
		axios.request({
			method: options.method,
			url: options.url,
			headers: options.headers,
			timeout: timeOut,
		})
			.then((response) => {
				resolve(response.data);
			})
			.catch((error) => {
				reject(error);
			});
	}),
};
