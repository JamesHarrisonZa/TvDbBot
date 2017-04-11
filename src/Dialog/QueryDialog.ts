import * as builder from 'botbuilder';
import { RequestRestClient as RequestRestClient } from '../Rest/Client/RequestRestClient';
import { SearchSeriesRequest as SearchSeriesRequest } from '../Rest/Requests/TvDb/SearchSeriesRequest';
import { ISearchSeriesResponse as ISearchSeriesResponse } from '../Rest/Responses/TvDb/ISearchSeriesResponse';

export class QueryDialog extends Array<builder.IDialogWaterfallStep> {

	constructor() {

		super();
		this.push(this.RunQuery);
	}

	private RunQuery = function(session: builder.Session, result?: any | builder.IDialogResult<any>, skip?: (results?: builder.IDialogResult<any>) => void): any{

		var accessToken = session.userData.accessToken;

		//Get Entities
		var action = builder.EntityRecognizer.findEntity(result.entities, 'Action');
		var seriesDetails = builder.EntityRecognizer.findAllEntities(result.entities, 'SeriesDetail');
		var series = builder.EntityRecognizer.findAllEntities(result.entities, 'Series');

		//Get Output
		var output = '--<< LUIS results >>--';
		if (action) {
			output += '\n\n Action: ' + action.entity;
		}
		if (seriesDetails.length !== 0) {
			var seriesDetailsEntities = this.getEntitiesFromCollection(seriesDetails);
			output += '\n\n SeriesDetail: ' + seriesDetailsEntities;
		}
		if (series.length !== 0) {
			var seriesEntities = this.getEntitiesFromCollection(series);
			output += '\n\n Series: ' + seriesEntities;
		}

		//Experimenting
		var restClient = new RequestRestClient();
		var searchSeriesRequest = new SearchSeriesRequest(accessToken, 'Sopranos');
		restClient.Execute<ISearchSeriesResponse>(searchSeriesRequest)
			.then(searchSeriesResponse => {
				var data = searchSeriesResponse.data;
				var seriesName = searchSeriesResponse.data[0].seriesName;
				var seriesId = searchSeriesResponse.data[0].id;
				session.send('Found Series!: ' + seriesName);
			});

		session.send(output);
	};

	private getEntitiesFromCollection = function (collection: Array<builder.IEntity>): Array<string> {
		var entities = collection.map((item) => {
			return item.entity;
		});
		return entities;
	};
}