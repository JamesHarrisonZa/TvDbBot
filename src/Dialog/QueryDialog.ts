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
			output += '\n SeriesDetail: ' + seriesDetailsEntities;
		}
		if (series.length !== 0) {
			const seriesEntities = this.getEntitiesFromCollection(series);
			output += '\n Series: ' + seriesEntities;
		}
		console.log(output);

		if (series.length === 0) {
			return;
		}

		const luisOutput = this.getEntitiesFromCollection(series).join(' ');
		const seriesToSearch = luisOutput.replace(' ’ ','').replace(' \' ', ''); //Luis is adding spaces around quotes, need to remove quotes for the api

		const restClient = new RequestRestClient();
		const searchSeriesRequest = new SearchSeriesRequest(accessToken, seriesToSearch);
		console.log(searchSeriesRequest.UriOptions.uri);

		restClient.Execute<ISearchSeriesResponse>(searchSeriesRequest)
			.then(searchSeriesResponse => {
				const data = searchSeriesResponse.data; //Potentially need to handle choosing from multiple results. Let the user click which one?
				const seriesName = searchSeriesResponse.data[0].seriesName;
				const seriesId = searchSeriesResponse.data[0].id;

				//Can potentialy add check for "status" === "Continuing" before continuing

				const seriesIdEpisodesSummaryRequest = new SeriesIdEpisodesSummaryRequest(accessToken, seriesId);
				restClient.Execute<ISeriesIdEpisodesSummaryResponse>(seriesIdEpisodesSummaryRequest)
					.then(seriesIdEpisodesSummaryResponse => {
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

								//Displaying Output
								let queryOutput = 'Episode: ' + firstUnairedEpisode.airedEpisodeNumber + ' airs on: ' + firstUnairedEpisode.firstAired;
								if(firstUnairedEpisode.overview) {
									queryOutput += '\n\n Overview: ' + firstUnairedEpisode.overview;
								}

								session.send(queryOutput);
							});
					});
			});
	};
}