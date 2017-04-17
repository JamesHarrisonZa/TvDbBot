import * as builder from 'botbuilder';
import { Greeting } from '../Message/Greeting';

export class GreetingDialog extends Array<builder.IDialogWaterfallStep> {

	constructor() {

		super();
		this.push(this.SayHello);
	}

	private SayHello = function(session: builder.Session, result?: any | builder.IDialogResult<any>, skip?: (results?: builder.IDialogResult<any>) => void): any{
			session.send(new Greeting().Phrases);
	};
}