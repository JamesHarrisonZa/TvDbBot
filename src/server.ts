import * as restify from 'restify';
import * as builder from 'botbuilder';
import { GreetingDialog } from './Dialog/GreetingDialog';
import { ApologyDialog } from './Dialog/ApologyDialog';
import { QueryDialog } from './Dialog/QueryDialog';
import { AlertDialog } from './Dialog/AlertDialog';
import { HelpDialog } from './Dialog/HelpDialog';
import { JokeDialog } from './Dialog/JokeDialog';
import { RequestRestClient } from './Rest/Client/RequestRestClient';
import { LoginRequest } from './Rest/Requests/TvDb/LoginRequest';
import { ILoginResponse } from './Rest/Responses/TvDb/ILoginResponse';

// Setup Restify Server
const server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 4242, () => {
	console.log('%s listening to %s', server.name, server.url);
});

// Create chat bot
const connector = new builder.ChatConnector({
	appId: process.env.MICROSOFT_APP_ID,
	appPassword: process.env.MICROSOFT_APP_PASSWORD
});
const bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

// Create LUIS recognizer that points at our model and add it as the root '/' dialog for our Cortana Bot.
const model = 'https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/79e0d6a8-357b-4f9c-a7f6-85304ad5c675?subscription-key=69907932bde64aa091e26aaf99f8fb4a&verbose=true&timezoneOffset=0.0&spellCheck=true&q=';
const recognizer = new builder.LuisRecognizer(model);
const dialog = new builder.IntentDialog({ recognizers: [recognizer] });

//Getting a new access token Every 24 Hours
setInterval(setNewAccessToken, 86400000);
var accessToken;
function setNewAccessToken(): void {
	const restClient = new RequestRestClient();
	var loginRequest = new LoginRequest();
	restClient.Execute<ILoginResponse>(loginRequest)
		.then(loginResponse => {
			accessToken = loginResponse.token;
		});
}
setNewAccessToken();

//Middleware to use new access tokens
bot.use({
	botbuilder: (session, next) => {

		session.userData.accessToken = accessToken;
		return next();
	},
});

// Create dialogs
bot.dialog('/', dialog);

dialog.onDefault(new ApologyDialog());

dialog.matches('Greet', new GreetingDialog());

dialog.matches('Joke', new JokeDialog());

dialog.matches('Query', new QueryDialog());

dialog.matches('Alert', new AlertDialog());

dialog.matches('Help', new HelpDialog());