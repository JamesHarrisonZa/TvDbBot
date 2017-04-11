import * as request from 'request';
import { RequestRequest as RequestRequest } from '../RequestRequest';

export class SeriesIdEpisodesSummaryRequest extends RequestRequest {
	constructor(accessToken: string, seriesId: number) {

		const uriOptions = {
			uri: 'https://api.thetvdb.com/series/' + seriesId+ '/episodes/summary',
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