export interface ISeriesIdEpisodesResponse {
	links: ILinks;
	data: IEpisodeData[];
}

export interface ILinks {
	first: number;
	last: number;
	next?: any;
	prev?: any;
}

export interface IEpisodeData {
	absoluteNumber?: any;
	airedEpisodeNumber: number;
	airedSeason: number;
	airedSeasonID: number;
	dvdEpisodeNumber?: any;
	dvdSeason?: any;
	episodeName: string;
	firstAired: string;
	id: number;
	language: ILanguage;
	lastUpdated: number;
	overview: string;
}

export interface ILanguage {
	episodeName: string;
	overview: string;
}