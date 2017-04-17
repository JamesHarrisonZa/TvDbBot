import * as builder from 'botbuilder';
import { Apology } from '../Message/Apology';

export class ApologyDialog extends Array<builder.IDialogWaterfallStep> {

	constructor() {

		super();
		this.push(this.Apologise);
	}

	private Apologise = function(session: builder.Session, result?: any | builder.IDialogResult<any>, skip?: (results?: builder.IDialogResult<any>) => void): any{
			session.send(new Apology().Phrases);
	};
}