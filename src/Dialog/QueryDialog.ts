import * as builder from 'botbuilder';
import * as _ from 'underscore';
import { RequestRestClient } from '../Rest/Client/RequestRestClient';
import { Query } from '../Actions/Query';

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

	private RunQuery = async function (session: builder.Session, result?: any | builder.IDialogResult<any>, skip?: (results?: builder.IDialogResult<any>) => void): Promise<any> {

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
			session.send('Could not find that series :('); //ToDo: Add random inputs
			return;
		}

		const luisOutput = this.getEntitiesFromCollection(series).join(' ');
		const seriesToSearch = luisOutput.replace(' ’ ','').replace(' \' ', ''); //Luis is adding spaces around quotes, need to remove quotes for the api

		const restClient = new RequestRestClient();
		const query = new Query(restClient, accessToken);

		const seriesResults = await query.GetSeries(seriesToSearch);
		const seriesId = seriesResults[0].Id; //ToDo: Check if multiple choices //ToDo: potentialy add check for "status" === "Continuing" before continuing
		const latestSeason = await query.GetLatestSeason(seriesId);
		const nextEpisodeDate = await query.GetNextEpisodeDate(seriesId, latestSeason);

		session.send(nextEpisodeDate.toDateString());
	};
}