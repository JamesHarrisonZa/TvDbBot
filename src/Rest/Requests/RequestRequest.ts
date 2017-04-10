import * as request from 'request';
import { IRequest as IRequest } from './IRequest';

export class RequestRequest implements IRequest {

	public readonly UriOptions: request.UriOptions;

	constructor(uriOptions: request.UriOptions) {
		this.UriOptions = uriOptions;
	}
}