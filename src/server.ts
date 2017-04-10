import * as restify from 'restify';
import * as builder from 'botbuilder';
import { Greeting as Greeting } from './Greeting/Greeting';
import { RequestRestClient as RequestRestClient } from './Rest/Client/RequestRestClient';
import { LoginRequest as LoginRequest } from './Rest/Requests/TvDb/LoginRequest';
import { SearchSeriesRequest as SearchSeriesRequest } from './Rest/Requests/TvDb/SearchSeriesRequest';
import { ILoginResponse as ILoginResponse } from './Rest/Responses/TvDb/ILoginResponse';
import { ISearchSeriesResponse as ISearchSeriesResponse } from './Rest/Responses/TvDb/ISearchSeriesResponse';

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 4242, () => {
	console.log('%s listening to %s', server.name, server.url);
});

// Create chat bot
var connector = new builder.ChatConnector({
	appId: process.env.MICROSOFT_APP_ID,
	appPassword: process.env.MICROSOFT_APP_PASSWORD
});
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

// Create LUIS recognizer that points at our model and add it as the root '/' dialog for our Cortana Bot.
var model = 'https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/79e0d6a8-357b-4f9c-a7f6-85304ad5c675?subscription-key=69907932bde64aa091e26aaf99f8fb4a&verbose=true&timezoneOffset=0.0&spellCheck=true&q=';
var recognizer = new builder.LuisRecognizer(model);
var dialog = new builder.IntentDialog({ recognizers: [recognizer] });

// Create dialogs
bot.dialog('/', dialog);
dialog.onDefault(builder.DialogAction.send('I\'m sorry I didn\'t understand.'));

dialog.matches('Greet',
	(session, args, next) => {

		if(!session.privateConversationData.accessToken) {
			var restClient = new RequestRestClient();
			var loginRequest = new LoginRequest();
			restClient.Execute<ILoginResponse>(loginRequest)
				.then(loginResponse => {
					session.privateConversationData.accessToken = loginResponse.token;
					session.send(new Greeting().Phrases);
				});
		}else {
			session.send(new Greeting().Phrases);
		}
	});

dialog.matches('Query',
	(session, args, next) => {

		var accessToken = session.privateConversationData.accessToken;
		console.log(accessToken);

		//Get Entities
		var action = builder.EntityRecognizer.findEntity(args.entities, 'Action');
		var seriesDetails = builder.EntityRecognizer.findAllEntities(args.entities, 'SeriesDetail');
		var series = builder.EntityRecognizer.findAllEntities(args.entities, 'Series');

		//Get Output
		var output = '--<< LUIS results >>--';
		if (action) {
			output += '\n\n Action: ' + action.entity;
		}
		if (seriesDetails.length !== 0) {
			var seriesDetailsEntities = getEntitiesFromCollection(seriesDetails);
			output += '\n\n SeriesDetail: ' + seriesDetailsEntities;
		}
		if (series.length !== 0) {
			var seriesEntities = getEntitiesFromCollection(series);
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
	});

dialog.matches('Alert',
	(session, args, next) => {

		session.send('ALERT: ToDo');
	});

// Private methods
// ToDo: move somewhere

function getEntitiesFromCollection(collection: Array<builder.IEntity>): Array<string> {
	var entities = collection.map((item) => {
		return item.entity;
	});
	return entities;
}