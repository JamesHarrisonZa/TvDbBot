import { Request } from '../Request';

export class SearchSeriesRequest extends Request {
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