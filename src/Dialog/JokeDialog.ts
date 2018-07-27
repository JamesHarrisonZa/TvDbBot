import * as builder from 'botbuilder';
import { Joke } from '../Message/Joke';

export class JokeDialog extends Array<builder.IDialogWaterfallStep> {

	constructor() {

		super();
		this.push(this.joke);
	}

	private joke = function (session: builder.Session, result?: any | builder.IDialogResult<any>, skip?: (results?: builder.IDialogResult<any>) => void): any {
		session.send(new Joke().phrases);
	};
}