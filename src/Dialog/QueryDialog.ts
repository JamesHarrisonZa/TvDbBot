import * as builder from 'botbuilder';
import * as _ from 'underscore';
import { Query } from '../Actions/Query';
import { RelativeDate } from '../Date/RelativeDate';
import { SeriesStatus } from '../Actions/SeriesStatus';
import { RequestRestClient } from '../Rest/Client/RequestRestClient';

export class QueryDialog extends Array<builder.IDialogWaterfallStep> {

	constructor() {

		super();
		this.push(this.RunQuery);
	}

	private RunQuery = async function (session: builder.Session, result?: any | builder.IDialogResult<any>, skip?: (results?: builder.IDialogResult<any>) => void): Promise<any> {

		try {
			const accessToken = session.userData.accessToken;

			//Get Entities
			const seriesDetails = builder.EntityRecognizer.findAllEntities(result.entities, 'SeriesDetail');
			const series = builder.EntityRecognizer.findAllEntities(result.entities, 'Series');

			//Debugging Output. Will remove
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
			const seriesToSearch = luisOutput.replace(' ’ ', '').replace(' \' ', ''); //Luis is adding spaces around quotes, need to remove quotes for the api

			const restClient = new RequestRestClient();
			const query = new Query(restClient, accessToken);

			const seriesResults = await query.GetSeries(seriesToSearch);
			var seriesResult = seriesResults[0]; //ToDo: Ask the user to choose if multiple choices

			if (seriesResult.Status === SeriesStatus.Ended) {
				session.send('Oh dear. That series has ended :('); //ToDo: Add random inputs
				return;
			}

			const seriesId = seriesResult.Id;
			const latestSeason = await query.GetLatestSeason(seriesId);
			const nextEpisodeDate = await query.GetNextEpisodeDate(seriesId, latestSeason);
			const relativeDate = new RelativeDate(new Date(), nextEpisodeDate).Date;
			session.send(relativeDate);
		} catch (ex) {
			session.send(ex);
		}
	};

	private getEntitiesFromCollection = function (collection: Array<builder.IEntity>): Array<string> {
		const entities = collection.map((item) => {
			return item.entity;
		});
		return entities;
	};
}