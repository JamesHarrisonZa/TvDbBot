import { IRequest } from '../Requests/IRequest';

export interface IRestClient {
	Execute<TResponse>(request: IRequest): Promise<TResponse>;
}