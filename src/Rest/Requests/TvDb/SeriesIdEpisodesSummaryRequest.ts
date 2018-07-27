import { Request } from '../Request';

export class SeriesIdEpisodesSummaryRequest extends Request {
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