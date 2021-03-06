import { Request } from '../Request';

export class LoginRequest extends Request {

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