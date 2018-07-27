import { IMessage } from './IMessage';

export class SeriesOverApology implements IMessage {

	public readonly phrases;

	constructor() {
		this.phrases = this.getPhrases();
	}

	private getPhrases(): string[] {
		return [
			'Oh dear. That series has ended :(',
			'That series is over :( I hope they make some more.'
		];
	}
}