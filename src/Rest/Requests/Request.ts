import { IRequest } from './IRequest';

export class Request implements IRequest {

	public readonly uriOptions: RequestUriOptions;

	constructor(uriOptions: RequestUriOptions) {
		this.uriOptions = uriOptions;
	}
}