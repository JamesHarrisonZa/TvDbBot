export interface ISearchSeriesResponse {
	readonly data: ISearchSeriesData[];
}

export interface ISearchSeriesData {
	readonly aliases: string[];
	readonly banner: string;
	readonly firstAired: string;
	readonly id: number;
	readonly network: string;
	readonly overview: string;
	readonly seriesName: string;
	readonly status: string;
}