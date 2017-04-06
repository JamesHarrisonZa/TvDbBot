import * as restify from 'restify';
import * as builder from 'botbuilder';
import { Authorization as Authorization } from './Authorization';

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

dialog.matches('Query',
	(session, args, next) => {

		//Get Entities
		var action = builder.EntityRecognizer.findEntity(args.entities, 'Action');
		var seriesDetails = builder.EntityRecognizer.findAllEntities(args.entities, 'SeriesDetail');
		var series = builder.EntityRecognizer.findAllEntities(args.entities, 'Series');

		//Testing TS
		let authToken = new Authorization().Token;

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
		session.send(output);
	});

dialog.matches('Alert',
	(session, args, next) => {

		session.send('ALERT: ToDo');
	});

// Private methods
// ToDo: move somewhere

function getEntitiesFromCollection(collection: Array<builder.IEntity>): Array<string>  {
	var entities = collection.map((item) => {
		return item.entity;
	});
	return entities;
}