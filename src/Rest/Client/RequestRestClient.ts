import * as requestPromise from 'request-promise';
import { ILoginResponse as ILoginResponse } from '../Responses/ILoginResponse';
import { RequestRequest as RequestRequest } from '../Requests/RequestRequest';
import { IRestClient as IRestClient } from './IRestClient';

//Specific implementation with Request and Request-Promise npm package
export class RequestRestClient implements IRestClient {

	async Execute<TResponse>(requestRequest: RequestRequest): Promise<TResponse> {
		const response = await requestPromise(requestRequest.UriOptions);
		return Promise.resolve<TResponse>(response);
	}
}