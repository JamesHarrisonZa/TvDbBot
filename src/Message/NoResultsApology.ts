import { IMessage } from './IMessage';

export class NoResultsApology implements IMessage  {

	public readonly phrases;

	constructor() {
		this.phrases = this.getPhrases();
	}

	private getPhrases(): string[] {
		return [
			'Could not find that series :(',
			'I couldn\'d find that series :(',
			'Unable to find that series :('
		];
	}
}