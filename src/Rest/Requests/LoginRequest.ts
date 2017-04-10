import { RequestRequest as RequestRequest } from './RequestRequest';

export class LoginRequest extends RequestRequest {

	constructor() {

		var postData = {
			apikey: '07911F113B4FBCBD',
			userkey: '384E1499ABB96440',
			username: 'JamesHarrisonZa'
		};

		const uriOptions = {
			uri: 'https://api.thetvdb.com/login',
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: postData,
			json: true,
		};

		super(uriOptions);
	}
}