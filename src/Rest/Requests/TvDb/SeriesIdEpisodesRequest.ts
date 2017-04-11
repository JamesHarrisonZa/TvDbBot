import * as request from 'request';
import { RequestRequest as RequestRequest } from '../RequestRequest';

export class SeriesIdEpisodesRequest extends RequestRequest {
	constructor(accessToken: string, seriesId: number, seriesIdEpisodesQuery?: SeriesIdEpisodesQuery) {

		let query = new Query(seriesIdEpisodesQuery).String;

		const uriOptions = {
			uri: 'https://api.thetvdb.com/series/' + seriesId+ '/episodes' + query,
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

class Query {

	public String: string;

	constructor(seriesIdEpisodesQuery: SeriesIdEpisodesQuery) {
		this.String = this.GetQueryString(seriesIdEpisodesQuery);
	}

	private GetQueryString(seriesIdEpisodesQuery: SeriesIdEpisodesQuery): string {
		if(!seriesIdEpisodesQuery) {
			return '';
		}
		let queryString = '/query?';
		//ToDo: Potentially check for more properties to query on. array.join('&')?
		if(seriesIdEpisodesQuery.airedSeason) {
			queryString += 'airedSeason=' + seriesIdEpisodesQuery.airedSeason;
		}
		return queryString;
	}
}

export class SeriesIdEpisodesQuery {

	public readonly airedSeason?: number;
    public readonly airedEpisode?: number;
    public readonly seriesId?: number;
    public readonly imdbId?: number;
    public readonly dvdSeason?: number;
    public readonly dvdEpisode?: number;
    public readonly absoluteNumber?: number;
    public readonly page?: number;
    public readonly firstAired?: string;

	constructor(airedSeason: number) {
		this.airedSeason = airedSeason;
	}
}