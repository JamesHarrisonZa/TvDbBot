export interface ISeriesIdEpisodesSummaryResponse {
	readonly data: ISeriesIdEpisodesSummaryData;
}

export interface ISeriesIdEpisodesSummaryData {
	readonly airedSeasons: string[];
	readonly airedEpisodes: string;
	readonly dvdSeasons: any[];
	readonly dvdEpisodes: string;
}