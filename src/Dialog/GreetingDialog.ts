import * as builder from 'botbuilder';
import { Greeting as Greeting } from '../Greeting/Greeting';

export class GreetingDialog extends Array<builder.IDialogWaterfallStep> {

	constructor() {

		super();
		this.push(this.SayHello);
	}

	private SayHello = function(session: builder.Session, result?: any | builder.IDialogResult<any>, skip?: (results?: builder.IDialogResult<any>) => void): any{
			session.send(new Greeting().Phrases);
	};
}