import * as request from 'request';
import { RequestRequest as RequestRequest } from '../RequestRequest';

export class SearchSeriesRequest extends RequestRequest {
	constructor(accessToken: string, name: string) {

		const uriOptions = {
			uri: 'https://api.thetvdb.com/search/series?name=' + name,
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + accessToken
			},
			body: undefined,
			json: true
		};

		super(uriOptions);
	}
}