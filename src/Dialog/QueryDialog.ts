import * as builder from 'botbuilder';
import * as _ from 'underscore';
import { RequestRestClient as RequestRestClient } from '../Rest/Client/RequestRestClient';
import { SearchSeriesRequest as SearchSeriesRequest } from '../Rest/Requests/TvDb/SearchSeriesRequest';
import { ISearchSeriesResponse as ISearchSeriesResponse } from '../Rest/Responses/TvDb/ISearchSeriesResponse';
import { SeriesIdEpisodesSummaryRequest as SeriesIdEpisodesSummaryRequest } from '../Rest/Requests/TvDb/SeriesIdEpisodesSummaryRequest';
import { ISeriesIdEpisodesSummaryResponse as ISeriesIdEpisodesSummaryResponse } from '../Rest/Responses/TvDb/ISeriesIdEpisodesSummaryResponse';

export class QueryDialog extends Array<builder.IDialogWaterfallStep> {

	constructor() {

		super();
		this.push(this.RunQuery);
	}

	private getEntitiesFromCollection = function (collection: Array<builder.IEntity>): Array<string> {
		var entities = collection.map((item) => {
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
		session.send(output);

		if (series.length > 0) {
			const seriesEntities = this.getEntitiesFromCollection(series);
			const firstSeries = seriesEntities[0]; //Taking first. But must make a plan to handle choosing from multiple results. Let the user click which one?

			var restClient = new RequestRestClient();
			var searchSeriesRequest = new SearchSeriesRequest(accessToken, firstSeries);
			restClient.Execute<ISearchSeriesResponse>(searchSeriesRequest)
				.then(searchSeriesResponse => {
					var data = searchSeriesResponse.data;
					var seriesName = searchSeriesResponse.data[0].seriesName;
					var seriesId = searchSeriesResponse.data[0].id;
					session.send('Found Series!: %s, with Id: %s', seriesName, seriesId);

					//Can potentialy add check for "status" === "Continuing" before continuing

					var seriesIdEpisodesSummaryRequest = new SeriesIdEpisodesSummaryRequest(accessToken, seriesId);
					restClient.Execute<ISeriesIdEpisodesSummaryResponse>(seriesIdEpisodesSummaryRequest)
						.then(seriesIdEpisodesSummaryResponse => {
							var airedSeasons = seriesIdEpisodesSummaryResponse.data.airedSeasons;
							var sortedSeasons = _(airedSeasons).sortBy((seasonString)=> {
								return parseInt(seasonString, 10);
							});
							var latestSeason = sortedSeasons[sortedSeasons.length-1];
							session.send('Found latestSeason!: %s', latestSeason);
						});
				});
		}
	};
}