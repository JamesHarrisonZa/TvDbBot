import { IMessage } from './IMessage';

export class Apology implements IMessage {

	public readonly phrases;

	constructor() {
		this.phrases = this.getPhrases();
	}

	private getPhrases(): string[] {
		return [
			'I\'m sorry I didn\'t understand',
			'I\'m sorry, my wires got crossed and something went wrong',
			'I\'m sorry, im still learning. Can we try another?'
		];
	}
}