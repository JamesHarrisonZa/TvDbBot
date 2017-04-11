import * as builder from 'botbuilder';
import * as _ from 'underscore';
import { RequestRestClient as RequestRestClient } from '../Rest/Client/RequestRestClient';

import { SearchSeriesRequest as SearchSeriesRequest } from '../Rest/Requests/TvDb/SearchSeriesRequest';
import { ISearchSeriesResponse as ISearchSeriesResponse } from '../Rest/Responses/TvDb/ISearchSeriesResponse';

import { SeriesIdEpisodesSummaryRequest as SeriesIdEpisodesSummaryRequest } from '../Rest/Requests/TvDb/SeriesIdEpisodesSummaryRequest';
import { ISeriesIdEpisodesSummaryResponse as ISeriesIdEpisodesSummaryResponse } from '../Rest/Responses/TvDb/ISeriesIdEpisodesSummaryResponse';

import { SeriesIdEpisodesRequest as SeriesIdEpisodesRequest } from '../Rest/Requests/TvDb/SeriesIdEpisodesRequest';
import { ISeriesIdEpisodesResponse as ISeriesIdEpisodesResponse } from '../Rest/Responses/TvDb/ISeriesIdEpisodesResponse';
import { SeriesIdEpisodesQuery as SeriesIdEpisodesQuery } from '../Rest/Requests/TvDb/SeriesIdEpisodesRequest';

export class QueryDialog extends Array<builder.IDialogWaterfallStep> {

	constructor() {

		super();
		this.push(this.RunQuery);
	}

	private getEntitiesFromCollection = function (collection: Array<builder.IEntity>): Array<string> {
		const entities = collection.map((item) => {
			return item.entity;
		});
		return entities;
	};

	private RunQuery = function (session: builder.Session, result?: any | builder.IDialogResult<any>, skip?: (results?: builder.IDialogResult<any>) => void): any {

		const accessToken = session.userData.accessToken;

		//Get Entities
		const seriesDetails = builder.EntityRecognizer.findAllEntities(result.entities, 'SeriesDetail');
		const series = builder.EntityRecognizer.findAllEntities(result.entities, 'Series');

		//Displaying Output. Will remove
		let output = '--<< LUIS results >>--';
		if (seriesDetails.length !== 0) {
			const seriesDetailsEntities = this.getEntitiesFromCollection(seriesDetails);
			output += '\n\n SeriesDetail: ' + seriesDetailsEntities;
		}
		if (series.length !== 0) {
			const seriesEntities = this.getEntitiesFromCollection(series);
			output += '\n\n Series: ' + seriesEntities;
		}
		//session.send(output);

		if (series.length === 0) {
			return;
		}

		const seriesEntities = this.getEntitiesFromCollection(series);
		const firstSeries = seriesEntities[0]; //Taking first. But must make a plan to handle choosing from multiple results. Let the user click which one?

		const restClient = new RequestRestClient();
		const searchSeriesRequest = new SearchSeriesRequest(accessToken, firstSeries);
		restClient.Execute<ISearchSeriesResponse>(searchSeriesRequest)
			.then(searchSeriesResponse => {
				const data = searchSeriesResponse.data;
				const seriesName = searchSeriesResponse.data[0].seriesName;
				const seriesId = searchSeriesResponse.data[0].id;
				//session.send('Found Series!: %s, with Id: %s', seriesName, seriesId);

				//Can potentialy add check for "status" === "Continuing" before continuing

				const seriesIdEpisodesSummaryRequest = new SeriesIdEpisodesSummaryRequest(accessToken, seriesId);
				restClient.Execute<ISeriesIdEpisodesSummaryResponse>(seriesIdEpisodesSummaryRequest)
					.then(seriesIdEpisodesSummaryResponse => {
						const airedSeasons = seriesIdEpisodesSummaryResponse.data.airedSeasons;

						//Get Latest Season
						const seasonNumbers = airedSeasons.map((seasonString) => {
							return parseInt(seasonString, 10);
						});
						function numberAs(a: number, b: number) {
							return a - b;
						}
						const sortedSeasons = seasonNumbers.sort(numberAs);
						const latestSeason = sortedSeasons[sortedSeasons.length - 1];
						//session.send('Found latestSeason!: %s', latestSeason);

						const seriesIdEpisodesQuery = new SeriesIdEpisodesQuery(latestSeason);
						const seriesIdEpisodesRequest = new SeriesIdEpisodesRequest(accessToken, seriesId, seriesIdEpisodesQuery);
						restClient.Execute<ISeriesIdEpisodesResponse>(seriesIdEpisodesRequest)
							.then((seriesIdEpisodesResponse) => {
								const episodesData = seriesIdEpisodesResponse.data;

								var todaysDate = new Date();
								const unairedEpisodes = episodesData.filter((episodeData)=> {
									var airedDate = new Date(episodeData.firstAired);
									return airedDate > todaysDate;
								});
								var sortedUnairedEpisodes = _(unairedEpisodes).sortBy((unairedEpisode)=> {
									return unairedEpisode.firstAired;
								});
								var firstUnairedEpisode = sortedUnairedEpisodes[0];
								session.send('Episode: %s airs on: %s \n\n %s \n\n %s', firstUnairedEpisode.airedEpisodeNumber, firstUnairedEpisode.firstAired, firstUnairedEpisode.episodeName, firstUnairedEpisode.overview);
							});
					});
			});
	};
}