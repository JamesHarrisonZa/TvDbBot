import * as builder from 'botbuilder';
import { Help } from '../Message/Help';

export class HelpDialog extends Array<builder.IDialogWaterfallStep> {

	constructor() {

		super();
		this.push(this.help);
	}

	private help = function(session: builder.Session, result?: any | builder.IDialogResult<any>, skip?: (results?: builder.IDialogResult<any>) => void): any {
			session.send(new Help().phrases);
	};
}