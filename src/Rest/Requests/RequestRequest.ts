import * as request from 'request';
import { IRequest } from './IRequest';

export class RequestRequest implements IRequest {

	public readonly UriOptions: RequestUriOptions;

	constructor(uriOptions: RequestUriOptions) {
		this.UriOptions = uriOptions;
	}
}

class RequestUriOptions {
	uri: string;
	method: string;
	headers: any;
	body: any;
	json: boolean;
}