import { SeriesResult } from './SeriesResult';
import { IRestClient } from '../Rest/Client/IRestClient';
import { SearchSeriesRequest } from '../Rest/Requests/TvDb/SearchSeriesRequest';
import { ISearchSeriesResponse } from '../Rest/Responses/TvDb/ISearchSeriesResponse';
import { SeriesIdEpisodesSummaryRequest } from '../Rest/Requests/TvDb/SeriesIdEpisodesSummaryRequest';
import { ISeriesIdEpisodesSummaryResponse } from '../Rest/Responses/TvDb/ISeriesIdEpisodesSummaryResponse';
import { SeriesIdEpisodesRequest } from '../Rest/Requests/TvDb/SeriesIdEpisodesRequest';
import { ISeriesIdEpisodesResponse } from '../Rest/Responses/TvDb/ISeriesIdEpisodesResponse';

export class Query {

	private _restClient: IRestClient;
	private _accessToken: string;

	constructor(restClient: IRestClient, accessToken: string) {

		this._restClient = restClient;
		this._accessToken = accessToken;
	}

	public async GetSeries(seriesToSearch: string): Promise<Array<SeriesResult>> {

		const searchSeriesRequest = new SearchSeriesRequest(this._accessToken, seriesToSearch);
		const searchSeriesResponse = await this._restClient.Execute<ISearchSeriesResponse>(searchSeriesRequest);

		const seriesResults = searchSeriesResponse.data.map((p) => new SeriesResult(p.id, p.seriesName, p.status));
		return seriesResults;
	}

	public async GetLatestSeason(seriesId: number): Promise<number> {

		const seriesIdEpisodesSummaryRequest = new SeriesIdEpisodesSummaryRequest(this._accessToken, seriesId);
		const seriesIdEpisodesSummaryResponse = await this._restClient.Execute<ISeriesIdEpisodesSummaryResponse>(seriesIdEpisodesSummaryRequest);
		const airedSeasons = seriesIdEpisodesSummaryResponse.data.airedSeasons;

		const numberAs = (a: number, b: number) => a - b;
		const seasonNumbers = airedSeasons.map((p) => { return parseInt(p, 10); });
		const sortedSeasons = seasonNumbers.sort(numberAs);
		const latestSeason = sortedSeasons[sortedSeasons.length - 1];
		return latestSeason;
	}

	public async GetNextEpisodeDate(seriesId: number, season: number): Promise<Date> { //ToDo: Maybe return more info, overview ?

		const seriesIdEpisodesRequest = new SeriesIdEpisodesRequest(this._accessToken, seriesId, season);
		const episodesResponse = await this._restClient.Execute<ISeriesIdEpisodesResponse>(seriesIdEpisodesRequest);

		const episodesData = episodesResponse.data;

		const todaysDate = new Date();
		const sortedUnairedDates = episodesData
			.map((episodeData) => {
				return new Date(episodeData.firstAired);
			})
			.filter((airedDate) => {
				return airedDate >= todaysDate;
			})
			.sort();

		return sortedUnairedDates[0];
	}
}