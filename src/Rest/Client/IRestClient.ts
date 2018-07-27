import { IRequest } from '../Requests/IRequest';

export interface IRestClient {
	execute<TResponse>(request: IRequest): Promise<TResponse>;
}