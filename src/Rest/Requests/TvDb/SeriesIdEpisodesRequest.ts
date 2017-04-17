import * as request from 'request';
import { RequestRequest } from '../RequestRequest';

export class SeriesIdEpisodesRequest extends RequestRequest {
	constructor(accessToken: string, seriesId: number, season: number) {

		const uriOptions = {
			uri: 'https://api.thetvdb.com/series/' + seriesId+ '/episodes/query?airedSeason=' + season,
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