import * as requestPromise from 'request-promise';
import { IRestClient } from './IRestClient';
import { RequestRequest } from '../Requests/RequestRequest';

//Specific implementation with Request and Request-Promise npm package
export class RequestRestClient implements IRestClient {
	async Execute<TResponse>(requestRequest: RequestRequest): Promise<TResponse> {
		const response = await requestPromise(requestRequest.UriOptions);
		return Promise.resolve<TResponse>(response);
	}
}