import { IRestClient } from '../Rest/Client/IRestClient';
import { SearchSeriesRequest } from '../Rest/Requests/TvDb/SearchSeriesRequest';
import { ISearchSeriesResponse } from '../Rest/Responses/TvDb/ISearchSeriesResponse';

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
}

class SeriesResult {
	public Id: number;
	public Name: string;

	constructor(id: number, name: string) {
		this.Id = id;
		this.Name = name;
	}
}