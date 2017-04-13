import { IRestClient } from '../Rest/Client/IRestClient';
import { SearchSeriesRequest } from '../Rest/Requests/TvDb/SearchSeriesRequest';
import { ISearchSeriesResponse } from '../Rest/Responses/TvDb/ISearchSeriesResponse';
import { SeriesIdEpisodesSummaryRequest } from '../Rest/Requests/TvDb/SeriesIdEpisodesSummaryRequest';
import { ISeriesIdEpisodesSummaryResponse } from '../Rest/Responses/TvDb/ISeriesIdEpisodesSummaryResponse';

export class Query {

	private _restClient: IRestClient;
	private _accessToken: string;

	constructor(restClient: IRestClient, accessToken: string) {

		this._restClient = restClient;
		this._accessToken = accessToken;
	}

	public async GetSeries(seriesToSearch: string): Promise<SeriesResult[]> {

		const searchSeriesRequest = new SearchSeriesRequest(this._accessToken, seriesToSearch);
		const searchSeriesResponse = await this._restClient.Execute<ISearchSeriesResponse>(searchSeriesRequest);

		const data = searchSeriesResponse.data;
		const seriesName = searchSeriesResponse.data[0].seriesName;
		const seriesId = searchSeriesResponse.data[0].id;

		const seriesResults = searchSeriesResponse.data.map((searchSeriesData) => {
			return new SeriesResult(searchSeriesData.id, searchSeriesData.seriesName);
		});

		return seriesResults;
	}

	public async GetLatestSeason(seriesId: number): Promise<number> {

		const seriesIdEpisodesSummaryRequest = new SeriesIdEpisodesSummaryRequest(this._accessToken, seriesId);
		const seriesIdEpisodesSummaryResponse = await this._restClient.Execute<ISeriesIdEpisodesSummaryResponse>(seriesIdEpisodesSummaryRequest);
		const airedSeasons = seriesIdEpisodesSummaryResponse.data.airedSeasons;

		//Get Latest Season
		const seasonNumbers = airedSeasons.map((seasonString) => {
			return parseInt(seasonString, 10);
		});
		function numberAs(a: number, b: number): number {
			return a - b;
		}
		const sortedSeasons = seasonNumbers.sort(numberAs);
		const latestSeason = sortedSeasons[sortedSeasons.length - 1];
		return latestSeason;
	}
}

class SeriesResult {
	public Id: number;
	public Name: string;

	constructor(id: number, name: string) {
		this.Id = id;
		this.Name = name;
	}
}