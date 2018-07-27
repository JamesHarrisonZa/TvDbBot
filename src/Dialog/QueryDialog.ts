import * as builder from 'botbuilder';
import { Query } from '../Actions/Query';
import { RelativeDate } from '../Date/RelativeDate';
import { SeriesStatus } from '../Actions/SeriesStatus';
import { RequestRestClient } from '../Rest/Client/RequestRestClient';
import { SeriesOverApology } from '../Message/SeriesOverApology';
import { NoResultsApology } from '../Message/NoResultsApology';

export class QueryDialog extends Array<builder.IDialogWaterfallStep> {

	constructor() {

		super();
		this.push(this.runQuery);
	}

	private runQuery = async function (session: builder.Session, result?: any | builder.IDialogResult<any>, skip?: (results?: builder.IDialogResult<any>) => void): Promise<any> {

		const accessToken = session.userData.accessToken;

		//Get LUIS Entities
		const seriesDetails = builder.EntityRecognizer.findAllEntities(result.entities, 'SeriesDetail');
		const series = builder.EntityRecognizer.findAllEntities(result.entities, 'Series');

		this.logLuisEntities(seriesDetails, series);

		if (series.length === 0) {
			session.send(new NoResultsApology().phrases);
			return;
		}

		const luisOutput = this.getEntitiesFromCollection(series).join(' ');
		const seriesToSearch = luisOutput.replace(' ’ ', '').replace(' \' ', ''); //Luis is adding spaces around quotes, need to remove quotes for the api

		const restClient = new RequestRestClient();
		const query = new Query(restClient, accessToken);

		const seriesResults = await query.getSeries(seriesToSearch);
		const seriesResult = seriesResults[0]; //ToDo: Ask the user to choose if multiple choices

		if (seriesResult.Status === SeriesStatus.ended) {
			session.send(new SeriesOverApology().phrases);
			return;
		}

		const seriesId = seriesResult.Id;
		const latestSeason = await query.getLatestSeason(seriesId);
		const nextEpisodeDate = await query.getNextEpisodeDate(seriesId, latestSeason, new Date());

		if (!nextEpisodeDate) {
			session.send('Im sorry im not sure :(');
			return;
		}

		const relativeDate = new RelativeDate(new Date(), nextEpisodeDate).date;
		session.send(relativeDate);
	};

	private logLuisEntities(seriesDetails: any, series: any): void {

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
	}

	private getEntitiesFromCollection(collection: Array<builder.IEntity>): Array<string> {
		const entities = collection.map((item) => {
			return item.entity;
		});
		return entities;
	}
}