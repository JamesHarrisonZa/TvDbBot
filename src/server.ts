import * as restify from 'restify';
import * as builder from 'botbuilder';
import { GreetingDialog as GreetingDialog } from './Dialog/GreetingDialog';
import { ApologyDialog as ApologyDialog } from './Dialog/ApologyDialog';
import { QueryDialog as QueryDialog } from './Dialog/QueryDialog';
import { AlertDialog as AlertDialog } from './Dialog/AlertDialog';

import { RequestRestClient as RequestRestClient } from './Rest/Client/RequestRestClient';
import { LoginRequest as LoginRequest } from './Rest/Requests/TvDb/LoginRequest';
import { ILoginResponse as ILoginResponse } from './Rest/Responses/TvDb/ILoginResponse';

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

//Middleware to get new access tokens
bot.use({
	botbuilder: (session, next) => {

		try {
			if (!session.userData.accessToken) {
				var restClient = new RequestRestClient();
				var loginRequest = new LoginRequest();
				restClient.Execute<ILoginResponse>(loginRequest)
					.then(loginResponse => {
						session.userData.accessToken = loginResponse.token;
						session.send('Ready to anwser your questions'); //NOTE: if you dont do this, the session state doesnt get updated properly.
					});
			}
			return next();
		} catch (exception) {
			session.send('Something went wrong :(' + exception);
		}
	},
});

// Create LUIS recognizer that points at our model and add it as the root '/' dialog for our Cortana Bot.
var model = 'https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/79e0d6a8-357b-4f9c-a7f6-85304ad5c675?subscription-key=69907932bde64aa091e26aaf99f8fb4a&verbose=true&timezoneOffset=0.0&spellCheck=true&q=';
var recognizer = new builder.LuisRecognizer(model);
var dialog = new builder.IntentDialog({ recognizers: [recognizer] });

// Create dialogs
bot.dialog('/', dialog);

dialog.onDefault(new ApologyDialog());

dialog.matches('Greet', new GreetingDialog());

dialog.matches('Query', new QueryDialog());

dialog.matches('Alert', new AlertDialog());