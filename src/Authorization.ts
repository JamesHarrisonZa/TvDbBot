import { RestClient as RestClient } from './RestClient';

export class Authorization {

	public Token: string;

	constructor() {

		//Make api call
		var restClient = new RestClient();
		var loginResponse = restClient.GetLoginResponse()
			.then(loginResponse => {

				this.Token = loginResponse.token;
			});
	}
}