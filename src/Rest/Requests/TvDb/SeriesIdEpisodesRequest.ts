import { Request } from '../Request';

export class SeriesIdEpisodesRequest extends Request {
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