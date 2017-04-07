import * as request from 'request-promise';
import { ILoginResponse as ILoginResponse } from './ILoginResponse';

export class RestClient {

	public async GetLoginResponse(): Promise<ILoginResponse> {

		//ToDo: Refactor into request object
		var postData = {
			apikey: '07911F113B4FBCBD',
			userkey: '384E1499ABB96440',
			username: 'JamesHarrisonZa'
		};

		const uriOptions = {
			url: 'https://api.thetvdb.com/login',
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: postData,
			json: true,
		};

		const response = await request(uriOptions);
		return Promise.resolve<ILoginResponse>(response);
	}
}