import * as request from 'request-promise';
import { ILoginResponse as ILoginResponse } from './ILoginResponse';
import { LoginRequest as LoginRequest } from './LoginRequest';

export class RestClient {

	public async GetLoginResponse(): Promise<ILoginResponse> {

		const response = await request(new LoginRequest().UriOptions);
		return Promise.resolve<ILoginResponse>(response);
	}
}