import * as builder from 'botbuilder';

export class AlertDialog extends Array<builder.IDialogWaterfallStep> {

	constructor() {

		super();
		this.push(this.setAlert);
	}

	private setAlert = function(session: builder.Session, result?: any | builder.IDialogResult<any>, skip?: (results?: builder.IDialogResult<any>) => void): any {

			//ToDo: Set Alert
			session.send('ALERT: ToDo');
	};
}