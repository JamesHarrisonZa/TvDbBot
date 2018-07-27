import * as requestPromise from 'request-promise';
import { IRestClient } from './IRestClient';
import { Request } from '../Requests/Request';

//Specific implementation with Request and Request-Promise npm package
export class RequestRestClient implements IRestClient {
	async execute<TResponse>(request: Request): Promise<TResponse> {
		const response = await requestPromise(request.uriOptions);
		return Promise.resolve<TResponse>(response);
	}
}